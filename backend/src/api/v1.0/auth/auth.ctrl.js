const Joi = require('joi');
const User = require('db/models/User');
const lightwallet = require('eth-lightwallet');


exports.checkEmail = async (ctx) => {
  const { email } = ctx.params;
  
  if(!email) {
    ctx.status = 400;
    return;
  }

  try {
    const account = await User.findByEmail(email);
    ctx.body = {
      exists: !!account
    };
  } catch (e) { 
    ctx.throw(e, 500);
  }
};

exports.checkUsername = async (ctx) => {
  const { username } = ctx.params;

  if(!username) {
    ctx.status = 400;
    return;
  }

  try {
    const account = await User.findByUsername(username);
    ctx.body = {
      exists: !!account
    };
  } catch (e) {
    ctx.throw(e, 500);
  }
};

exports.localRegister = async (ctx) => {
  const { body } = ctx.request;

  // console.log(ctx.request);
  const schema = Joi.object({
    username: Joi.string().regex(/^[0-9a-z_]{4,20}$/).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(30).required(),
    firstname: Joi.string().regex(/[a-zA-Z]{3,30}/).required(),
    lastname: Joi.string().regex(/[a-zA-Z]{3,30}/).required(),
  });

  const result = Joi.validate(body, schema);

  // Schema Error
  if(result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }
  
  const { username, /*email,*/ password, email, firstname, lastname } = body;

  try {
    // check email / username existancy
/*    
    const exists = await User.findExistancy({
      username,
      email
    });

    if(exists) {
      ctx.status = 409;
      const key = exists.email === email ? 'email' : 'username';
      ctx.body = {
        key
      };
      return;
    }
*/

    // const { currency, index } = body.initialMoney;
    
    // const value = optionsPerCurrency[currency].initialValue * Math.pow(10, index);
    // const initial = {
    //   currency,
    //   value
    // };

    // creates user account
    const user = await User.localRegister({
      username, email, password, firstname, lastname
    });

    ctx.body = {
      username,
      _id: user._id,
    };
    
    const accessToken = await user.generateToken();

    // configure accessToken to httpOnly cookie
    ctx.cookies.set('access_token', accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7
    });


    
  } catch (e) {
    ctx.throw(e, 500);
  }
};

const generateNewWalletAddress = () => new Promise((resolve, reject) => {
  
  var password = 'LLd:Tr>q<N-s/pkn7U?X9H+t';
  var seed = lightwallet.keystore.generateRandomSeed();

  lightwallet.keystore.createVault({
      password: password,
      seedPhrase: seed,
      hdPathString: "m/0'/0'/0'"
  }, function (err, ks) {

      ks.keyFromPassword(password, function (err, pwDerivedKey) {
          if (!ks.isDerivedKeyCorrect(pwDerivedKey)) {
              throw new Error("Incorrect derived key!");
          }

          try {
              ks.generateNewAddress(pwDerivedKey, 1);
          } catch (err) {
              console.log(err);
              console.trace();
          }
          var wallet_address = ks.getAddresses()[0];
          var private_key = ks.exportPrivateKey(wallet_address, pwDerivedKey);

          resolve({wallet_address, private_key});

      });
  });
});


exports.localLogin = async (ctx) => {
  const { body } = ctx.request;

  const schema = Joi.object({
    username: Joi.string().regex(/^[0-9a-z_]{4,20}$/).required(),
    password: Joi.string().min(5).max(30)
  });
  
  const result = Joi.validate(body, schema);

  if(result.error) {
    ctx.status = 400;
    return;
  }

  const { username, password } = body;

  try {

    const user = await User.findByUsername(username);
    
    if(!user) {
      // user does not exist
      console.log('user does not exist');
      ctx.status = 403;
      return;
    }

    const validated = user.validatePassword(password);
    if(!validated) {
      // wrong password
      ctx.status = 403;
      return;
    }

    const accessToken = await user.generateToken();

    ctx.cookies.set('access_token', accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7
    });

    ctx.body = {
      user
    };
    console.log('Successfully logined.');
  } catch (e) {
    ctx.throw(e, 500);
  }
};

exports.logout = (ctx) => {
  ctx.cookies.set('access_token', null, {
    maxAge: 0,
    httpOnly: true
  });
  ctx.status = 204;
};