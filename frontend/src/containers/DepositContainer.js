import React, { Component } from 'react'
import Deposit from 'components/dashboard/Deposit';


class DepositContainer extends Component {
  render () {
    return (
        <Deposit {...this.props}/>
    )
  }
}

export default DepositContainer;