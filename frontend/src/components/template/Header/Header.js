import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';

import logo from 'static/images/logo.png';
import usrImg from 'static/images/usrProfile.png';
import bellImg from 'static/images/bell.png';
import mailImg from 'static/images/mail.png';

const AuthorizedNav = () => {
  return (
    <React.Fragment>
      <ul className='navbar-nav mr-auto leftBar'>
        <li className="nav-item active">
          <Link className="nav-link" to="/">
            Home <span className="sr-only">(current)</span>
          </Link>
        </li>
        <li className='nav-item leftBorder'>
          <Link className="nav-link disabled-link" to="/">
            Balance: 20 Dimonds <br />
            <span className='ethValue'>Eth Value: 0.20</span>
          </Link>
        </li>
        <li className='nav-item leftBorder'>
          <Link className="nav-link" to="/wallet">
            My Wallet
          </Link>
        </li>
        <li className='nav-item leftBorder'>
          <Link className="nav-link" to="/report">
            History
          </Link>
        </li>
        <li className='nav-item leftBorder'>
          <Link className="nav-link disabled-link" to="/help">
            Help
          </Link>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link disabled-link position-relative" to="/help">
            <div className="notificationBox">
              <img className="notificationMailItem" src={mailImg} />
              <span className="circle" />
              <span className="num">5</span>
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link disabled-link position-relative" to="/help">
            <div className="notificationBox">
              <img className="notificationNavItem" src={bellImg} />
              <span className="circle" />
              <span className="num">5</span>
            </div>
          </Link>
        </li>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <div className="float-left">
              <div className="usrImgContainer">
                <img src={usrImg} role="presentation" />
              </div>
            </div>
            <div className="float-left">
              <p className="userTitle goodEvening">Good evening</p>
              <p className="userTitle usrName">Tom Smith</p>
              <p className="userTitle win">Win: 779</p>
            </div>
            <div className="dropdown-menu">
              <a className="dropdown-item">Action 0</a>
              <a className="dropdown-item">Action 1</a>
              <a className="dropdown-item">Action 2</a>
            </div>
          </a>
        </li>
      </ul>
    </React.Fragment>
  );
};

const UnAuthorizedNav = () => {
  return (
    <React.Fragment>
      <ul className='navbar-nav mr-auto leftBar'>
        <li className="nav-item active">
          <Link className="nav-link" to="/">
            Home <span className="sr-only">(current)</span>
          </Link>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
          <Link className="nav-link" to="/">
            My Wallet <span className="sr-only">(current)</span>
          </Link>
        </li>
        <li className="nav-item active">
          <Link className="nav-link" to="/">
            Register <span className="sr-only">(current)</span>
          </Link>
        </li>
        <li className="nav-item active">
          <Link className="nav-link" to="/login">
            Login<span className="sr-only">(current)</span>
          </Link>
        </li>
      </ul>
    </React.Fragment>
  );
};

const navStyle = {
  backgroundColor: '#10141e',
  color: '#9cacae'
};

const Header = () => {
  return (
    <nav id="header"
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
        <AuthorizedNav />
      </div>
    </nav>
  );
};

export default Header;