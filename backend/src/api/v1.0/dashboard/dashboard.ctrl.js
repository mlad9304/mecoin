import Transaction from 'db/models/Transaction';
import { TRANSACTION_TYPE } from 'constants/transaction';

const getBalanceFunc = async (userid) => {
    const result = await Transaction.getBalance(userid);

    if(result.length !== 1) {
        
        return 'error';
    }

    const { amount: balance } = result[0];

    const balanceGem = balance;
    const balanceEth = balanceGem / 1000;

    const roundedBalanceGem = Math.round(balanceGem * 100) / 100;
    const roundedBalanceEth = Math.round(balanceEth * 100000) / 100000;
    return {
        balanceGem: roundedBalanceGem,
        balanceEth: roundedBalanceEth
    };
}

export const getBalance = async (ctx) => {

    const { user } = ctx.request;

    if(!user) {
        ctx.status = 401;
        return;
    }

    const { _id } = user;
    const { userid } = ctx.params;

    if( _id !== userid ) {
        ctx.status = 400;
        return;
    }

    try {
        const balance = await getBalanceFunc(userid);

        if(balance === 'error') {
            ctx.status = 400;
            return;
        }

        ctx.body = {
            balance
        }
    } catch (e) {
        ctx.throw(e, 500);
    }
}

export const deposit = async (ctx) => {
    const { user, body } = ctx.request;

    if(!user) {
        ctx.status = 401;
        return;
    }

    const { _id } = user;
    const { userid, deposit, fee } = body;

    if( _id !== userid ) {
        ctx.status = 400;
        return;
    }

    try {

        await Transaction.create(userid, TRANSACTION_TYPE.DEPOSIT, deposit * 1000);
        await Transaction.create(userid, TRANSACTION_TYPE.DEPOSIT_FEE, -fee * 1000);

        const balance = await getBalanceFunc(userid);

        if(balance === 'error') {
            ctx.status = 400;
            return;
        }

        ctx.body = {
            balance
        };
    } catch (e) {
        ctx.throw(e, 500);
    }
}

export const depositHistory = async (ctx) => {

    const { user, body } = ctx.request;

    if(!user) {
        ctx.status = 401;
        return;
    }

    const { _id } = user;
    const { userid } = body;

    if( _id !== userid ) {
        ctx.status = 400;
        return;
    }

    try {

        const depositHistory = await Transaction.depositHistory(userid);

        ctx.body = {
            depositHistory
        };
    } catch (e) {
        ctx.throw(e, 500);
    }

}

export const withdraw = async (ctx) => {
    const { user, body } = ctx.request;

    if(!user) {
        ctx.status = 401;
        return;
    }

    const { _id } = user;
    const { userid, withdraw } = body;

    if( _id !== userid ) {
        ctx.status = 400;
        return;
    }

    try {

        await Transaction.create(userid, TRANSACTION_TYPE.WITHDRAW, -withdraw * 1000);

        const balance = await getBalanceFunc(userid);

        if(balance === 'error') {
            ctx.status = 400;
            return;
        }

        ctx.body = {
            balance
        };
    } catch (e) {
        ctx.throw(e, 500);
    }
}

export const withdrawHistory = async (ctx) => {

    const { user, body } = ctx.request;

    if(!user) {
        ctx.status = 401;
        return;
    }

    const { _id } = user;
    const { userid } = body;

    if( _id !== userid ) {
        ctx.status = 400;
        return;
    }

    try {

        const withdrawHistory = await Transaction.withdrawHistory(userid);

        ctx.body = {
            withdrawHistory
        };
    } catch (e) {
        ctx.throw(e, 500);
    }

}

export const transactionHistory = async (ctx) => {

    const { user, body } = ctx.request;

    if(!user) {
        ctx.status = 401;
        return;
    }

    const { _id } = user;
    const { userid } = body;

    if( _id !== userid ) {
        ctx.status = 400;
        return;
    }

    try {

        const transactionHistory = await Transaction.transactionHistory(userid);

        ctx.body = {
            transactionHistory
        };
    } catch (e) {
        ctx.throw(e, 500);
    }

}