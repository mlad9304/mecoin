import React from 'react';
import './ChatInput.scss';

const HomeRightSidebar = () => {
  return (
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
  );
};

export default HomeRightSidebar;
