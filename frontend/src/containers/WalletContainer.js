import React, { Component } from 'react'
import { Wallet } from 'components';


class WalletContainer extends Component {
  render () {
    return (
      <div>
        <Wallet {...this.props}/>
      </div>
    )
  }
}

export default WalletContainer;