import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Withdraw } from 'components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as formActions from 'store/modules/form';
import * as dashboardActions from 'store/modules/dashboard';

class WithdrawContainer extends Component {
  render () {
    return (
      <Withdraw {...this.props}/>
    )
  }
}

export default connect(
  (state) => ({
    form: state.form.get('withdraw').toJS(),
    balance: state.dashboard.getIn(['transaction', 'balance']),
    logged: state.auth.getIn(['session', 'logged']),
    userId: state.auth.getIn(['session', 'user', 'userId']),
    withdrawHistory: state.dashboard.getIn(['transaction', 'withdrawHistory']),
  }),
  (dispatch) => ({
    FormActions: bindActionCreators(formActions, dispatch),
    DashboardActions: bindActionCreators(dashboardActions, dispatch),
  })
)(withRouter(WithdrawContainer));