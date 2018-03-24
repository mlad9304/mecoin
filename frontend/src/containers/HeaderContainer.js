import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// import redux dependencies
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';

import { AuthorizedHeader, UnAuthorizedHeader } from 'components';
import './HeaderContainer.scss';
import logo from 'static/images/logo.png';

const navStyle = {
  backgroundColor: '#10141e',
  color: '#9cacae'
};

class HeaderContainer extends Component {
  
  render() {
    return (
      <nav
        id="header"
        className="navbar navbar-expand-md navbar-dark"
        style={navStyle}
      >
        <Link className="navbar-brand" to="/">
          <img className="logo" src={logo} role="presentation" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExampleDefault"
          aria-controls="navbarsExampleDefault"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
  
        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <AuthorizedHeader />
        </div>
      </nav>
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