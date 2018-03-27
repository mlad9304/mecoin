import React from 'react';
import { ChatBoxItem } from 'components';
import './ChatBox.scss';

const HomeRightSidebar = () => {
  return (
    <div className="h-100">
      <div className="chatBoxContainer">
        <div className="chatBox">
          <div className="statusBox">
            <div className="w-100 p-1">
              <span className='rounded-circle fa fa-circle color-green chat_status' />
              <p className='color-lighgrey mb-0 d-inline-block chat_status_info'>
                <span className="ml-1">799 People</span>
                <span className="color-green"> &nbsp;Online</span>
              </p>
            </div>
            <button className="statusButton">
              <span className="fa fa-chevron-right" />
            </button>
          </div>
          <div className="chatBoxItems">
            <ChatBoxItem />
            <ChatBoxItem />
            <ChatBoxItem />
            <ChatBoxItem />
            <ChatBoxItem />
          </div>
        </div>
      </div>
      <div className="inputBoxContainer">
        <textarea rows="3" cols="50" className="w-100" />
        <div className="buttonContainer">
          <button className="sendBtn">
            <b>Send</b>
          </button>
          <button className="emojiBtn">
            <span className="fa fa-smile-o" />
            <div className="select_arrow" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeRightSidebar;
