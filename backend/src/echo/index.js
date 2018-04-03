import sockjs from 'sockjs';
import packetHandler from './packetHandler';

import sockets, { connect, disconnect } from './sockets';


// initialize server
const options = { sockjs_url: 'https://cdn.jsdelivr.net/sockjs/1.1.1/sockjs.min.js' };
const echo = sockjs.createServer(options);

echo.on('connection', connection => {
    connect(connection);

    connection.on('data', data => {
        console.log('data:');
        console.log(data);
        packetHandler(connection, data);
    });

    connection.on('close', data => {
        console.log('close event')
        disconnect(connection);
    });
});

export default echo;