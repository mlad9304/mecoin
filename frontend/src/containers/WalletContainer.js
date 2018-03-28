import React, { Component } from 'react'
import { Wallet } from 'components';


class WalletContainer extends Component {
  render () {
    return (
        <Wallet {...this.props}/>
    )
  }
}

export default WalletContainer;