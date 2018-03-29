import {client as SEND, server as RECEIVE} from './packetTypes';
import store from 'store';
import * as ChatActions from 'store/modules/mechat';
import notify from 'helpers/notify';
import * as helper from './helper';


const setSocketState = (payload) => {
    store.dispatch(ChatActions.setSocketState(payload));
};

const receiveRealtimeData = (payload) => {
    // store.dispatch(channel.receiveRealtimeData(payload));
    
};

const service = {
    success: {
        auth: (packet) => {
            setSocketState({auth: true, username: packet.payload.username});
        }
    },

    error: (packet) => {
        switch (packet.payload.code) {
            case 0:
                notify({type: 'error', message: "Invalid Request"});
                setSocketState({auth: false});
                break;
            case 1:
                notify({type: 'error', message: "You have to select your identity before you talk."});
                setSocketState({auth: false});
                break;
            case 2:
                notify({type: 'error', message: "Your session is invalid, try refreshing the page."});
                setSocketState({auth: false});
                break;
            case 3:
                
                break;
            default:
        }
    },

    join: (packet) => {
        receiveRealtimeData(packet);
        // addOnlineUser({
        //     username: packet.payload.username,
        //     anonymous: packet.payload.anonymous
        // });
    },

    message: (packet) => {
        receiveRealtimeData(packet);
    },

    leave: (packet) => {
        receiveRealtimeData(packet);
        // removeOnlineUser(packet.payload.username);
    }
}

export default function packetHandler(packet) {
console.log('[PACKET]: ' + packet);
    const o = helper.tryParseJSON(packet);
    if (!o) {
        return console.error('[SOCKET] Received invalid response from server');
    }

    switch (o.type) {
        case RECEIVE.SUCCESS.AUTH:
            service
                .success
                .auth(o);
            break;
        case RECEIVE.ERROR:
            service.error(o);
            break;
        case RECEIVE.JOIN:
            service.join(o);
            break;
        case RECEIVE.MSG:
            service.message(o);
            break;
        case RECEIVE.LEAVE:
            service.leave(o);
            break;

        default:
            console.error('[SOCKET] Received invalid response from server');
    }
}