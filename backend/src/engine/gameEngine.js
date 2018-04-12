import * as cryptoWallet from './wallet';

import GAME_STATE from './gameStates';
import GAME_TYPE from './gameTypes';

import GameTbl from 'db/models/Game';
import Transaction from 'db/models/Transaction';
import { TRANSACTION_TYPE } from 'constants/transaction';
import {log} from './helper';
import RoomManager from 'game/room';
import * as helper from 'game/helper';
import { client as RECEIVE, server as SEND } from 'game/packetTypes';
import sockets from 'game/sockets';

const TIME_OUT = {
  [GAME_TYPE.ONE] : 1000 * 30, // 1 minute
  [GAME_TYPE.TEN] : 1000 * 60 * 10, // 10 minutes
  [GAME_TYPE.HUNDRED] : 1000 * 60 * 10 * 10, // 100 minutes
  [GAME_TYPE.THOUSAND] : 1000 * 60 * 10 * 10 * 5, // 500 minutes
  [GAME_TYPE.TENTHOUSAND] : 1000 * 60 * 10 * 10 * 10, // 1000 minutes =~ 16 hours
  [GAME_TYPE.MILLION] : 1000 * 60 * 10 * 10 * 10 * 10, // 10000 minutes =~ 1 week
}

const MAX_LIMIT = {
  [GAME_TYPE.ONE] : 2, 
  [GAME_TYPE.TEN] : 10,
  [GAME_TYPE.HUNDRED] : 100,
  [GAME_TYPE.THOUSAND] : 1000,
  [GAME_TYPE.TENTHOUSAND] : 10000,
  [GAME_TYPE.MILLION] : 1000000
}

const games = {}; // store all games

function Game(type, gameId) {
  this._id = gameId;
  this.type = type;  
  this.users = []; // stores userId
  this.usernames = {};
  this.state = GAME_STATE.OPEN;
  this.createdAt = new Date();
  this.timeLimit = TIME_OUT[type];
  this.deposits = {};
  this.numberOfTickets = MAX_LIMIT[type];
  this.sold = 0; // total of sold amount
  this.winners =  [];
  this.killGameTimeout = null;
  this.tickets = new Array(this.numberOfTickets).fill(null); // generate ticket array
  this.currentTimeLimit = this.timeLimit;
  this.killGameTimeInterval = null;

  /* example
  { aaa : { rank: 1, price:3928.2, percent: 80}, 
    bbb : { rank: 2, price:218, percent: 10} };
    */
  this.fee = 0;

  // generate ticket number which will be not duplicated with prior
  this.generate_ticket_number = () => {
    // const today = new Date();
    // const milliseconds = today.getTime();
    let ticketNumber = Math.floor(1 + Math.random() * this.numberOfTickets);
    while ( this.tickets[ticketNumber] !== null ) {
      ticketNumber ++;
      ticketNumber %= this.numberOfTickets;
    }

    return ticketNumber;
  }

  // assign `amount` number of tickets with raffle number to a user with `userId`
  this.assign_raffle_ticket = (amount, userId) => {
    for (let i = 0; i < amount; i ++) {
      const rnd = this.generate_ticket_number();
      this.tickets[rnd] = userId;
    }
  }

  // check whether game is still opened
  this.isOpen = () => {
    return this.state === GAME_STATE.OPEN;
  }

  this.isPlay = () => {
    return this.state === GAME_STATE.PLAY;
  }

  // check already deposited
  this.hasDeposit = (userId) => {
    if( userId && this.deposits[userId] ){
      console.log('already deposited');
      return true; 
    }
    return false;
  }

  // deposit to escrow for game
  this.deposit = async (user, amount) => {
  
    const {_id, username} = user;
    const userId = _id;
    // add userID
    this.users.push(userId);
    this.usernames[userId] = username;
    this.deposits[userId] = amount;
    this.sold += parseInt(amount, 10);

    // assign ticket
    this.assign_raffle_ticket(amount, userId);

    // update db
    // const curGame = await GameTbl.find()
    const result =  await GameTbl.updateByDeposit(this);

    // broadcast new game state
    const rm = RoomManager.get(this._id);
    
    const temp = {
      _id : this._id,
      total: this.numberOfTickets,
      sold: this.sold,
      users: this.users,
      usernames: this.usernames,
      deposits: this.deposits,
      state: this.state,
      winners: this.winners,
      currentTimeLimit: this.currentTimeLimit
    };

    if(rm) {
      rm.broadcast(helper.createAction(SEND.GAMEDATA, {
        game : temp
      }));
    }


    // if game is full, start game within 10 second.
    if(this.sold === this.numberOfTickets  ){
      
      this.currentTimeLimit = 10000;
      this.updateState(GAME_STATE.PLAY, true);
      this.killGameTimeout = setTimeout( 
        () => {
          clearInterval(this.killGameTimeInterval);
          this.killGameTimeInterval = null;
          this.currentTimeLimit = 0;

          this.play();   

        }, 10000
      );
    }
    // when first user enter, start timer 
    // play game within timeLimit 
    else if(this.users.length === 1){
      this.killGameTimeInterval = setInterval(
        () => {
          this.currentTimeLimit -= 5 * 1000
        }, 5 * 1000
      )
      this.updateState(GAME_STATE.PLAY);
      this.killGameTimeout = setTimeout(
        () => {
          clearInterval(this.killGameTimeInterval);
          this.killGameTimeInterval = null;
          this.currentTimeLimit = 0;

          this.play();
          
        }, this.timeLimit
      );
    }

    

    gameEngine.sendGameRoomInfo();

    return true;
  }

  // update state and broadcast new state to all in the chanel of this game
  this.updateState = async (newState, interrupt=false) => {
    if(this.state !== newState || interrupt) {
      this.state = newState;

      // save to db
      const result = await GameTbl.updateState(this);

      // broadcasting new state to chanel
      const rm = RoomManager.get(this._id);

      if(!rm) return;

      const temp = {
        _id : this._id,
        total: this.numberOfTickets,
        sold: this.sold,
        users: this.users,
        usernames: this.usernames,
        deposits: this.deposits,
        state: this.state,
        winners: this.winners,
        currentTimeLimit: this.currentTimeLimit
      };
  
      if(rm) {
        rm.broadcast(helper.createAction(SEND.GAMEDATA, {
          game : temp
        }));
      }
    }
  }

  // choose winner with raffle
  this.chooseWinner = () => {

    // calc milisecond of now day time
    const today = new Date();
    const milliseconds = today.getTime();
    console.log(milliseconds);
    
    // generate random ticket number
    const rnd = Math.floor(Math.random() * milliseconds) % this.numberOfTickets;
    console.log(`lucky user is ${rnd}`);

    let lucky = rnd;
    while(this.tickets[lucky] === null ) {
      lucky ++;
      if (lucky === this.numberOfTickets) {
        lucky = 0;
      }
    }


    this.winners.push(this.tickets[lucky]);

  }

  // payment for winners
  this.payforWinners = async () => {
    // divide escrow to luckies
    // const w_addr = "0x3203"; // getWalletAddress(this.users[lucky]);
    // const escrowAddr = "0x48493";
    // const price = this.sold * 0.8;
    // await cryptoWallet.transfer(escrowAddr, w_addr, price );

    if(this.winners.length === 0) {
      console.log('[Error]: Pay for Winners');
      return;
    }

    const userId = this.winners[0];

    const transId = await Transaction.create(userId, TRANSACTION_TYPE.WINNING, this.sold);
  }

  // play game
  this.play = async () => {
/*
    // if killTimer is existing, kill the timer.
    if(this.killGameTimeout){
      clearTimeout(this.killGameTimeout);
      this.killGameTimeout = null; 
    }
*/    
    try {
      this.chooseWinner();

      const result = await this.payforWinners();

      // update state to [CLOSE]
      this.updateState(GAME_STATE.CLOSE);

      // kill game
      setTimeout( () => {
        log(`GAME(id = ${this._id}) is destroying..`);
        delete games[this._id];
        
        gameEngine.sendGameRoomInfo();
      }, 3000);

    } catch(e){
      console.log(e);
    }
  }

  // check condition for starting
  // this.isReady = () => {
  //   const delay = (new Date()).getTime - this.createdAt.getTime();

  //   if(this.users.length >= this.maxUsers)
  //     this.play();
  //   }

  //   if(delay >= this.timeLimit)
  //     this.play();
  //   }
  //   return true
  // }

}

