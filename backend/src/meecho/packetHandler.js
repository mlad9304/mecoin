
import {client as RECEIVE, server as SEND} from './packetTypes';
import * as helper from './helper';
import error from './error';
import Message from 'db/models/Message';
import User from 'db/models/User';
import sockets from './sockets';


const auth = async (connection, payload) => {
    
    const account = await User.findById(payload.sessionID);        
    if (!account) {
        // username not found
        return helper.emit(connection, error(2, RECEIVE.AUTH));
    }

    // account is valid
    const username = account.displayName;
    
    connection.data.username = username;
    connection.data.userId = account._id;

    connection.data.sessionID = payload.sessionID;
    connection.data.valid = true;
    
    helper.emit(connection, helper.createAction(SEND.SUCCESS.AUTH, {username: connection.data.username}));

    const msg = {
        suID: helper.generateUID(),
        username: connection.data.username,
        date: (new Date()).getTime(),
    }

    const result = await Message.write(msg);
    helper.emitAll(sockets, helper.createAction(SEND.JOIN, result));

}

const message = async (connection, payload) => {
  
    const msg = {
        suID: helper.generateUID(),
        username: connection.data.username,
        message: payload.message,
        date: (new Date()).getTime(),
    }

    const result = await Message.write(msg);
    helper.emitAll(sockets, helper.createAction(SEND.MSG, result));


}

export default function packetHandler(connection, packet) {
  
    const o = helper.tryParseJSON(packet);

    if (!o) {
        // INVALID REQUEST
        return helper.emit(connection, error(0));
    }

    switch (o.type) {
        case RECEIVE.AUTH:
            auth(connection, o.payload);
            break;
        case RECEIVE.MSG:
            message(connection, o.payload);
            break;
        default:
            helper.emit(connection, error(0));
            break;
    }
      
}