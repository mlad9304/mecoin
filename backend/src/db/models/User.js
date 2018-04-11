const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');
const token = require('lib/token');
// const ExchangeRate = require('./ExchangeRate');
// const EarningsHistory = require('./EarningsHistory');

const { PASSWORD_HASH_KEY: secret } = process.env;

function hash(password) {
  let temp = "1234";
  let result;
  result = crypto.createHmac('sha256', temp).update(password).digest('hex');
  return result;
}

const User = new Schema({
  username: String,
  email: String,
  password: String,
  firstname: String,
  lastname: String,
  social: {
    facebook: {
      id: String,
      accessToken: String
    },
    google: {
      id: String,
      accessToken: String
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

User.statics.findByEmail = function(email) {
  return this.findOne({email}).exec();
};

User.statics.findByUsername = function(username) {
  console.log('Userrrrrr', username);
  return this.findOne({username}).exec();
};

User.statics.findExistancy = function({email, username}) {
  return this.findOne({
    $or: [
      {email},
      {username}
    ]
  }).exec();
};

User.statics.findSocialId = function({provider, id}) {
  const key = `social.${provider}.id`;

  return this.findOne({
    [key]: id
  });
};

User.statics.localRegister = async function({ username, email, password, firstname, lastname}) {
  
  let temp = hash(password);
  const user = new this({
    username, 
    email,
    password: temp, 
    firstname,
    lastname,
  });

  // sets initial money
/*  
  const { currency, value } = initial;
  user.wallet[currency] = value;

  const usdRate = await ExchangeRate.getUSDRate();
  user.metaInfo.initial.usdRate = usdRate;

  user.metaInfo.monthly = {
    usdRate,
    usdValue: initial.currency === 'BTC' ? initial.value / usdRate : initial.value
  };
*/
  return user.save();
};

// User.statics.socialRegister = async function({
//   username,
//   email,
//   provider,
//   accessToken,
//   socialId,
//   initial
// }) {
//   const user = new this({
//     username,
//     email,
//     social: {
//       [provider]: {
//         id: socialId,
//         accessToken: accessToken
//       }
//     },
//     metaInfo: {
//       initial
//     }
//   });

//   const { currency, value } = initial;
  
//   user.wallet[currency] = value;

//   const usdRate = await ExchangeRate.getUSDRate();
//   user.metaInfo.initial.usdRate = usdRate;

//   user.metaInfo.monthly = {
//     usdRate: usdRate,
//     usdValue: initial.currency === 'BTC' ? initial.value / usdRate : initial.value
//   };
  
//   return user.save();
// };

User.methods.validatePassword = function(password) {
  const hashed = hash(password);
  return this.password === hashed;
};

User.methods.generateToken = function() {
  const { _id, username } = this;
  return token.generateToken({
    user: {
      _id,
      username
    }
  }, 'user');
};

// User.methods.updateEarningsRatio = function(ratio) {
//   return this.update({
//     $set: {
//       earningsRatio: ratio
//     }
//   });
// };

// User.methods.saveEarnings = function(ratio, monthly) {
//   EarningsHistory.create(this._id, monthly);

//   this.update({
//     $set: {
//       earningsRatio: ratio,
//       monthlyRatio: monthly
//     }
//   }).exec();
// };

// User.methods.updateRewardWallet = function({address, destinationTag}) {
//   this.update({
//     $set: {
//       'metaInfo.rewardWallet': {
//         address,
//         destinationTag
//       }
//     }
//   });
// };

// User.statics.getTopRanking = function(monthly) {
//   const key = monthly ? 'monthlyRatio' : 'earningsRatio';

//   return this.find({}, { _id: false, username: true, [key]: true }).sort({ [key]: -1 }).limit(100).exec();
// };

// User.methods.getRank = function(monthly) {
//   const key = monthly ? 'monthlyRatio' : 'earningsRatio';

//   return this.model('User').count({
//     [key]: {
//       $gt: this[key]
//     }
//   }).exec();
// };

// User.methods.saveMonthlyUSD = function(usdValue, usdRate) {
//   return this.update({
//     $set: {
//       'metaInfo.monthly': {
//         usdValue, usdRate
//       }
//     }
//   });
// };

// User.methods.saveEarnings = function(balance) {
//   if(!this.balanceHistory) {
//     return this.model('User').findByIdAndUpdate(this._id, {
//       $set: {
//         balanceHistory: [{
//           time: new Date(),
//           value: balance
//         }]
//       }
//     }).exec();
//   }

//   return this.model('User').findByIdAndUpdate(this._id, {
//     $push: {
//       balanceHistory: {
//         date: new Date(),
//         value: balance
//       }
//     }
//   }).exec();
// };

User.statics.findById = function(id) {
  return this.findOne({
    _id: id
  });
};

module.exports = mongoose.model('User', User);