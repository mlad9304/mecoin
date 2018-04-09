import React, { Component } from 'react'
import { withRouter } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as gameActions from 'store/modules/game';

import DashboardRightbar from 'components/dashboard/DashboardRightbar';

class DashboardRightbarConainer extends Component {
  
  render() {
    return (
      <DashboardRightbar {...this.props}/>
    );
  }
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
)(withRouter(DashboardRightbarConainer));