import React, { Component } from 'react';
import './ChatInput.scss';



class ChatInput extends Component {

  render() {

    const { onChange, onSend, message } = this.props;

    return (
      <div className="inputBoxContainer">
        <textarea rows="3" cols="50" className="w-100" onChange={onChange} message={message} id="message"></textarea>
        <div className="buttonContainer">
          <button className="sendBtn" onClick={onSend}>
            <b>Send</b>
          </button>
          <button className="emojiBtn">
            <span className="fa fa-smile-o" />
            <div className="select_arrow" />
          </button>
        </div>
      </div>
    );
  }
};

export default ChatInput;
