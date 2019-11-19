import React from 'react';
import { useState } from 'react';
import useStyles from './style.js';
import { Switch, Route, HashRouter } from 'react-router-dom';
import { AppBar, Tabs, Tab, Typography, TextField, Button, Breadcrumbs } from '@material-ui/core';
import SignIn from '../../partials/signIn';
import SignUp from '../../partials/signUp';
import NotFoundPage from '../NotFoundPage';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {children}
        </Typography>
    );
}

export default (props) => {

    const classes = useStyles();

    if (props.location.pathname !== '/login/signin' && props.location.pathname !== '/login/signup') return <NotFoundPage />
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={props.location.pathname} centered onChange={(e, newValue) => {
                    props.history.push(newValue);
                }}>
                    <Tab value={'/login/signin'} label="Iniciar session" {...a11yProps(0)} />
                    <Tab value={'/login/signup'} label="Registrarse" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <Switch>
                <Route path="/login/signin" component={SignIn} />
                <Route path="/login/signup" component={SignUp} />
            </Switch>
        </div>
    )
}