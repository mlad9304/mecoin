import React, { Component } from 'react'
import { TransactionsReport } from 'components';


class TransactionsReportContainer extends Component {
  render () {
    return (
        <TransactionsReport {...this.props}/>
    )
  }
}

export default TransactionsReportContainer;