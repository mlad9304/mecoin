import React from 'react';
import Dashboard from '../../components/Dashboard';
import * as styles from './styles.module.css';

class WithdrawPage extends React.Component {
  render() {
    return (
      <Dashboard>
        <div className={styles.container}>
          <p className={styles.title}>
            <b>Withdraw Fund</b>
          </p>
          <hr className={['mb-0', styles.divider].join(' ')} />
          <div className="row h-100">
            <div className={['col h-100', styles.verticalDivider].join(' ')}>
              <p>
                My Wallet Balance: <span className={styles.value}>$00.20</span>
              </p>
              <div>
                <p className="mb-1">Withdrawal Amount</p>
                <div
                  className={['row', styles.withdrawInputContainer].join(' ')}
                >
                  <div className="col-10 pr-0">
                    <input className={styles.withdrawInput} value="$00.00" />
                  </div>
                  <div className="col-2 text-left pl-2 position-relative">
                    <div className={styles.unit}>Eth</div>
                  </div>
                </div>
                <p>Available balance remaining: $00.00 Eth</p>

                <br />
                <div className="row text-center">
                  <a className={styles.btnWithdraw}>Withdraw Now</a>
                </div>
              </div>
            </div>
            <div className="col h-100">
              <br />
              <p className="mb-1">
                <b>Recently Withdraw</b>
              </p>
              <hr className={['mt-0', styles.subDivider].join(' ')} />
              <div className={styles.depositHistory}>
                <p>Tom S, deposit $10 Eth at 6:00PM, 10-Jan-2018</p>
                <hr className={styles.subDivider} />
                <p>Tom S, deposit $2 Eth at 1:00PM, 08-Jan-2018</p>
                <hr className={styles.subDivider} />
                <p>Tom S, deposit $11 Eth at 5:00PM, 06-Jan-2018</p>
              </div>
            </div>
          </div>
        </div>
      </Dashboard>
    );
  }
}

export default WithdrawPage;
