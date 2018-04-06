import React, { Component } from 'react'
import { BuyTicketBox } from 'components';
import { withRouter } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as gameActions from 'store/modules/game';
import * as gameSocket from 'socket-game';

// GAME ROOM TYPE
const GAME_TYPE = {
    ONE : 0, // 1/1 
    TEN : 1, // 1/10
    HUNDRED : 2, // 1/100
    THOUSAND : 3, // 1/1000
    TENTHOUSAND : 4, // 1/10000
    MILLION : 5, // 1/1000000
}

class BuyTicketBoxContainer extends Component {

    handleSelect = async (type) => {

        const { history, GameActions } = this.props;

        try {
            await GameActions.findGame(type);
            const { gameId } = this.props;

            console.log("Game ID:", gameId);

            gameSocket.init();
            history.push(`/game/${type}/id/${gameId}`);
        } catch(e){
            console.log(e);
        }
    }

    render () {
        
        const { handleSelect } = this;

        return (
            <table>
                <tbody>
                    <tr>
                        <td>
                        <div className="m-3 d-inline-block">
                            <BuyTicketBox roomSize={10} onClick={() => handleSelect(GAME_TYPE.ONE)}/>
                        </div>
                        </td>
                        <td>
                        <div className="m-3 d-inline-block">
                            <BuyTicketBox roomSize={100} onClick={() => handleSelect(GAME_TYPE.TEN)}/>
                        </div>
                        </td>
                        <td>
                        <div className="m-3 d-inline-block">
                            <BuyTicketBox roomSize={1000} onClick={() => handleSelect(GAME_TYPE.HUNDRED)}/>
                        </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        <div className="m-3 d-inline-block">
                            <BuyTicketBox  roomSize={10000} onClick={() => handleSelect(GAME_TYPE.THOUSAND)}/>
                        </div>
                        </td>
                        <td>
                        <div className="m-3 d-inline-block">
                            <BuyTicketBox roomSize={100000} onClick={() => handleSelect(GAME_TYPE.TENTHOUSAND)}/>
                        </div>
                        </td>
                        <td>
                        <div className="m-3 d-inline-block">
                            <BuyTicketBox roomSize={1000000} onClick={() => handleSelect(GAME_TYPE.MILLION)}/>
                        </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
}


export default connect(
    (state) => ({
        gameId : state.game.getIn(['channel', 'game', '_id']),
    }),
    (dispatch) => ({
        GameActions: bindActionCreators(gameActions, dispatch),
    })
)(withRouter(BuyTicketBoxContainer));