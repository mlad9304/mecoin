import React from 'react';
import './GameRoom.scss';
import mark from 'static/images/gameroom_mark.png';
import diceImg from 'static/images/gameroom_img.png';

const GameRoom = () => {
  return (
    <div className="gameroomContainer">
        <div className="markContainer">
            <img src={mark} role="presentation" />
            <p className="markLetter">0/100</p>
        </div>
        <div className="row">
            <div className="col text-center">
            <p className="diceContainer">
                <img src={diceImg} role="presentation" />
            </p>
            <br />
            <p className="text-center">
                <a className="btnJoin">JOIN</a>
                <a className="btnLeave">LEAVE</a>
            </p>
            <br />
            <p className="text-center">
                <a className="btnLeave">HOME</a>
            </p>
            </div>
            <div className="col text-center" />
        </div>
    </div>
  );
};

export default GameRoom;
