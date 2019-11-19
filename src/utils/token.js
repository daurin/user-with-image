import axios from 'axios';

export const verifyToken=async(token=getToken())=>{
    if(token){
        return axios.get(process.env.REACT_APP_API_URL+'/users/tokens/verify',{
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
        clearTokenls();
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

export const clearTokenls=()=>{
    localStorage.removeItem('token');
}