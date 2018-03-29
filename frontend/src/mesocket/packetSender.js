
import { client as SEND } from './packetTypes';
import { createAction } from './helper';
import { send } from './index';

let _sessionID = null

const packetSender = {
    enter: (channel) => {
        const packet = createAction(SEND.ENTER, {
            channel
        });
        
        send(packet);
    },

    auth: (sessionID) => {
        const packet = createAction(SEND.AUTH, {
            sessionID
        });

        _sessionID = sessionID;

        send(packet);
    },

    reauth: () => {
        const packet = createAction(SEND.AUTH, {
            sessionID: _sessionID
        });

        send(packet); 
    },
    
    message: (payload) => {
        const packet = createAction(SEND.MSG, payload);
        send(packet);
    }
}

export default packetSender;