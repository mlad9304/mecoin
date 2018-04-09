import React, { Component } from "react";
import TimeCountdown from "react-countdown-now";

class CountDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTime: 0
    };
  }

  componentWillReceiveProps(nextProps) {
      this.setState({
        currentTime: Date.now() + nextProps.time
      });
  }

  // Renderer callback with condition
  renderer = ({ days, hours, minutes, seconds }) => {
    return (
      <span>
      {days > 0 && 
        <span>{days}:{hours}:{minutes}:{seconds}</span>
      }
      {days === 0 && 
        <span>{hours}:{minutes}:{seconds}</span>
      }
        
      </span>
    );
  };

  twoDigits = num => {
    if (num < 10) return "0" + num;
    else return num;
  };

  render() {
    const { renderer } = this;
    return <TimeCountdown date={this.state.currentTime} renderer={renderer} />;
  }
}

export default CountDown;