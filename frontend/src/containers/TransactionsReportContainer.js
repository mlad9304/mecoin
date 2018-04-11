import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { TransactionsReport } from 'components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dashboardActions from 'store/modules/dashboard';

class TransactionsReportContainer extends Component {
  render () {
    return (
        <TransactionsReport {...this.props}/>
    )
  }
}

export default connect(
  (state) => ({
    logged: state.auth.getIn(['session', 'logged']),
    userId: state.auth.getIn(['session', 'user', '_id']),
    transactionHistory: state.dashboard.getIn(['transaction', 'transactionHistory']),
  }),
  (dispatch) => ({
    DashboardActions: bindActionCreators(dashboardActions, dispatch),
  })
)(withRouter(TransactionsReportContainer));