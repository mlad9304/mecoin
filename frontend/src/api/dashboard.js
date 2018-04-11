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

export const getDepositHistory = (userid) => {
    return axios.post(process.env.API_ROOT+`/api/v1.0/dashboard/deposit/history`, {
        userid
    });
}

export const withdraw = (userid, withdraw) => {
    return axios.post(process.env.API_ROOT+`/api/v1.0/dashboard/withdraw`, {
        userid,
        withdraw,
    });
}

export const getWithdrawHistory = (userid) => {
    return axios.post(process.env.API_ROOT+`/api/v1.0/dashboard/withdraw/history`, {
        userid
    });
}

export const getTransactionHistory = (userid) => {
    return axios.post(process.env.API_ROOT+`/api/v1.0/dashboard/transaction/history`, {
        userid
    });
}

export const getStatisticsInfo = (userid) => {
    return axios.post(process.env.API_ROOT+`/api/v1.0/dashboard/statisticsinfo`, {
        userid
    });
}