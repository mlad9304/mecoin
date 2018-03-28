import React, { Component } from 'react'
import { SupportTicket } from 'components';


class SupportTicketContainer extends Component {
  render () {
    return (
        <SupportTicket {...this.props}/>
    )
  }
}

export default SupportTicketContainer;