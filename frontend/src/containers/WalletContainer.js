import React, { Component } from 'react'
import { Wallet } from 'components';

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dashboardActions from 'store/modules/dashboard';


class WalletContainer extends Component {
  render () {
    return (
        <Wallet {...this.props}/>
    )
  }
}

export default connect(
  (state) => ({
    balance: state.dashboard.getIn(['transaction', 'balance']),
  }),
  (dispatch) => ({
    DashboardActions: bindActionCreators(dashboardActions, dispatch),
  })
)(WalletContainer);