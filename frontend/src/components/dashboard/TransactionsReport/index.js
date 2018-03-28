import React, { Component } from 'react';
import './TransactionsReport.scss';

class TransactionsReport extends Component {
  render() {
    return (
      <div className="transaction_report_container">
        <p className="transaction_report_title">
          <b>Transaction History</b>
        </p>
        <hr className="divider" />
        <p className="history">
          Tom S. withdraw $10 Eth at 6:00 PM, 10-Jan-2018
        </p>
        <hr className="divider" />
        <p className="history">
          Tom S. withdraw $10 Eth at 6:00 PM, 10-Jan-2018
        </p>
        <hr className="divider" />
        <p className="history">
          Tom S. withdraw $10 Eth at 6:00 PM, 10-Jan-2018
        </p>
        <hr className="divider" />
        <p className="history">
          Tom S. withdraw $10 Eth at 6:00 PM, 10-Jan-2018
        </p>
        <hr className="divider" />
        <p className="history">
          Tom S. withdraw $10 Eth at 6:00 PM, 10-Jan-2018
        </p>
        <hr className="divider" />
        <p className="history">
          Tom S. withdraw $10 Eth at 6:00 PM, 10-Jan-2018
        </p>
        <hr className="divider" />
        <p>No more results to be shown</p>
      </div>
    );
  }
}

export default TransactionsReport;
