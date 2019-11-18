import React from 'react';
import { useState } from 'react';
import useStyles from './style.js';
import { Box,TextField, Button } from '@material-ui/core';

export default (props) => {
    const classes = useStyles();

    const onSubmit=(e)=>{
        e.preventDefault();
        alert('iniciar session');
    }

    return (
        <Box className={classes.root}>
            <form  onSubmit={onSubmit} className={classes.form}>
                <TextField
                    autoFocus
                    className={classes.formItem}
                    required
                    autoComplete='email'
                    type='email'
                    label='Correo' />
                <TextField
                    className={classes.formItem}
                    required
                    type="password"
                    label='Contraseña' />
                <Button 
                    className={classes.formItem}
                    type='submit'
                    >Iniciar session</Button>
                <Button className={classes.formItem}>Olvide la contraseña</Button>
            </form>
        </Box>
    )
}