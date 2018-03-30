import React, { Component } from 'react'
import DashboardLeftbar from 'components/dashboard/DashboardLeftbar';

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dashboardActions from 'store/modules/dashboard';

class DashboardLeftbarContainer extends Component {
  render () {
    return (
      <div>
        <DashboardLeftbar {...this.props}/>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    menu_items: state.dashboard.getIn(['dashboardLeftBar', 'dashboard_menu_items']).toJS(),
    active_menu_id: state.dashboard.getIn(['dashboardLeftBar', 'active_menu_id'])
  }),
  (dispatch) => ({
    DashboardActions: bindActionCreators(dashboardActions, dispatch),
  })
)(DashboardLeftbarContainer);