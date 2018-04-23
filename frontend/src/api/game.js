import axios from 'axios';

export const findGame = (type) => {
  return axios.get(process.env.API_ROOT+`/api/v1.0/game/find/type/${type}`);
}

export const deposit = (userId, type, gameId, amount) => {
  return axios.post(process.env.API_ROOT+`/api/v1.0/game/deposit`, 
                    { 
                      userId, type, gameId, amount
                    });
}

export const getGameData = (gameId) => {
  return axios.get(process.env.API_ROOT+`/api/v1.0/game/id/${gameId}`);
}

export const getGameRoomInfo = () => {
  return axios.post(process.env.API_ROOT+`/api/v1.0/game/gameroominfo`);
}

export const getGameroomTicketsByUser = (userid, gameid) => {
  return axios.get(process.env.API_ROOT+`/api/v1.0/game/tickets/userid/${userid}/gameid/${gameid}`);
}