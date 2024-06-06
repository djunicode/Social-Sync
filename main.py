import pandas as pd
import numpy as np
from fastapi import FastAPI , HTTPException
from scipy.sparse import csr_matrix
from implicit.als import AlternatingLeastSquares
from pydantic import BaseModel

app = FastAPI()

df = pd.DataFrame(columns = ['userId'])
df.set_index('userId' , inplace = True)

model = AlternatingLeastSquares(factors = 50 , regularization = 0.05 , alpha = 2.0)

class RecordRequest(BaseModel):
    userId: str
    streamId : str

@app.get("/" , status_code = 200)
async def root():
    return {"message" : "server is running"}

@app.get("/recommend/{userId}" , status_code = 200)
async def getRecommendations(userId):
    global df

    try:
        idx = df.index.get_loc(userId)
    except:
        return []
    
    matrix = csr_matrix(df.values.T)

    x = matrix.T.tocsr()

    model.fit(x)

    top_n = min(20 , len(df.columns))

    ids , _ = model.recommend(idx , x[idx] , N = top_n , filter_already_liked_items = False)

    return df.columns[ids].tolist()

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



