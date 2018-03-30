import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS, toJS } from 'immutable';
import * as ChatApi from 'api/chat';
import { pender } from 'redux-pender';

// action types
const SET_SOCKET_STATE = 'mechat/SET_SOCKET_STATE';
const RECEIVE_REALTIME_DATA = 'mechat/RECEIVE_REALTIME_DATA';
const GET_RECENT_MSG = 'chat/GET_RECENT_MSG';

// action creator
export const setSocketState = createAction(SET_SOCKET_STATE);
export const receiveRealtimeData = createAction(RECEIVE_REALTIME_DATA);
export const getRecentMsg = createAction(GET_RECENT_MSG, ChatApi.getRecentMsg);


// initial state

const initialState = Map({
  chat: Map({
      socket: Map({
          auth: null,
          username: null
      }),
      data: List([])
  }),
});

// reducer
export default handleActions({

  [SET_SOCKET_STATE]: (state, action) => {
    const { auth, username } = action.payload;
    return state.setIn(['chat', 'socket', 'auth'], auth)
                .setIn(['chat', 'socket', 'username'], username);
  },
  [RECEIVE_REALTIME_DATA]: (state, action) => {
    const oldData = state.getIn(['chat', 'data']).toJS();
    return state.setIn(['chat', 'data'], 
                  fromJS( [...oldData, {...action.payload } ] ) 
                );
  },
  ...pender({
    type: GET_RECENT_MSG,
    onSuccess: (state, action) => {
      const { data: result } = action.payload;
      const messages = mapDataToMessages(result.messages);
      return state.setIn(['chat', 'data'], fromJS(messages))
    },
    onFailure: (state, action) => {

    }
  }),
}, initialState);

function mapDataToMessages(data) {
  return data.map((message) => {
      return {
          type: message.type,
          payload: {
              anonymous: message.anonymous,
              date: Date.parse(message.date),
              suID: message.suID,
              username: message.username,
              message: message.message
          }
      }
  });
}