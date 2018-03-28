import React, { Component } from 'react';
import './Wallet.scss';

class Wallet extends Component {
  render() {
    return (
      <div className="wallet_container">
        <p className="wallet_title">My Wallet</p>
        <hr className="divider" />
        <p className="balance">Available Balance</p>
        <p className="value">$00.20 Eth</p>
        <hr className="divider" />
        <br />
        <div>
          <a className="depositFund">Deposit Fund</a>
          <a className="drawFund">Withdraw Fund</a>
        </div>
        <div className="mt-5">
          <a className="home">HOME</a>
        </div>
      </div>
    );
  }
}

export default Wallet;
