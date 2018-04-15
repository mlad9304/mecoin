import React, { Component } from 'react'
import Profile from 'components/dashboard/Profile';
import { withRouter } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as formActions from 'store/modules/form';
import * as authActions from 'store/modules/auth';

class ProfileContainer extends Component {
  render () {
    return (
      <div>
        <Profile {...this.props}/>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    logged: state.auth.getIn(['session', 'logged']),
    user: state.auth.getIn(["session", "user"]).toJS(),
    form: state.form.getIn(["profile"]).toJS(),
  }),
  (dispatch) => ({
    FormActions: bindActionCreators(formActions, dispatch),
    AuthActions: bindActionCreators(authActions, dispatch),
  })
)(withRouter(ProfileContainer));