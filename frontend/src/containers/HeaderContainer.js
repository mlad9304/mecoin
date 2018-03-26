import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// import redux dependencies
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';

import { Header } from 'components';
import logo from 'static/images/logo.png';

const navStyle = {
  backgroundColor: '#10141e',
  color: '#9cacae'
};

class HeaderContainer extends Component {
  
  render() {
    return (
      <Header />
    );
  }
}

export default connect(
  (state) => ({
    
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(HeaderContainer);