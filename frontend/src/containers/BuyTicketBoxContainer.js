import React, { Component } from 'react'
import { BuyTicketBox } from 'components';
import { withRouter } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as gameActions from 'store/modules/game';
import * as gameSocket from 'socket-game';
import notify from 'helpers/notify';
import store from 'store';

// GAME ROOM TYPE
const GAME_TYPE = {
    ONE : 0, // 1/1 
    TEN : 1, // 1/10
    HUNDRED : 2, // 1/100,
    THOUSAND : 3, // 1/1000,
    TENTHOUSAND : 4, // 1/10000
    MILLION : 5, // 1/1000000
}

// GAME ROOM TYPE
const GAME_STATE = {
    OPEN : 0, 
    PLAY : 1, 
    CLOSE : 2,
}

class BuyTicketBoxContainer extends Component {

    initialState = {
        game0: {
            total: 2,
            sold: 0,
            currentTimeLimit: 0
        },
        game1: {
            total: 10,
            sold: 0,
            currentTimeLimit: 0
        },
        game2: {
            total: 100,
            sold: 0,
            currentTimeLimit: 0
        },
        game3: {
            total: 1000,
            sold: 0,
            currentTimeLimit: 0
        },
        game4: {
            total: 10000,
            sold: 0,
            currentTimeLimit: 0
        },
        game5: {
            total: 1000000,
            sold: 0,
            currentTimeLimit: 0
        },
    }

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    async componentDidMount() {
        try {
            const { GameActions } = this.props;
            await GameActions.getGameRoomInfo();

            gameSocket.init();

        } catch(e){
            console.log(e);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { gamesInfo } = nextProps;
        this.setState(this.initialState);
        
        for(let i=0; i<gamesInfo.length; i++) {
            const info = gamesInfo[i];
            this.setState({
                ['game'+info.type]: {
                    total: info.total,
                    sold: info.sold,
                    currentTimeLimit: info.state === GAME_STATE.PLAY ? info.currentTimeLimit : 0
                }
            })
        }
    }

    handleSelect = async (type) => {

        const { history, GameActions, session, userId } = this.props;
        
        if(!session.logged || userId === null) {
            // alert('login first');
            notify({type: 'error', message: 'Please Login'});
            setTimeout( ()=> {
                history.push('/login');
            }, 700);
            return;
        }

        try {

            await GameActions.findGame(type);

            const { game } = this.props;
            const { _id: gameId } = game;
            const balance = game.total - game.sold;

            await GameActions.getGameroomTicketsByUser(userId, gameId);

            if(session.logged && userId !== null && game && game.users && game.users.indexOf(userId) > -1)
                store.dispatch(gameActions.setJoin(true));
            gameSocket.init();
            
            history.push(`/game/${type}/id/${gameId}`);

        } catch(e){
            console.log(e);
        }
    }

    render () {
        
        const { handleSelect } = this;
        
        const { mode } = this.props;

        return (
            <div>
                
            { mode === "home" && 
            <div className="col">
                <div className="row mt-3">
                    <div className="col sm-4">
                        <BuyTicketBox 
                            total={this.state.game0.total} 
                            sold={this.state.game0.sold} 
                            currentTimeLimit={this.state.game0.currentTimeLimit}
                            onClick={() => handleSelect(GAME_TYPE.ONE)} 
                        />
                    </div>
                    <div className="col sm-4">
                        <BuyTicketBox 
                            total={this.state.game1.total} 
                            sold={this.state.game1.sold} 
                            currentTimeLimit={this.state.game1.currentTimeLimit}
                            onClick={() => handleSelect(GAME_TYPE.TEN)} 
                        />
                    </div>
                    <div className="col sm-4">
                        <BuyTicketBox 
                            total={this.state.game2.total} 
                            sold={this.state.game2.sold} 
                            currentTimeLimit={this.state.game2.currentTimeLimit}
                            onClick={() => handleSelect(GAME_TYPE.HUNDRED)} 
                        />
                    </div>
                </div>
                <div className="row mt-3 mb-3">
                    <div className="col sm-4">
                        <BuyTicketBox 
                            total={this.state.game3.total} 
                            sold={this.state.game3.sold} 
                            currentTimeLimit={this.state.game3.currentTimeLimit}
                            onClick={() => handleSelect(GAME_TYPE.THOUSAND)} 
                        />
                    </div>
                    <div className="col sm-4">
                        <BuyTicketBox 
                            total={this.state.game4.total} 
                            sold={this.state.game4.sold} 
                            currentTimeLimit={this.state.game4.currentTimeLimit}
                            onClick={() => handleSelect(GAME_TYPE.TENTHOUSAND)} 
                        />
                    </div>
                    <div className="col sm-4">
                        <BuyTicketBox 
                            total={this.state.game5.total} 
                            sold={this.state.game5.sold} 
                            currentTimeLimit={this.state.game5.currentTimeLimit}
                            onClick={() => handleSelect(GAME_TYPE.MILLION)} 
                        />
                    </div>
                </div>
            </div>
            }
            { mode === "dashboard" &&
            <div style={{padding: '30px'}}>
                <BuyTicketBox 
                    total={this.state.game0.total} 
                    sold={this.state.game0.sold} 
                    currentTimeLimit={this.state.game0.currentTimeLimit}
                    onClick={() => handleSelect(GAME_TYPE.ONE)} 
                />
                <br />
                <BuyTicketBox 
                    total={this.state.game1.total} 
                    sold={this.state.game1.sold} 
                    currentTimeLimit={this.state.game1.currentTimeLimit}
                    onClick={() => handleSelect(GAME_TYPE.TEN)} 
                />
                <br />
                <BuyTicketBox 
                    total={this.state.game2.total} 
                    sold={this.state.game2.sold} 
                    currentTimeLimit={this.state.game2.currentTimeLimit}
                    onClick={() => handleSelect(GAME_TYPE.HUNDRED)} 
                />
            </div>
            }
            </div>
        )
    }
}

BuyTicketBoxContainer.defaultProps = {
    mode: "home"    
}

export default connect(
    (state) => ({
        session: state.auth.get('session').toJS(),
        userId:  state.auth.getIn(['session', 'user', '_id']),
        game: state.game.getIn(['channel', 'game']).toJS(),
        gamesInfo: state.game.getIn(['allchannel', 'games']).toJS(),
    }),
    (dispatch) => ({
        GameActions: bindActionCreators(gameActions, dispatch),
    })
)(withRouter(BuyTicketBoxContainer));