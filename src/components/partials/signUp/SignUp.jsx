import React from 'react';
import { useState,useRef } from 'react';
import useStyles from './style.js';
import { Box, TextField, Button,Typography } from '@material-ui/core';
import axios from 'axios';

export default (props) => {
    // Ref
    const nameRef=useRef(null);
    const lastNameRef=useRef(null);
    const emailRef=useRef(null);
    const passwordRef=useRef(null);
    const ageRef=useRef(null);

    const classes = useStyles();

    const onSubmit = (e) => {
        e.preventDefault();

        axios.post(process.env.REACT_APP_API_URL+'/users',{
            name:nameRef.current.value,
            last_name:lastNameRef.current.value,
            email:emailRef.current.value,
            password:passwordRef.current.value,
            age:ageRef.current.value
        },{
            headers:{
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then((res)=>{
                console.log(res);
                if(res.status===201)props.history.push('/signin');
            })
            .catch(err=>{
                console.log(err);
            })
    }

    return (
        <Box className={classes.root}>
            <form className={classes.form} onSubmit={onSubmit}>
                <TextField 
                    className={classes.formItem}
                    inputRef={nameRef}
                    label='Nombre'
                    autoFocus
                    required/>
                <TextField 
                    className={classes.formItem}
                    inputRef={lastNameRef}
                    label='Apellido' />
                <TextField 
                    className={classes.formItem}
                    label='Correo'
                    required
                    inputRef={emailRef}
                    type='email'/>
                <TextField 
                    className={classes.formItem}
                    label='Contraseña'
                    required
                    type='password'
                    inputRef={passwordRef}
                    />
                <TextField 
                    className={classes.formItem}
                    label='Edad'
                    type='number'
                    inputRef={ageRef}/>

                <label htmlFor="raised-button-file">
                    <Typography variant='subtitle1'>Foto de perfil</Typography>
                </label>
                <input
                    className={classes.formItem}
                    accept="image/*"
                    alt='asdsa'
                    id="raised-button-file"
                    type="file"
                />
                <Button 
                    className={classes.formItem}
                    type='submit' >Registrarse</Button>
            </form>
        </Box>
    )
}