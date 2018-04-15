import axios from 'axios';

export const updateUserInfo 
= (userId, userinfo) => axios.post(process.env.API_ROOT+'/api/v1.0/user/update/info', {
    userId, userinfo
});