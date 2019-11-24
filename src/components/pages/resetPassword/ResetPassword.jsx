import React,{useRef} from 'react';
import { Container, TextField, Button, Typography } from '@material-ui/core';
import axios from 'axios';
import env from '../../../env';

export default (props) => {

    // Ref
    const passwordRef = useRef(null);
    

    const onSubmit = (e) => {
        e.preventDefault();

        const { idUser, token } = props.match.params;

        axios.patch(`${env.API_URL}/users/password/${idUser}/${token}`,{
            new_password:passwordRef.current.value
        })
            .then((res) => {
                if (res.status === 204){
                    props.history.push('/');
                }
            })
            .catch((err) => {
                alert('No se pudo restablecer la contraseña');
            });
    }

    return (
        <Container style={{ marginTop: '20px' }}>
            <form onSubmit={onSubmit}>
                <TextField
                    label='Contraseña nueva'
                    type='password'
                    inputRef={passwordRef}
                    required />
                <Button
                    variant='contained'
                    type='submit' >Aceptar</Button>
            </form>
        </Container>
    );
}