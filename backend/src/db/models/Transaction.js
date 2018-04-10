import mongoose from 'mongoose';
import Game from './Game';
import User from './User';

require('mongoose-double')(mongoose);

const { Schema } = mongoose;

const TRANS_SUCCESS = 0x00;
const TRANS_BAL_NOT_ENOUGH = 0x01;
const TRANS_FAIL = 0xFF;

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

module.exports = mongoose.model('Transaction', Transaction);