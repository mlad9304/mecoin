import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS, toJS } from 'immutable';
import * as GameApi from 'api/game';
import { pender } from 'redux-pender';

// server status code of deposit request, copied from 'game.ctrl.js'
// to update later

const DEPOSIT_CC = {
  DEPOSIT_OK: 0x00,
  TOO_MUCH_DEPOSIT: 0x01,
  GAME_CLOSED: 0x02,
  DEPOSIT_FAIL : 0xFF
};

// action types
const TEST_ACTION = 'game/TEST_ACTION';
const FIND_GAME = 'game/FIND_GAME';
const DEPOSIT = 'game/DEPOSIT';
const UPDATE_GAMEDATA = 'game/UPDATE_GAMEDATA';
const GAME_ROOM_RESET='game/GAME_ROOM_RESET';
const SET_JOIN = 'game/SET_JOIN';
const GET_GAME_ROOM_INFO = 'game/GET_GAME_ROOM_INFO';
const UPDATE_GAME_ROOM_INFO = 'game/UPDATE_GAME_ROOM_INFO';
const UPDATE_RANDOM_NUMBER = 'game/UPDATE_RANDOM_NUMBER';

// action creator
export const doTestAction = createAction(TEST_ACTION); // test redux
export const findGame = createAction(FIND_GAME, GameApi.findGame); // find game
export const deposit = createAction(DEPOSIT, GameApi.deposit); // depoist 
export const updateGameData = createAction(UPDATE_GAMEDATA); // update game data from sever by socket 
export const gameRoomReset = createAction(GAME_ROOM_RESET); // reset game room
export const setJoin = createAction(SET_JOIN); // set join
export const getGameRoomInfo = createAction(GET_GAME_ROOM_INFO, GameApi.getGameRoomInfo); // find game
export const updateGameRoomInfo = createAction(UPDATE_GAME_ROOM_INFO); // update game room information from server by socket
export const updateRandomNumber = createAction(UPDATE_RANDOM_NUMBER); // update random number

// initial state

const initialState = Map({
  test: Map({
    mode: false
  }),

  error :Map({
    deposit: ''
  }),

  channel: Map({
    join: false,  
    userList: List([]),
    identity: null,
    game: Map({
      _id : null,
      total: null,
      sold: null,
      users: [],
      usernames: {},
      deposits: {},
      state: 0, // OPEN
      winners: null,
      currentTimeLimit: 0,
      ticketRange : [],
      randomNumber: 0
    }),
    socket: Map({
        enter: false,
        auth: null,
        username: null,
        controlled: false
    }),
    data: List([]),
  }),

  allchannel: Map({
    games: List([])
  }),
  
});

// reducer
export default handleActions({
  [TEST_ACTION]: (state, action) => {
    return state.setIn(['test', 'mode'], true);
    // return state.setIn(['test', 'mode'], action.payload);
  },
  [SET_JOIN]: (state, action) => {
    return state.setIn(['channel', 'join'], true);
  },
  [UPDATE_GAMEDATA]: (state, action) => {
    const { game } = action.payload;
    if( game ){
      console.log(`[UPDATE_GAMEDATA]=========>${game}`);
      return state.setIn(['channel', 'game'], fromJS(game));
    }
  },
  [UPDATE_GAME_ROOM_INFO]: (state, action) => {
    const { games } = action.payload;
    console.log(`[UPDATE_GAME_ROOM_INFO]=========>${action.payload}`);
    if( games ){
      return state.setIn(['allchannel','games'], fromJS(games));
    }
  },
  ...pender({
    type: GET_GAME_ROOM_INFO,
    onSuccess: (state, action) => {
      const { data: result } = action.payload;
      const { games } = result;
      if( games ){
        return state.setIn(['allchannel', 'games'], fromJS(games));
      }
    },
    onFailure: (state, action) => {
      
    }
  }),
  [GAME_ROOM_RESET]: (state, action) => {
    return initialState;
  },
  
  ...pender({
    type: DEPOSIT,
    onSuccess: (state, action) => {
      const { data: result } = action.payload;   
      const { cc } = result;

      if(cc === DEPOSIT_CC.DEPOSIT_OK){
        return state.setIn(['channel', 'join'], true);
      }else{
        console.log(`DEPOSIT reqeust result=${cc}`);
        let errStr = '';
        switch (cc) {
          case DEPOSIT_CC.TOO_MUCH_DEPOSIT:
            errStr = 'Too much deposit';
            break;
          case DEPOSIT_CC.GAME_CLOSED:
            errStr = 'Game is closed';
            break;
          case DEPOSIT_CC.DEPOSIT_FAIL:
            errStr = 'Failed to deposit';
            break;
          default:
            errStr = 'Unknown error';
            break;
        }
        return state.setIn(['error', 'deposit'], errStr);
      }
    },
    onFailure: (state, action) => {

    }
  }),
  ...pender({
    type: FIND_GAME,
    onSuccess: (state, action) => {
      const { data: { game } } = action.payload;
      if( game ){
        console.log(`[FIND_GAME]=========>${game}`);
        return state.setIn(['channel', 'game'], fromJS(game));
      }
    },
    onFailure: (state, action) => {
      
    }
  }),

  [UPDATE_RANDOM_NUMBER]: (state, action) => {
    const { randomNumber } = action.payload;
    if( randomNumber ){
      return state.setIn(['channel', 'game', 'randomNumber'], randomNumber);
    }
  },
  
}, initialState);