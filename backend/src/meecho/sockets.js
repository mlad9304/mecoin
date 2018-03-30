import _ from 'lodash';
import {log} from './helper';
import * as helper from './helper';
import { server as SEND } from './packetTypes';

import Message from 'db/models/Message';

let counter = 0;
let freeSlot = [];
const sockets = {};

// tells valid socket lengths
function getSocketsLength() {
    return Object
        .keys(sockets)
        .length - freeSlot.length;
}

// register new connection
export function connect(connection) {
    // if there is a free slot, assign if not, create a new slot
    const freeId = freeSlot.shift();
    if (freeId) {
        connection.id = freeId;
    } else {
        connection.id = ++counter;
    }

    // store connection in sockets
    sockets[connection.id] = connection;
    connection.data = {
        username: null,
        channel: null,
        sessionID: null,
        valid: false,
        counter: 0
    };
    
    log(`Socket ${connection.id} Connected - ${getSocketsLength()} socket(s)`);
}

// unregister lost connection
export async function disconnect(connection) {

    const msg = {
        type: SEND.LEAVE,
        suID: helper.generateUID(),
        username: connection.data.username,
        date: (new Date()).getTime(),
    }

    const result = await Message.write(msg);
    helper.emitAll(sockets, helper.createAction(SEND.LEAVE, result));

    _.remove(sockets, (socket) => {
        return connection.id === socket.id
    });

    freeSlot.push(connection.id);
    log(`Socket ${connection.id} Disconnected - ${getSocketsLength()} socket(s)`);
}

export default sockets;
