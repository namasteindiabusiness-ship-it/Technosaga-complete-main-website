import axios from "axios"

//export const itemPatha = "http://localhost:8000/uploads/"
export const itemPatha = "https://www.technosagainfotech.in/backend/uploads/"

//const API_URL = "http://localhost:8000/api"
const API_URL = "https://www.technosagainfotech.in/api"

const API = axios.create({
    baseURL: API_URL
})

export const setAuthToken = (token) => {
    if (token) {
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`
    } else {
        delete API.defaults.headers.common["Authorization"]
    }
}

export default API