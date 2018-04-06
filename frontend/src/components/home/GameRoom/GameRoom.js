import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import './GameRoom.scss';
import mark from 'static/images/gameroom_mark.png';
import diceImg from 'static/images/gameroom_img.png';
import BuyTicketForm from 'components/home/BuyTicketForm';
import notify from 'helpers/notify';
import * as gameSocket from 'socket-game';
import store from 'store';
import * as gameActions from 'store/modules/game';

const GAME_STATE = {
    OPEN : 0, 
    PLAY : 1, 
    CLOSE : 2,
}

class GameRoom extends Component {

    state = {
        time: 100,
        spinning: false,
        spinAngle: 0,
        depositForm: false,
    }

    componentDidMount() {
        const { connectToGame } = this;
        connectToGame();
    }

    componentWillUnmount() {
        //reset game
        this
          .props
          .GameActions
          .gameRoomReset();
    
        this
          .props
          .FormActions
          .formReset();
    
        //disconnect socket
        console.log("Disconnect Game Socket", gameSocket);

        if (gameSocket.getSocket()) {
            gameSocket.close();
        }
      }

    connectToGame = async () => {
        const { GameActions } = this.props;
        const { type, id: gameId } = this.props.match.params;
        
    
        /*
        setTimeout(() => {
          sender.auth(userId, false);
        }, 5000);
        */

        try {
            await GameActions.getGameData(gameId);
            
            const { status } = this.props;
            const { userId, session, game } = status;

            console.log('UserID::::::', userId, 'Users:::::', game.users);

            if(session.logged && userId !== null && game.users.indexOf(userId) > -1)
                store.dispatch(gameActions.setJoin(true));
        } catch(e) {
          console.log(e);
        }
    }

    handleJoin = () => {
        this.setState({depositForm: true});
    }

    handleDeposit = async() => {

        const { form, status, GameActions, history } = this.props;
        const { type, id: gameId } = this.props.match.params;
        const { amount } = form;
        const { userId, session, game } = status;
        const balance = game.total - game.sold;

        if(!session.logged || userId === null) {
            // alert('login first');
            notify({type: 'error', message: 'Please Login'});
            setTimeout( ()=> {
                history.push('/login');
            }, 700);
            return;
        }

        // validate input
        const regex = /^[1-9]\d*$/;
        
        if (!regex.test(amount)) {
            notify({type: 'error', message: 'Wrong Input!'});
            return;
        }

        if ( amount > balance ){
            notify({type: 'error', message: 'Too much'});
            return;
        }

        // deposit process
        try {
            await GameActions.deposit(userId, type, gameId, amount);
            const { join, depositResult } = this.props.status;
            
            console.log('Join: ', join, ' Deposit Result: ', depositResult);


            if(!join) {
            notify({type: 'error', message: depositResult});
            return;
            }
            notify({type: 'success', message: 'Successfully joined to this game'});
        } catch(e) {
            notify({type: 'error', message: 'Failed to deposit'});
            return;
        }
    }

    handleChange = (e) => {
        const {FormActions} = this.props;
        FormActions.changeInput({form: 'deposit', name: e.target.name, value: e.target.value})
    }

    leaveGame = () => {
        const { history } = this.props;
        history.push('/home');
    }

    render() {

        const { handleJoin, handleDeposit, handleChange, leaveGame } = this;
        const { form, status } = this.props;
        const { game, gameState } = status;
        const { users, usernames, winners } = game;

        let winner_name = '';
        if(gameState === GAME_STATE.CLOSE && winners.length > 0 && Object.keys(usernames).length > 0 ){
            winner_name = usernames[winners[0]];
        }

        return (
            
            <div className="gameroomContainer">
                <div className="row">
                    <div className="col">
                        <div className="markContainer">
                            <img src={mark} role="presentation" alt="mark"/>
                            <p className="markLetter">{game.sold}/{game.total}</p>
                        </div>
                        <div className="row">
                            <div className="col text-center">
                                <p className="diceContainer">
                                    <img src={diceImg} role="presentation" alt="dice"/>
                                </p>
                                <br />
                                <p className="text-center">
                                    {
                                    (!status.join && gameState === GAME_STATE.OPEN) &&
                                    <a className="btnJoin" onClick={() => handleJoin()}>JOIN</a>
                                    }
                                    <a className="btnLeave" onClick={() => leaveGame()}>LEAVE</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        { this.state.depositForm && 
                        <BuyTicketForm 
                            onBuyTicket={handleDeposit}
                            onChange={handleChange}
                            form = {form}
                            status = {status}    
                        />
                        }
                    </div>
                    {this.state.depositForm && <div className="divider"/>}
                </div>
            </div>
        );
    }
}

export default withRouter(GameRoom);
