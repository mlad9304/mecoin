import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import './TransactionsReport.scss';

import notify from 'helpers/notify'

class TransactionsReport extends Component {

  componentWillMount() {
    const { DashboardActions, userId, logged, history } = this.props;

    if(!logged || userId === null) {
      // alert('login first');
      notify({type: 'error', message: 'Please Login'});
      setTimeout( ()=> {
          history.push('/login');
      }, 700);
      return;
    }

    DashboardActions.getTransactionHistory(userId);
  }

  render() {

    const { transactionHistory } = this.props;

    const transactionHistoryView = transactionHistory.map(item => {
      return (
        <p className="history" key={item._id}>
          { item.type === 'BUY_TICKET' && 
          <span>Buy tickets: {Math.abs(item.amount)} Gems</span>
          }
          { item.type === 'WINNING' && 
          <span>Win game: {item.amount} Gems</span>
          }
          { item.type === 'DEPOSIT' && 
          <span>Deposit: {item.amount/1000} Eth</span>
          }
          { item.type === 'DEPOSIT_FEE' && 
          <span>Deposit fee: {Math.abs(item.amount/1000)} Eth</span>
          }
          { item.type === 'WITHDRAW' && 
          <span>Withdraw: {Math.abs(item.amount/1000)} Eth</span>
          }
          &nbsp;at {item.createdAt}
          <hr className="divider" />
        </p>
      )
    });

    return (
      <div className="transaction_report_container">
        <p className="transaction_report_title">
          <b>Transaction History</b>
        </p>
        <hr className="divider" />
        <Scrollbars
            style={{
                width: '100%',
                height: '85%',
                borderBottom: '1px solid rgba(0,0,0,0.10)',
                padding: '0 5px 10px 5px'
            }} 
            ref={(ref) => {
                this.scrollBox = ref
            }}
        >
            {transactionHistoryView}

        </Scrollbars>
      </div>
    );
  }
}

export default TransactionsReport;
