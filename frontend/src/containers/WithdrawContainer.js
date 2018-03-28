import React, { Component } from 'react'
import { Withdraw } from 'components';


class WithdrawContainer extends Component {
  render () {
    return (
      <Withdraw {...this.props}/>
    )
  }
}

export default WithdrawContainer;