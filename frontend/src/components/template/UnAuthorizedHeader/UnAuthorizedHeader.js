import React from 'react';
import { Link } from 'react-router-dom';

import styles from './UnAuthorizedHeader.scss';
import usrImg from 'static/images/usrProfile.png';
import bellImg from 'static/images/bell.png';
import mailImg from 'static/images/mail.png';

const UnauthorizedNav = function UnauthorizedNav() {
    return (
      <React.Fragment>
        <ul className={['navbar-nav mr-auto', styles.leftBar].join(' ')}>
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

export default UnauthorizedNav;