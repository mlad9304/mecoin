import axios from 'axios';

export const getBalance = (userid) => {
    return axios.get(process.env.API_ROOT+`/api/v1.0/dashboard/balance/userid/${userid}`);
}

export const deposit = (userid, deposit, fee) => {
    return axios.post(process.env.API_ROOT+`/api/v1.0/dashboard/deposit`, {
        userid,
        deposit,
        fee
    });
}
