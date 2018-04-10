import mongoose from 'mongoose';
import Game from './Game';
import User from './User';

require('mongoose-double')(mongoose);

import { TRANSACTION_TYPE } from 'constants/transaction';

const { Schema } = mongoose;

const Transaction = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: User },
  type: Schema.Types.String,
  amount: Schema.Types.Double,
  createdAt: { type: Date, default: Date.now },
});

Transaction.statics.create = async function(userId, type, amount) {
  const game = new this({
    userId, type, amount
  });

  return game.save();
}

Transaction.statics.getBalance = async function(userId) {
  return this.aggregate([
    { $match: {
      userId: new mongoose.Types.ObjectId(userId)
    }},
    { $group: {
      _id: "$userId",
      amount: { $sum: "$amount" }
    }}
  ])
}

Transaction.statics.depositHistory = async function(userId) {
  return this.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        type: {$in: [TRANSACTION_TYPE.DEPOSIT, TRANSACTION_TYPE.DEPOSIT_FEE]}
      }
    },
    {
      $project: {
        type: 1,
        amount: 1,
        createdAt: {
          $dateToString: {
            format: '%H:%M, %d-%m-%Y',
            date: "$createdAt"
          }
        }
      }
    },
    {
      $sort: {
        createdAt: -1
      }
    },
    {
      $limit: 7
    }
  ])
  // return this.find({
  //     userId, 
  //     type: {$in: [TRANSACTION_TYPE.DEPOSIT, TRANSACTION_TYPE.DEPOSIT_FEE]}
  //   }, {
  //     type: 1,
  //     amount: 1,
  //     createdAt: 1,
  //   })
  //   .sort({"createdAt": -1})
  //   .limit(10)
  //   .exec();

  
}

module.exports = mongoose.model('Transaction', Transaction);