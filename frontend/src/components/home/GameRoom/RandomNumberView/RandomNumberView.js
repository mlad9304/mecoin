import React, { Component } from 'react';
import './RandomNumberView.scss';

class RandomNumberView extends Component {
    render() {

        const { randomNumber } = this.props;

        return(
            <div className="randomNumberView mx-auto">
                {randomNumber}
            </div>
        );
    }
}

export default RandomNumberView;