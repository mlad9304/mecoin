import React, { Component } from 'react'
import { Affiliate } from 'components';


class AffiliateContainer extends Component {
  render () {
    return (
      <Affiliate {...this.props}/>
    )
  }
}

export default AffiliateContainer;