import React, { Component } from 'react'
import Profile from 'components/dashboard/Profile';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dashboardActions from 'store/modules/dashboard';

class ProfileContainer extends Component {
  render () {
    return (
      <div>
        <Profile {...this.props}/>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    balance: state.dashboard.getIn(['transaction', 'balance']),
    user: state.auth.getIn(["session", "user"]).toJS(),
  }),
  (dispatch) => ({
    DashboardActions: bindActionCreators(dashboardActions, dispatch),
  })
)(ProfileContainer);