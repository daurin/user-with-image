import axios from 'axios';
import env from '../env';

export const verifyToken=async(token=getToken())=>{
    if(token){
        return axios.get(env.API_URL+'/users/tokens/verify',{
            headers:{Authorization:`Bearer ${token}`}
        })
        .then(res=>{
            if(res.status===200)return Promise.resolve();
            else return Promise.reject();  
        })
        .catch(err=>{
            console.log(err);
            Promise.reject(err);
        });
    }
    else{
        clearToken();
        return Promise.reject();
    }
}

export const setToken=(token)=>{
    localStorage.setItem('token',token);
}

export const getToken=()=>{
    const token = localStorage.getItem('token');
    return token||'';
}

export const clearToken=()=>{
    localStorage.removeItem('token');
}