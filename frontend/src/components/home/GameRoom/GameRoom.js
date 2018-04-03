import React from 'react';
import { Link } from 'react-router-dom';
import './GameRoom.scss';
import mark from 'static/images/gameroom_mark.png';
import diceImg from 'static/images/gameroom_img.png';

const GameRoom = () => {
  return (
    <div className="gameroomContainer">
        <div className="markContainer">
            <img src={mark} role="presentation" alt="mark"/>
            <p className="markLetter">0/100</p>
        </div>
        <div className="row">
            <div className="col text-center">
            <p className="diceContainer">
                <img src={diceImg} role="presentation" alt="dice"/>
            </p>
            <br />
            <p className="text-center">
                <a className="btnJoin">JOIN</a>
                <a className="btnLeave">LEAVE</a>
            </p>
            <br />
            <p className="text-center">
                <Link to="/home" className="btnLeave">HOME</Link>
            </p>
            </div>
            <div className="col text-center" />
        </div>
    </div>
  );
};

export default GameRoom;
