import React, { Component } from 'react';

import MenuItem from './MenuItem';
import './DashboardLeftbar.scss';
import profileImg from 'static/images/profile.png';

const createMenuItems = (menu_items, active_menu_id, selectMenu) => {

  return menu_items.map(function(item) {

    return(
      <MenuItem
        key={item.id}
        id={item.id}
        title={item.title}
        menuClick={selectMenu}
        image={item.id === active_menu_id ? item.image_active : item.image}
        url={item.url}
        active={item.id === active_menu_id ? true : false}
        activeLink={true}
      />
    );
  });
}

class DashboardLeftbar extends Component {
  render() {

    const { menu_items, active_menu_id, DashboardActions } = this.props;

    return (
      <div className="dashboard_leftbar_container">
        <div className="img_container">
          <img src={profileImg} />
          <p className="name">Tom Smith</p>
          <p className="win">Win:779</p>
        </div>
        <div className="side_menu_container">
          <div className="side_menu">
            <MenuItem
              image="total_spent.png"
              title="Total Spent"
              title2="$1500.0212"
              hasBorder={true}
            />
            <MenuItem
              image="game_won.png"
              title="Game won"
              title2="779"
              hasBorder={true}
            />
            <MenuItem
              image="total_earned.png"
              title="Total Earned"
              title2="$5932.0221"
              hasBorder={true}
            />

            {createMenuItems(
              menu_items,
              active_menu_id,
              DashboardActions.selectMenu
            )}
            
            <MenuItem image="logout.png" title="Logout" />
          </div>
          <span className='fa fa-pencil-square-o edit' />
        </div>
      </div>
    );
  }
}

export default DashboardLeftbar;
