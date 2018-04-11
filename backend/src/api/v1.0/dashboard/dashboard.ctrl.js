import Transaction from 'db/models/Transaction';
import { TRANSACTION_TYPE } from 'constants/transaction';

const getBalanceFunc = async (userid) => {
    const result = await Transaction.getBalance(userid);
    let balance;

    if(result.length === 0) {
        balance = 0;        
    } else {
        balance = result[0].amount;
    }

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
        
        await Transaction.create(userid, TRANSACTION_TYPE.DEPOSIT_FEE, -fee * 1000);        
        await Transaction.create(userid, TRANSACTION_TYPE.DEPOSIT, deposit * 1000);


        const balance = await getBalanceFunc(userid);

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

export const getStatisticsInfo = async (ctx) => {
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

        const resultTotalSpent = await Transaction.getTotalSpent(userid);
        const resultGameWon = await Transaction.getGameWon(userid);
        const resultTotalEarned = await Transaction.getTotalEarned(userid);

        let totalSpent, gameWon, totalEarned;

        if(resultTotalSpent.length === 0) {
            totalSpent = 0;
        } else {
            totalSpent = Math.abs(resultTotalSpent[0].amount)/1000;
        }

        if(resultGameWon.length === 0) {
            gameWon = 0;
        } else {
            gameWon = resultGameWon[0].amount;
        }

        if(resultTotalEarned.length === 0) {
            totalEarned = 0;
        } else {
            totalEarned = resultTotalEarned[0].amount/1000;
        }

        const roundedTotalSpent = Math.round(totalSpent * 100000) / 100000;
        const roundedGameWon = Math.round(gameWon * 10) / 10;
        const roundedTotalEarned = Math.round(totalEarned * 100000) / 100000;

        ctx.body = {
            statisticsInfo: {
                totalSpent: roundedTotalSpent,
                gameWon: roundedGameWon,
                totalEarned: roundedTotalEarned
            }
        };
    } catch (e) {
        ctx.throw(e, 500);
    }
}