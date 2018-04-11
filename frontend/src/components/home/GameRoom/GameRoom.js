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

import TimeCountDown from 'components/common/TimeCountDown';

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
        // console.log("Disconnect Game Socket", gameSocket);

        // if (gameSocket.getSocket()) {
        //     gameSocket.close();
        // }
    }


    handleJoin = () => {
        this.setState({depositForm: true});
    }

    handleDeposit = async() => {

        const { form, status, GameActions, DashboardActions, history } = this.props;
        const { type, id: gameId } = this.props.match.params;
        const { amount } = form;
        const { logged, userId, game, balance } = status;
        const { balanceGem } = balance;
        const roomBalance = game.total - game.sold;

        if(!logged || userId === null) {
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

        if ( amount > roomBalance ){
            notify({type: 'error', message: 'Too much'});
            return;
        }

        if(amount > balanceGem) {
            notify({type: 'error', message: 'Not enough gems. Please deposit'});
            setTimeout( ()=> {
                history.push('/dashboard/deposit');
            }, 700);
            return;
        }

        // deposit process
        try {
            console.log(userId, type, gameId, amount);
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

        this.setState({depositForm: false});
        DashboardActions.getBalance(userId);
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
        const { users, usernames, winners, currentTimeLimit } = game;

        let winner_name = '';
        if(gameState === GAME_STATE.CLOSE && winners.length > 0 && Object.keys(usernames).length > 0 ){
            winner_name = usernames[winners[0]];
        }

        const totalAlias = (total) => {
            if(total === 1000)
                return '1K';
            else if(total === 10000)
                return '10K';
            else if(total === 100000)
                return '100K';
            else if(total === 1000000)
                return '1M';

            return total;
        }

        return (
            
            <div className="gameroomContainer">
                <div className="row">
                    <div className="col">
                        <div className="markContainer">
                            <img src={mark} role="presentation" alt="mark"/>
                            <p className="markLetter">{game.sold}/{totalAlias(game.total)}</p>
                        </div>
                        <div className="row">
                            <div className="col text-center">
                                <p className="diceContainer">
                                    <img src={diceImg} role="presentation" alt="dice"/>
                                </p>
                                <br />
                                <p className="text-center">
                                    {
                                    !status.join && (gameState === GAME_STATE.OPEN || gameState === GAME_STATE.PLAY) &&
                                    <a className="btnJoin" onClick={() => handleJoin()}>JOIN</a>
                                    }
                                    <a className="btnLeave" onClick={() => leaveGame()}>LEAVE</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    { this.state.depositForm && 
                    <div className="col">
                        <BuyTicketForm 
                            onBuyTicket={handleDeposit}
                            onChange={handleChange}
                            form = {form}
                            status = {status}    
                        />
                    </div>
                    }
                
                    { !this.state.depositForm && gameState === GAME_STATE.CLOSE && 
                    <div className="col">
                        <div className="winners">
                        Winner : @{winner_name}@
                        </div>
                    </div>
                    }

                    { !this.state.depositForm && gameState === GAME_STATE.PLAY && 
                    <div className="col">
                        <TimeCountDown milliseconds={currentTimeLimit}/>
                    </div>
                    }

                    {(this.state.depositForm || gameState === GAME_STATE.CLOSE || gameState === GAME_STATE.PLAY) && 
                    <div className="divider"/>
                    }

                    
                    
                </div>
            </div>
        );
    }
}

export default withRouter(GameRoom);
