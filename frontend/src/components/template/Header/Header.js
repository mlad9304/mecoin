import React, { Component } from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';

import logo from 'static/images/logo.png';
import usrImg from 'static/images/usrProfile.png';
import bellImg from 'static/images/bell.png';
import mailImg from 'static/images/mail.png';



class AuthorizedNav extends Component {

  render() {
    
    const { selectMenu, balance, user, gameWon } = this.props;
    const { balanceGem, balanceEth } = balance;
    
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
              Balance: {balanceGem} Gems <br />
              <span className='ethValue'>Eth Value: {balanceEth}</span>
            </Link>
          </li>
          <li className='nav-item leftBorder'>
            <Link className="nav-link" to="/dashboard/wallet" onClick={() => selectMenu("2")}>
              My Wallet
            </Link>
          </li>
          <li className='nav-item leftBorder'>
            <Link className="nav-link" to="/dashboard/report" onClick={() => selectMenu("5")}>
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
                <img className="notificationMailItem" src={mailImg} alt="mail_img"/>
                <span className="circle" />
                <span className="num">5</span>
              </div>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link disabled-link position-relative" to="/help">
              <div className="notificationBox">
                <img className="notificationNavItem" src={bellImg} alt="bell_item"/>
                <span className="circle" />
                <span className="num">5</span>
              </div>
            </Link>
          </li>
          <li className="nav-item dropdown">
            <div
              className="nav-link dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <div className="float-left">
                <div className="usrImgContainer">
                  <img src={usrImg} role="presentation" alt="user_img"/>
                </div>
              </div>
              <div className="float-left">
                <p className="userTitle goodEvening">Good evening</p>
                <p className="userTitle usrName">{user.firstname} {user.lastname}</p>
                <p className="userTitle win">Win: {gameWon}</p>
              </div>
              <div className="dropdown-menu">
                <a className="dropdown-item">Action 0</a>
                <a className="dropdown-item">Action 1</a>
                <a className="dropdown-item">Action 2</a>
              </div>
            </div>
          </li>
        </ul>
      </React.Fragment>
    );
  }

  
}

const UnAuthorizedNav = ({ selectMenu }) => {

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
          <Link className="nav-link" to="/dashboard/wallet" onClick={() => selectMenu("2")}>
            My Wallet <span className="sr-only">(current)</span>
          </Link>
        </li>
        <li className="nav-item active">
          <Link className="nav-link" to="/signup">
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

const Header = ({logged, selectMenu, getBalance, balance, user, gameWon}) => {

  return (
    <nav id="header"
      className="navbar navbar-expand-md navbar-dark"
      style={navStyle}
    >
      <Link className="navbar-brand" to="/">
        <img className="logo" src={logo} role="presentation" alt="logo"/>
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
        { logged ? <AuthorizedNav selectMenu={selectMenu} getBalance={getBalance} balance={balance} user={user} gameWon={gameWon} /> : <UnAuthorizedNav selectMenu={selectMenu} />}
      </div>
    </nav>
  );
};

export default Header;