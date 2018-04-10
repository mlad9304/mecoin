import Transaction from 'db/models/Transaction';
import { TRANSACTION_TYPE } from 'constants/transaction';

const getBalanceFunc = async (userid) => {
    const result = await Transaction.getBalance(userid);

    if(result.length !== 1) {
        
        return 'error';
    }

    const { amount: balance } = result[0];

    const roundedBalance = Math.round(balance * 10) / 10;

    return roundedBalance;
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