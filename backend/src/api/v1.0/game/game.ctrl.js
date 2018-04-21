import Game from 'db/models/Game';
import Transaction from 'db/models/Transaction';

import GamdEngine from 'engine/gameEngine';
import GAME_STATE from 'engine/gameStates';
import RoomManager from 'game/room';
import gameEngine from 'engine/gameEngine';

import { TRANSACTION_TYPE, DEPOSIT_CC } from 'constants/transaction';

export const findGame = async (ctx) => {
  try {
    const { type } = ctx.params;
    const game = await GamdEngine.find(type);

    // make data for client
    const temp =  {
      _id : game._id,
      total: game.numberOfTickets,
      sold: game.sold,
      users: game.users,
      usernames: game.usernames,
      deposits: game.deposits,
      state: game.state,
      winner: game.winner,
      currentTimeLimit: game.currentTimeLimit,
      userTicketRange: game.userTicketRange,
    };

    ctx.body = {
      game: temp,
      type
    }
  } catch (e) {
    ctx.throw(e, 500);
  }
}

export const createGame = async (ctx) => {
  try {
    const { type } = ctx.params;
    console.log(type);
    const gameId = await Game.create(type);
    console.log(gameId);
    ctx.body = {
      _id: gameId._id, 
      type
    }
  } catch (e) {
    ctx.throw(e, 500);
  }
}

export const deposit = async (ctx) => {

  // console.log('Deposit', ctx.request);
  
  const { user } = ctx.request;
  let result_cc = DEPOSIT_CC.DEPOSIT_OK;
  // needs auth
  if(!user) {
    ctx.status = 401;
    console.log("This is user " + user);
    return;
  }

  const {_id} = user;

  let { userId, type, gameId, amount } = ctx.request.body;
  amount = parseInt(amount);

  if(_id !== userId){
    ctx.status = 400;
    return;
  }

  // console.log(gameId);
  const game = GamdEngine.get(gameId);
  // console.log('kkk');
  // console.log(game);
  if(!game){
    ctx.status = 400;
    return;
  }
  console.log('ccc');
  // check amount

  if(!game.isOpen() && !game.isEnter()){
    result_cc = DEPOSIT_CC.GAME_CLOSED;
    ctx.body = {
      cc : result_cc
    };
    return;
  }

  if(!game.isValidDepositAmount(userId, amount)) {
    result_cc = DEPOSIT_CC.TOO_MUCH_DEPOSIT;
    ctx.body = {
      cc : result_cc
    };
    return;
  }

  // if(game.hasDeposit(userId)){
  //   result_cc = DEPOSIT_CC.ALREADY_DEPOSIT;
  //   ctx.body = {
  //     cc : result_cc
  //   };
  //   return;
  // }

  console.log('------------Game Deposit request-------------');
  try {
    const transId = await Transaction.create(userId, TRANSACTION_TYPE.BUY_TICKET, -amount);

    // crypto coin transaction process 
    // const result = transfer();
    // if (!result) {
    //  Transaction.update(transId);
    //  return;
    //}
    const result = await game.deposit(user, amount, transId);

    if(!result) result_cc = 'DEPOSIT_FAIL';

    ctx.body = {
      cc : result_cc
    };
  } catch (e) {
    ctx.throw(e, 500);
  }
}

export const getGameRoomInfo = (ctx) => {

  const games = gameEngine.getGames();

  let retData = [];
  for(let game_id in games) {
    const game = games[game_id];

    retData.push({
      type: game.type,
      state: game.state,
      total: game.numberOfTickets,
      sold: game.sold,
      currentTimeLimit: game.currentTimeLimit
    })
  }
  ctx.body = {
    games: retData
  }
  
}

