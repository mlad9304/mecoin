import User from 'db/models/User';


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
        
        console.log("USERID: ", userId, "USERINFO: ", userinfo);

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
        console.log(userData);

        ctx.body = {
            user: userData
        }
    } catch (e) {
        ctx.throw(e, 500);
    }
}
