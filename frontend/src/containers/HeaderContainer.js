import React, { Component } from 'react';

// import redux dependencies
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import * as dashboardActions from 'store/modules/dashboard';

import { Header } from 'components';

class HeaderContainer extends Component {
  
  render() {
    return (
      <Header {...this.props}/>
    );
  }
}

export default connect(
  (state) => ({
    logged: state.auth.getIn(['session', 'logged']),
    balance: state.dashboard.getIn(['transaction', 'balance']),
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    selectMenu: bindActionCreators(dashboardActions, dispatch).selectMenu,
  })
)(HeaderContainer);