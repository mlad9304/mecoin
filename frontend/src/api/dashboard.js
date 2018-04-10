import axios from 'axios';

export const getBalance = (userid) => {
    return axios.get(process.env.API_ROOT+`/api/v1.0/dashboard/balance/userid/${userid}`);
}

