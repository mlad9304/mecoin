import React from 'react';
import './Withdraw.scss';

class Withdraw extends React.Component {
  render() {
    return (
        <div className="withdraw_container">
            <p className="withdraw_title">
                <b>Withdraw Fund</b>
            </p>
            <hr className='mb-0 divider' />
            <div className="row h-100">
                <div className='col h-100 verticalDivider'>
                    <p>
                        My Wallet Balance: <span className="value">$00.20</span>
                    </p>
                    <div>
                        <p className="mb-1">Withdrawal Amount</p>
                        <div className='row withdrawInputContainer'>
                            <div className="col-10 pr-0">
                                <input className="withdrawInput" placeholder="$00.00" />
                            </div>
                            <div className="col-2 text-left pl-2 position-relative">
                                <div className="unit">Eth</div>
                            </div>
                        </div>
                        <p>Available balance remaining: $00.00 Eth</p>

                        <br />
                        <div className="row text-center">
                            <a className="btnWithdraw">Withdraw Now</a>
                        </div>
                    </div>
                </div>
                <div className="col h-100">
                    <br />
                    <p className="mb-1">
                        <b>Recently Withdraw</b>
                    </p>
                    <hr className='mt-0 subDivider' />
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

export default Withdraw;
