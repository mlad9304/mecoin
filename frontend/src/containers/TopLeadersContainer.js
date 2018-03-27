import React, { Component } from 'react'
import { TopLeaders } from 'components';


class TopLeadersContainer extends Component {
  render () {
    return (
      <div>
        <TopLeaders {...this.props}/>
      </div>
    )
  }
}

export default TopLeadersContainer;