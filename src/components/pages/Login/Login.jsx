import React from 'react';
import { useState } from 'react';
import useStyles from './style.js';
import { Switch, Route } from 'react-router-dom';
import { AppBar, Tabs, Tab, TextField, Button } from '@material-ui/core';
import SignIn from '../../partials/signIn';
import SignUp from '../../partials/signUp';
import NotFoundPage from '../NotFoundPage';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default (props) => {
    const classes = useStyles();

    const signIn=(e)=>{
        alert('hola');
    }

    const signUp=(e)=>{
        alert('hola');
    }


    if(props.location.pathname!=='/signin' || props.location.pathname!=='/signup')return <NotFoundPage/>
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={props.location.pathname} centered onChange={(e, n) => {
                    props.history.push(n);
                }}>
                    <Tab value='/signin' label="Iniciar session" {...a11yProps(0)} />
                    <Tab value='/signup' label="Registrarse" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <Switch>
                <Route exact path='/signin' component={SignIn} />
                <Route exact path='/signup' component={SignUp} />
            </Switch>
        </div>
    )
}