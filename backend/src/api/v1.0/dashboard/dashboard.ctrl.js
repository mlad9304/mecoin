import Transaction from 'db/models/Transaction';


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
        const result = await Transaction.getBalance(userid);

        if(result.length !== 1) {
            ctx.status = 400;
            return;
        }

        const { amount: balance } = result[0];

        const roundedBalance = Math.round(balance * 100) / 100;

        ctx.body = {
            balance: roundedBalance
        }
    } catch (e) {
        ctx.throw(e, 500);
    }
}
