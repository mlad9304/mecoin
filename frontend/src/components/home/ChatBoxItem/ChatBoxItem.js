import React from 'react';
import './ChatBoxItem.scss';
import samplePhoto from 'static/images/meow.jpg';

const ChatBoxItem = () => {
  return (
    <div className='w-100 chatItem'>
      <div className="photoContainer">
        <img className="photo" src={samplePhoto} />
        <div className="status" />
      </div>
      <div className="chatText">
        <p className="mb-0">I'm bad gambler</p>
      </div>
    </div>
  );
};

export default ChatBoxItem;
