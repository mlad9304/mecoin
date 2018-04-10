import React, { Component } from 'react'
import { withRouter } from 'react-router';
import Deposit from 'components/dashboard/Deposit';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as formActions from 'store/modules/form';
import * as dashboardActions from 'store/modules/dashboard';

class DepositContainer extends Component {
  render () {
    return (
        <Deposit {...this.props}/>
    )
  }
}

export default connect(
  (state) => ({
    form: state.form.get('walletDeposit').toJS(),
    balance: state.dashboard.getIn(['transaction', 'balance']),
    logged: state.auth.getIn(['session', 'logged']),
    userId: state.auth.getIn(['session', 'sessionID']),
  }),
  (dispatch) => ({
    FormActions: bindActionCreators(formActions, dispatch),
    DashboardActions: bindActionCreators(dashboardActions, dispatch),
  })
)(withRouter(DepositContainer));