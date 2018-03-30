import React, { Component } from 'react'
import { ChatBox } from 'components';

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as chatActions from 'store/modules/mechat';

class ChatBoxContainer extends Component {
  render () {
    return (
      <ChatBox {...this.props}/>
    )
  }
}

export default connect(
  (state) => ({
    logged: state.auth.getIn(['session', 'logged']),
    socketAuth: state.mechat.getIn(['chat', 'socket', 'auth']),
    messages: state.mechat.getIn(['chat', 'data']).toJS(),
  }),
  (dispatch) => ({
    getRecentMsg: bindActionCreators(chatActions, dispatch).getRecentMsg,
  })
)(ChatBoxContainer);