import React, { Component } from 'react'
import { GameRoom } from 'components';


class GameRoomContainer extends Component {
  render () {
    return (
        <GameRoom {...this.props}/>
    )
  }
}

export default GameRoomContainer;