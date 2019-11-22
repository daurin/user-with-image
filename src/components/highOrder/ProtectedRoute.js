import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import {verifyToken,getToken} from '../../utils/token';

export default (props) => {
    // State
    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    // Props
    let { component: Component, ...rest } = props;

    // Redux
    const token=getToken();

    useEffect(() => {
        let isMount = true;

        if (isMount) {
            if (token.length>0 && !auth) {
                verifyToken(token)
                    .then(() => {
                        setAuth(true);
                        setLoading(false);
                    })
                    .catch(err => {
                        console.log(err);
                        setAuth(false);
                        setLoading(false);
                    })
                    // .finally(()=>{
                        
                    // });
            }
            else{
                setAuth(false);
                setLoading(false);
            }
        }

        return () => isMount = false;
    },[]);

    
    if (loading) return '';
    else return (
        <Route {...rest} render={
            (props) => {
                if (auth) return <Component {...props} />
                else return <Redirect push to='/signin' />
            }
        } />
    );
}