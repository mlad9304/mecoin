import React, { Component } from 'react'
import { HomeLeftSidebar } from 'components';


class HomeLeftSidebarContainer extends Component {
  render () {
    return (
      <div>
        <HomeLeftSidebar {...this.props}/>
      </div>
    )
  }
}

export default HomeLeftSidebarContainer;