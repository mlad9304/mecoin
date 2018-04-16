import axios from 'axios';

export const updateUserInfo 
= (userId, userinfo) => axios.post(process.env.API_ROOT+'/api/v1.0/user/update/info', {
    userId, userinfo
});

export const updateEmail 
= (userId, email) => axios.post(process.env.API_ROOT+'/api/v1.0/user/update/email', {
    userId, email
});

export const updatePassword
= (userId, password) => axios.post(process.env.API_ROOT+'/api/v1.0/user/update/password', {
    userId, password
});