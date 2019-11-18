import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import {verifyTokenls,getTokenls} from '../../utils/token';

export default (props) => {
    // State
    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    // Props
    let { component: Component, ...rest } = props;

    // Redux
    const token=getTokenls();

    useEffect(() => {
        let isMount = true;

        if (isMount) {
            if (token.length>0 && !auth) {
                verifyTokenls(token)
                    .then(() => {
                        setAuth(true);
                    })
                    .catch(err => {
                        setAuth(false);
                    })
                    .finally(()=>{
                        setLoading(false);
                    });
            }
            else{
                setAuth(false);
                setLoading(false);
            }
        }

        return () => isMount = false;
    },[]);

    
    if (loading) return 'Cargando';
    else return (
        <Route {...rest} render={
            (props) => {
                if (auth) return <Component {...props} />
                else return <Redirect push to='/signin' />
            }
        } />
    );
}