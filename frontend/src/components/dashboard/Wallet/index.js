import React, { Component } from 'react';
import './Wallet.scss';

class Wallet extends Component {

  gotoDeposit = () => {
    const { history, DashboardActions } = this.props;
    history.push('/dashboard/deposit');
    DashboardActions.selectMenu('3');
  }

  gotoWithdraw = () => {
    const { history, DashboardActions } = this.props;
    history.push('/dashboard/withdraw');
    DashboardActions.selectMenu('4');
  }

  gotoHome = () => {
    const { history } = this.props;
    history.push('/home');
  }
  
  render() {

    const { balance } = this.props;
    const { gotoDeposit, gotoWithdraw, gotoHome } = this;

    return (
      <div className="wallet_container">
        <p className="wallet_title">My Wallet</p>
        <hr className="divider" />
        <p className="balance">Available Balance</p>
        <p className="value">{balance/1000} Eth</p>
        <hr className="divider" />
        <br />
        <div>
          <a className="depositFund" onClick={gotoDeposit}>Deposit Fund</a>
          <a className="drawFund" onClick={gotoWithdraw}>Withdraw Fund</a>
        </div>
        <div className="mt-5">
          <a className="home" onClick={gotoHome}>HOME</a>
        </div>
      </div>
    );
  }
}

export default Wallet;
