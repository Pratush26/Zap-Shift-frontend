import axios from "axios"
import { use, useEffect } from "react";
import { UserContext } from "../Context/AuthContext";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER}`,
});

export const useAxios = () => {
    const {user} = use(UserContext)
    
    useEffect(() => {
        const reqInterceptor = instance.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${user?.accessToken}`
            return config
        })

        // interceptor response
        const resInterceptor = instance.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            console.log(error);
            return Promise.reject(error);
        })

        return () => {
            instance.interceptors.request.eject(reqInterceptor);
            instance.interceptors.response.eject(resInterceptor);
        }

    }, [user])

    return instance;
}