import React from 'react';
import { useState, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import useStyles from './style.js';
import { Box, TextField, Button, Snackbar } from '@material-ui/core';
import { setToken } from '../../../utils/token';
import axios from 'axios';
import env from '../../../env';

export default withRouter((props) => {
    // State
    const [snackMessage, setSnackMessage] = useState('');

    // Ref
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const classes = useStyles();

    const onSubmit = (e) => {
        e.preventDefault();


        axios.post(env.API_URL + '/users/tokens', {}, {
            auth: {
                username: emailRef.current.value,
                password: passwordRef.current.value
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    setToken(res.data.token);
                    props.history.push('/');
                }
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 401) {
                        setSnackMessage('Correo o contraseña incorrecta');
                        passwordRef.current.value='';
                    }
                }
            })
    }

    const resetPassword=(e)=>{
        axios.post(`${env.API_URL}/users/password/${emailRef.current.value}`)
            .then((res)=>{
                if(res.status===204)setSnackMessage('Se envio a su correo las intrucciones para cambiar la contraseña');
            })
            .catch((err)=>{

            });
    }

    return (
        <Box className={classes.root}>
            <form onSubmit={onSubmit} className={classes.form}>
                <TextField
                    autoFocus
                    className={classes.formItem}
                    inputRef={emailRef}
                    required
                    autoComplete='email'
                    label='Correo' />
                <TextField
                    className={classes.formItem}
                    inputRef={passwordRef}
                    required
                    type="password"
                    label='Contraseña' />
                <Button
                    className={classes.formItem}
                    variant='contained'
                    type='submit'
                >Iniciar session</Button>
                <Button 
                    className={classes.formItem}
                    onClick={resetPassword}
                    >Olvide la contraseña</Button>
            </form>

            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={snackMessage.length>0}
                autoHideDuration={6000}
                onClose={(e) => setSnackMessage('')}
                message={<span id="message-id">{snackMessage}</span>}
            />
        </Box>
    )
})