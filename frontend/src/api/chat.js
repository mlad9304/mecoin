import axios from 'axios';

export const getRecentMsg = () => {
  return axios.get(process.env.API_ROOT + '/api/v1.0/chat/broadcast');
}