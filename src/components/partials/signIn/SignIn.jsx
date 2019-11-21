import React from 'react';
import { useState, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import useStyles from './style.js';
import { Box, TextField, Button, Snackbar } from '@material-ui/core';
import { setToken } from '../../../utils/token';
import axios from 'axios';

export default withRouter((props) => {
    // State
    const [messageIncorrectOpen, setMessageIncorrectOpen] = useState(false);

    // Ref
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const classes = useStyles();

    const onSubmit = (e) => {
        e.preventDefault();


        axios.post(process.env.REACT_APP_API_URL + '/users/tokens', {}, {
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
                        setMessageIncorrectOpen(true);
                        passwordRef.current.value='';
                    }
                }
            })
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
                <Button className={classes.formItem}>Olvide la contraseña</Button>
            </form>

            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={messageIncorrectOpen}
                autoHideDuration={6000}
                onClose={(e) => setMessageIncorrectOpen(false)}
                message={<span id="message-id">Correo o contraseña incorrecta</span>}
            />
        </Box>
    )
})