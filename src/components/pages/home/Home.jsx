import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Container } from '@material-ui/core';
import useStyles from './style.js';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { getToken, clearToken } from '../../../utils/token';
import userPictureDefault from '../../../assets/user.png';
import env from '../../../env';

export default (props) => {
    // State
    const [user, setUser] = useState({
        name: '',
        last_name: '',
        email: '',
        age: null,
        picture: null
    })

    const classes = useStyles();

    useEffect(() => {
        let token, decoded;
        try {
            token = getToken();
            decoded = jwtDecode(token);
        }
        catch (err) {
            decoded = {};
        }

        axios.get(env.API_URL + '/users/' + decoded.id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    res.data.picture = res.data.picture === null ? userPictureDefault :
                        process.env.REACT_APP_API_URL + '/files/' + res.data.picture;
                    setUser(res.data);
                }
            })
            .catch(err => {
                if (err.response) {

                }
            })
    }, []);

    const onChangeImg = (e) => {
        if (e.target.files.length === 1) {
            const files = Array.from(e.target.files)

            const formData = new FormData();
            formData.append("picture", files[0]);

            axios.put(`${process.env.REACT_APP_API_URL}${'/users/uploads/porfile'}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${getToken()}`
                },
            })
                .then(() => {
                    var fr = new FileReader();
                    fr.onload =  (e)=> {
                        setUser(prev => ({ ...prev, picture:e.target.result }));
                    }
                    fr.readAsDataURL(files[0]);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    return (
        <Container className={classes.root}>
            <Typography variant='h4'>{user.name + ' ' + user.last_name}</Typography>
            <Typography variant='h6'>Correo: {user.email}</Typography>
            <Typography variant='h6'>Edad: {user.age}</Typography>
            <Typography variant='h6'>Contraseña: *********</Typography>
            <Typography variant='h6'>Foto de perfil</Typography>

            <input
                accept="image/*"
                className={classes.input}
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={onChangeImg}
            />
            <label style={{ maxWidth: '300px' }} htmlFor="raised-button-file">
                <img width='300px' alt='foto de perfil' src={user.picture}></img>
            </label>
            <Button variant='contained'
                onClick={(e) => {
                    clearToken();
                    props.history.push('/signin');
                }}>Salir</Button>
        </Container>
    )
}