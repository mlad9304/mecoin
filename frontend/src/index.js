import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';

import registerServiceWorker from './registerServiceWorker';
import store from 'store';


import 'bootstrap/scss/bootstrap.scss';
import 'static/fonts/font-awesome/scss/font-awesome.scss';
import 'react-alice-carousel/lib/alice-carousel.css';
import 'styles/main.scss';
// import { AppContainer as HotContainer } from 'react-hot-loader';
// import social from 'lib/social';
// import socket from 'lib/socket';

// const socketURI = process.env.NODE_ENV === 'production'
//                     ? (window.location.protocol === 'https://' ? 'wss://' : 'ws://') + window.location.host + '/ws'
//                     : 'ws://localhost:4000/ws'

// console.log(socketURI);
// socket.initialize(store, socketURI);

// window.socket = socket;

// const render = (Component) => ReactDOM.render(
//   (
//     <HotContainer>
//       <Component store={store}/>
//     </HotContainer>
//   ), 
//   document.getElementById('root')
// );

ReactDOM.render(<Root store={store}/>, document.getElementById('root'))

// render(Root);

// if(module.hot) {
//   module.hot.accept('./Root', () => render(Root))
// }

registerServiceWorker();