function gameEngine(){

}

gameEngine.init = async () => {
  // load game data with OPEN of state from db
  log('engine initialize..');
}

gameEngine.create = async (type) => {

  // save db
  try {
    const result = await GameTbl.create(type);
    const gameId = result._id;
    const typeStr = ['ONE', 'TEN', 'HUNDRED', 'TENTHOUSAND', 'MILLION']
    games[gameId] = new Game(type, gameId);
    log(`Game (type:${typeStr[type]} id:${gameId}) is created, alive.`);
    return gameId;
  }catch (e) {
    console.log(e);
    throw e;
  }
}

gameEngine.get = (gameId) => {
  console.log(`[GAME ENGINE] gameId=${gameId}`);
  // console.log(games);
  if(gameId !== undefined && 
      games[gameId] && (games[gameId].state === GAME_STATE.OPEN || games[gameId].state === GAME_STATE.PLAY)) {
    return games[gameId];
  }
  return null;
}

gameEngine.find = async (type) => {

  // connect
  //find open game
  let gameId = Object.keys(games).find(_id => (
    games[_id].type === type 
    && (games[_id].state === GAME_STATE.OPEN || games[_id].state === GAME_STATE.PLAY)
  ));

  // not found
  if(!gameId) {
    gameId = await gameEngine.create(type);
  }

  return games[gameId];
}

// when app exiting, save game of data to db
gameEngine.save = async () => {
  log('save game data to db ...');
}

gameEngine.getGames = () => {
  return games;
}

gameEngine.sendGameRoomInfo = () => {

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

  helper.emitAll(sockets, helper.createAction(SEND.GAMEROOMINFO, {
    games: retData
  }));
}
export default gameEngine;
