import axios from "axios"

const url = process.env.NEXT_PUBLIC_API_URL

export const apiHandler = {
    login: async ({ nameEmail, password }) => {
        try {
            if (!nameEmail || !password) return { error: "Please fill in all fields" }
            const res = await axios.post(`${url}/api/user/login`,
                {
                    emailUsername: nameEmail, password: password,
                },
                {
                    validateStatus: (status) => (status >= 200 && status < 401)
                }
            )
            if (!res) return { error: "Something went wrong" }
            return res.data
        } catch (error) {
            console.log("ERROR IN LOGIN" + error)
            return { error }
        }

    },
    signup: async ({ username, password, firstName, lastName, email, dob }) => {
        try {
            if (!username || !password || !firstName || !lastName || !email || !dob) return { error: "Please fill in all fields" }
            const res = await axios.post(`${url}/api/user/signup`,
                {
                    username, password, firstName, lastName, email, dob
                },
                {
                    validateStatus: (status) => (status >= 200 && status < 401)
                }
            )
            if (!res) return { error: "Something went wrong" }
            return res.data
        } catch (error) {
            console.log("ERROR IN SIGNUP" + error)
            return { error }
        }

    },
    getStream: async ({ streamId }) => {
        try {
            if (!streamId) return { error: "Stream unavailable" }
            const res = await axios.get(`${url}/api/stream/${streamId}`,{
                validateStatus: (status) => (status >= 200 && status < 401)
            });
            if (!res) return { error: "Something went wrong!" }
            return res.data
        } catch (error) {
            console.log("ERROR IN GETTTING STREAM" + error)
            return { error }
        }
    },
    getUser: async ({ userId }) => {
        try {
            if (!streamId) return { error: "Stream unavailable" }
            const res = await axios.get(`${url}/api/user/${userId}`,{
                validateStatus: (status) => (status >= 200 && status < 401)
            });
            if (!res) return { error: "Something went wrong!" }
            return res.data
        } catch (error) {
            console.log("ERROR IN GETTTING STREAM" + error)
            return { error }
        }
    },
    getLiveComments: async ({ streamId }) => {
        try {
            if (!streamId) return { error: "Stream unavailable" }
            const res = await axios.get(`${url}/api/comment/${streamId}`,{
                validateStatus: (status) => (status >= 200 && status < 401)
            });
            if (!res) return { error: "Something went wrong!" }
            return res.data
        } catch (error) {
            console.log("ERROR IN GETTTING LIVE COMMENTS" + error)
            return { error }
        }
    }
}