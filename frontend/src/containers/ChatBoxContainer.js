import React, { Component } from 'react'
import { ChatBox } from 'components';


class ChatBoxContainer extends Component {
  render () {
    return (
      <div>
        <ChatBox {...this.props}/>
      </div>
    )
  }
}

export default ChatBoxContainer;