import axios from 'axios';
import {BASE_URI} from './pathMap';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from './toast';

const apiClient = axios.create({
    baseURL:BASE_URI
})

export default{
    get:apiClient.get,
    post:apiClient.post
}

 apiClient.interceptors.request.use(
    async config =>{
        Toast.showLoading('Loading . . .');

        const token = await AsyncStorage.getItem('access_token');

        let conf = {
            ...config,
            headers:{
                ...config.headers,
                Authorization: `Bearer ${token}`
            },
            params:{
                ...config.params
            }
        }
        
        return conf;
        
    },
    error=>handleResponseError(error)
)

apiClient.interceptors.response.use(
    response => {
        Toast.hideLoading();
        return response;
    },
    error=>handleResponseError(error)
)

function handleResponseError(err){
    console.log("error in request", err.status)
}