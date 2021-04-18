
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {ACCOUNT_LOGIN, AUTH_URI} from './pathMap';

const oauth= {
    client_id:"",
    client_secret:"",
    audience:"",
    scope:"",
    grant_type:"client_credentials"
  }

  export const saveToken= async (token) =>{
    try{
      await AsyncStorage.setItem('access_token', token)
    } catch(err){
      console.log("error saving token")
    }
  }

  export const getToken= async ()=>{
    try{
      const token = await AsyncStorage.getItem('access_token')
      return token;
    } catch(err){
      console.log("error saving token")
    }
  }

  export const authenticate = ()=> axios.post(AUTH_URI, oauth).then(response=>{
    console.log(response)
    saveToken(response.data.access_token)
  });