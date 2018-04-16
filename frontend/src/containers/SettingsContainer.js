import React, { Component } from 'react'
import { Settings } from 'components';
import { withRouter } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as formActions from 'store/modules/form';
import * as authActions from 'store/modules/auth';

class SettingsContainer extends Component {
  render () {
    return (
        <Settings {...this.props}/>
    )
  }
}

export default connect(
  (state) => ({
    logged: state.auth.getIn(['session', 'logged']),
    userId: state.auth.getIn(["session", "user", "_id"]),
    email: state.auth.getIn(["session", "user", "email"]),
    passwordSetting: state.form.getIn(["passwordSetting"]).toJS(),
    emailSetting: state.form.getIn(["emailSetting"]).toJS(),
  }),
  (dispatch) => ({
    FormActions: bindActionCreators(formActions, dispatch),
    AuthActions: bindActionCreators(authActions, dispatch),
  })
)(withRouter(SettingsContainer));