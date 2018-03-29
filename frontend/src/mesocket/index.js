import SockJS from 'sockjs-client';
import store from 'store';

import sender from './packetSender';
import notify from 'helpers/notify';
import handler from './packetHandler';

let socket = null;
let closing = false;
let reconnected = false;
let intervalId = null;

export const init = () => {  
  socket = new SockJS(process.env.API_ROOT + "/meecho");
  clearInterval(intervalId);

  socket.onopen = () => {
    
    closing = false;
    console.log('[SOCKET] open');

    if(reconnected) {
      notify({type: 'success', message: "Reconnected successfully"})
      if(store.getState().chat.get(['chat','socket','auth'])) {
          sender.reauth();
      }
    }
    reconnected = false;
    
  }

  socket.onmessage = (e) => {
    
    handler(e.data);

  }

  socket.onclose = () => {
    socket = null;

    if (!closing) {
      console.log("[SOCKET] disconnected, reconnecting..")
      if(!reconnected) {
          notify({type: 'error', message: "Disconnected from socket server. Reconnecting..."});
      }
      reconnected = true;
      intervalId = setInterval(function () {
          init();
      }, 3000);
    } else {
        console.log("[SOCKET] disconnected");
    }
  }
}

export const send = (data) => {
  socket.send(JSON.stringify(data));
}