import axios, { Axios } from "axios"
import { apiConfig } from "../config/variables"
import { useAuthStore } from "../store/AuthStore"

export const useAxios = () => {
    const apiToken = useAuthStore(state => state.apiToken)

    const axiosClient = axios.create({
        baseURL: apiConfig.url,
        headers: {
            'Content-Type': 'application/json'
        }
    })

    axiosClient.interceptors.request.use(config => {
        config.headers.Authorization = apiToken ? `Bearer ${apiToken}` : ''

        return config
    })

    return axiosClient
}
