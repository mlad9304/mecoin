import User from 'db/models/User';
const crypto = require('crypto');
const { PASSWORD_HASH_KEY: secret } = process.env;

function hash(password) {
    let temp = secret;
    let result;
    result = crypto.createHmac('sha256', temp).update(password).digest('hex');
    return result;
}

export const updateInfo = async (ctx) => {

    const { user, body } = ctx.request;

    if(!user) {
        ctx.status = 401;
        return;
    }

    const { _id } = user;
    const { userId, userinfo } = body;

    if( _id !== userId ) {
        ctx.status = 400;
        return;
    }

    try {
        
        const updatedUser = await User.findByIdAndUpdate(userId, {
            $set: {
              firstname: userinfo.firstname,
              lastname: userinfo.lastname,
              address1: userinfo.address1,
              address2: userinfo.address2,
              zipcode: userinfo.zipcode,
              city: userinfo.city
            }
        });

        const userData = await User.findOne({
            _id: userId
        })

        ctx.body = {
            user: userData
        }
    } catch (e) {
        ctx.throw(e, 500);
    }
}

export const updateEmail = async (ctx) => {

    const { user, body } = ctx.request;

    if(!user) {
        ctx.status = 401;
        return;
    }

    const { _id } = user;
    const { userId, email } = body;

    if( _id !== userId ) {
        ctx.status = 400;
        return;
    }

    try {
        
        const updatedUser = await User.findByIdAndUpdate(userId, {
            $set: {
              email
            }
        });

        const userData = await User.findOne({
            _id: userId
        })

        ctx.body = {
            user: userData
        }
    } catch (e) {
        ctx.throw(e, 500);
    }
}

export const updatePassword = async (ctx) => {

    const { user, body } = ctx.request;

    if(!user) {
        ctx.status = 401;
        return;
    }

    const { _id } = user;
    const { userId, password } = body;

    if( _id !== userId ) {
        ctx.status = 400;
        return;
    }

    try {
        
        await User.findByIdAndUpdate(userId, {
            $set: {
              password: hash(password)
            }
        });

        const userData = await User.findOne({
            _id: userId
        })

        ctx.body = {
            user: userData
        }

    } catch (e) {
        ctx.throw(e, 500);
    }
}
