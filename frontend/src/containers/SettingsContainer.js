import React, { Component } from 'react'
import { Settings } from 'components';


class SettingsContainer extends Component {
  render () {
    return (
        <Settings {...this.props}/>
    )
  }
}

export default SettingsContainer;