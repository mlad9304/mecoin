import React, { Component } from 'react';
import './GameLogsItem.scss';
import samplePhoto from 'static/images/usrProfile.png';

class GameLogsItem extends Component {
    render() {

        const { message } = this.props;

        return(
            <div className='w-100 logItem'>
                <div className="photoContainer">
                    <img className="photo" src={samplePhoto} alt="photo_img"/>
                </div>
                <div className="logText">
                    <p className="mb-0">{message}</p>
                </div>
            </div>
        );
    }
}

export default GameLogsItem;