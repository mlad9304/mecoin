import axios from 'axios';

export const localRegister = ({
    // displayName,
    // email,
    displayName,
    password    
}) => axios.post(process.env.API_ROOT+'/api/v1.0/auth/register/local', {
    displayName,
    // email,
    password
});

export const localLogin = ({displayName, password}) => axios.post(process.env.API_ROOT+'/api/v1.0/auth/login/local', {
    displayName, password
});

