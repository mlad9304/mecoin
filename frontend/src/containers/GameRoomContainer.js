import React, { Component } from 'react'
import { GameRoom } from 'components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as gameActions from 'store/modules/game';
import * as formActions from 'store/modules/form';
import * as dashboardActions from 'store/modules/dashboard';

class GameRoomContainer extends Component {
  render () {
    return (
        <GameRoom {...this.props}/>
    )
  }
}


export default connect(
  (state) => ({
      form: state.form.get('deposit').toJS(),
      status: {
        logged: state.auth.getIn('session', 'logged'),
        userId:  state.auth.getIn(['session', 'user', 'userId']),
        join: state.game.getIn(['channel', 'join']),
        depositResult: state.game.getIn(['error', 'deposit']),
        game: state.game.getIn(['channel', 'game']).toJS(),
        gameState: state.game.getIn(['channel', 'game', 'state']),
        balance: state.dashboard.getIn(['transaction', 'balance']),
      }
  }),
  (dispatch) => ({
    GameActions: bindActionCreators(gameActions, dispatch),
    FormActions: bindActionCreators(formActions, dispatch),
    DashboardActions: bindActionCreators(dashboardActions, dispatch),
  })
)(GameRoomContainer);