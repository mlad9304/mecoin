import axios from 'axios';

export const localRegister = ({
    username,
    email,
    password,
    firstname,
    lastname    
}) => axios.post(process.env.API_ROOT+'/api/v1.0/auth/register/local', {
    username,
    email,
    password,
    firstname,
    lastname
});

export const localLogin = ({username, password}) => axios.post(process.env.API_ROOT+'/api/v1.0/auth/login/local', {
    username, password
});

export const logout = () => axios.post(process.env.API_ROOT+'/api/v1.0/auth/logout');