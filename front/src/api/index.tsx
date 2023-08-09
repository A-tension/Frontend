import axios from "axios";

// local vue api axios instance
function apiInstance() {
    const accessToken  = localStorage.getItem("accessToken");
    const instance  = axios.create({
        baseURL: "http://localhost:8080/",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": `Bearer ${accessToken}`,
        },
    });
    return instance;
}


export { apiInstance };