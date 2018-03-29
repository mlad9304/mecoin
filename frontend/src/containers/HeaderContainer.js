import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// import redux dependencies
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import * as dashboardActions from 'store/modules/dashboard';

import { Header } from 'components';
import logo from 'static/images/logo.png';

const navStyle = {
  backgroundColor: '#10141e',
  color: '#9cacae'
};

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
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    selectMenu: bindActionCreators(dashboardActions, dispatch).selectMenu
  })
)(HeaderContainer);