import pandas as pd
import numpy as np
from fastapi import FastAPI , HTTPException
from scipy.sparse import csr_matrix
# from sklearn.preprocessing import MinMaxScaler
from pydantic import BaseModel

app = FastAPI()

df = pd.DataFrame(columns = ['userId'])
df.set_index('userId' , inplace = True)

class RecordRequest(BaseModel):
    userId: str
    streamId : str

def nonzeros(m, row):
    for index in range(m.indptr[row], m.indptr[row+1]):
        yield m.indices[index], m.data[index]
      
def implicit_als_cg(Cui, features=10, iterations=20, lambda_val=0.1):

    user_size, item_size = Cui.shape

    X = np.random.rand(user_size, features) * 0.01
    Y = np.random.rand(item_size, features) * 0.01

    Cui, Ciu = Cui.tocsr(), Cui.T.tocsr()

    for _ in range(iterations):
        least_squares_cg(Cui, X, Y, lambda_val)
        least_squares_cg(Ciu, Y, X, lambda_val)
    
    return csr_matrix(X), csr_matrix(Y)
  
def least_squares_cg(Cui, X, Y, lambda_val, cg_steps=3):

    users, features = X.shape
    
    YtY = Y.T.dot(Y) + lambda_val * np.eye(features)

    for u in range(users):

        x = X[u]
        r = -YtY.dot(x)

        for i, confidence in nonzeros(Cui, u):
            r += (confidence - (confidence - 1) * Y[i].dot(x)) * Y[i]

        p = r.copy()
        rsold = r.dot(r)

        for _ in range(cg_steps):
            Ap = YtY.dot(p)
            for i, confidence in nonzeros(Cui, u):
                Ap += (confidence - 1) * Y[i].dot(p) * Y[i]

            alpha = rsold / p.dot(Ap)
            x += alpha * p
            r -= alpha * Ap

            rsnew = r.dot(r)
            p = r + (rsnew / rsold) * p
            rsold = rsnew

        X[u] = x

@app.get("/" , status_code = 200)
async def root():
    return {"message" : "server is running"}

@app.get("/recommend/{user_id}" , status_code = 200)
async def getRecommendations(user_id):

    global df

    try:
        idx = df.index.get_loc(user_id)
    except:
        return []

    alpha_val = 15

    df_sparse = csr_matrix(df)

    conf_data = (df_sparse * alpha_val).astype('double')

    user_vecs, item_vecs = implicit_als_cg(conf_data, iterations=20, features=20)
    
    user_interactions = df_sparse[idx,:].toarray()

    user_interactions = user_interactions.reshape(-1) + 1 
    user_interactions[user_interactions > 1] = 0

    rec_vector = user_vecs[idx,:].dot(item_vecs.T).toarray()

    min_max = MinMaxScaler()
    rec_vector_scaled = min_max.fit_transform(rec_vector.reshape(-1,1))[:,0]
    recommend_vector = user_interactions*rec_vector_scaled

    N = min(20 , len(df.columns))
   
    items = df.columns[np.argsort(recommend_vector)[::-1][:N]]

    return items.tolist()

@app.post("/record" , status_code = 201)
async def createRecord(request : RecordRequest):

    global df

    userid = request.userId
    streamid = request.streamId

    if not userid or not streamid:
        raise HTTPException(status_code=400 , detail = "User or Stream ID doesn't exist.")
    
    if streamid not in df.columns:
        df[streamid] = 0
    
    df.at[userid , streamid] = 1

    df.fillna(0 , inplace = True)

@app.get("/get/all" , status_code = 200)
async def getAll():
    global df
    return df.to_json()



