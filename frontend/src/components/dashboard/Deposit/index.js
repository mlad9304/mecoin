import React, { Component } from 'react';
import './Deposit.scss';

class Deposit extends Component {
  render() {
    return (
        <div className="deposit_container">
            <p className="deposit_title">
                <b>Deposit Fund</b>
            </p>
            <hr className="divider" />
            <p className="text-right">
                My Wallet Balance:{' '}
                <span className="balance">
                    <b>$00.20</b>
                </span>
            </p>
            <hr className="mb-0 divider" />
            <div className="row h-100">
                <div className="col h-100 verticalDivider">
                    <p className="depositAmount">Deposit Amount</p>
                    <div className="row depositInputContainer">
                        <div className="col-10 pr-0">
                            <input className="depositInput" placeholder="$00.00" />
                        </div>
                        <div className="col-2 text-left pl-2 position-relative">
                            <div className="unit">Eth</div>
                        </div>
                    </div>
                    <br />
                    <a className="btnDeposit">
                        <b>Deposit Now</b>
                    </a>
                </div>
                <div className="col h-100">
                    <br />
                    <p className="mb-1">
                        <b>Recently Deposit</b>
                    </p>
                    <hr className="mt-0 subDivider" />
                    <div className="depositHistory">
                        <p>Tom S, deposit $10 Eth at 6:00PM, 10-Jan-2018</p>
                        <hr className="subDivider" />
                        <p>Tom S, deposit $2 Eth at 1:00PM, 08-Jan-2018</p>
                        <hr className="subDivider" />
                        <p>Tom S, deposit $11 Eth at 5:00PM, 06-Jan-2018</p>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default Deposit;
