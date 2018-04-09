import React, { Component } from 'react'
import { GameRoom } from 'components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as gameActions from 'store/modules/game';
import * as formActions from 'store/modules/form';

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
        session: state.auth.get('session').toJS(),
        userId:  state.auth.getIn(['session', 'user', '_id']),
        join: state.game.getIn(['channel', 'join']),
        depositResult: state.game.getIn(['error', 'deposit']),
        game: state.game.getIn(['channel', 'game']).toJS(),
        gameState: state.game.getIn(['channel', 'game', 'state']),
      }
  }),
  (dispatch) => ({
    GameActions: bindActionCreators(gameActions, dispatch),
    FormActions: bindActionCreators(formActions, dispatch)
  })
)(GameRoomContainer);