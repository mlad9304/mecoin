import User from 'db/models/User';


export const updateInfo = async (ctx) => {

    const { user, body } = ctx.request;

    if(!user) {
        ctx.status = 401;
        return;
    }

    const { _id } = user;
    const { userId } = body;

    if( _id !== userId ) {
        ctx.status = 400;
        return;
    }

    try {
        

        ctx.body = {
            
        }
    } catch (e) {
        ctx.throw(e, 500);
    }
}
