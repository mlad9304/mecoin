import React from 'react';
import { Link } from 'react-router-dom';

import styles from './AuthorizedHeader.scss';
import usrImg from 'static/images/usrProfile.png';
import bellImg from 'static/images/bell.png';
import mailImg from 'static/images/mail.png';

const AuthorizedHeader = () => {
    return (
      <React.Fragment>
        <ul className={['navbar-nav mr-auto', styles.leftBar].join(' ')}>
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className={['nav-item', styles.leftBorder].join(' ')}>
            <Link className="nav-link disabled-link" to="/">
              Balance: 20 Dimonds <br />
              <span className={styles.ethValue}>Eth Value: 0.20</span>
            </Link>
          </li>
          <li className={['nav-item', styles.leftBorder].join(' ')}>
            <Link className="nav-link" to="/wallet">
              My Wallet
            </Link>
          </li>
          <li className={['nav-item', styles.leftBorder].join(' ')}>
            <Link className="nav-link" to="/report">
              History
            </Link>
          </li>
          <li className={['nav-item', styles.leftBorder].join(' ')}>
            <Link className="nav-link disabled-link" to="/help">
              Help
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link disabled-link position-relative" to="/help">
              <div className={styles.notificationBox}>
                <img className={styles.notificationMailItem} src={mailImg} />
                <span className={styles.circle} />
                <span className={styles.num}>5</span>
              </div>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link disabled-link position-relative" to="/help">
              <div className={styles.notificationBox}>
                <img className={styles.notificationNavItem} src={bellImg} />
                <span className={styles.circle} />
                <span className={styles.num}>5</span>
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
                <div className={styles.usrImgContainer}>
                  <img src={usrImg} role="presentation" />
                </div>
              </div>
              <div className="float-left">
                <p className={styles.goodEvening}>Good evening</p>
                <p className={styles.usrName}>Tom Smith</p>
                <p className={styles.win}>Win: 779</p>
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

export default AuthorizedHeader;