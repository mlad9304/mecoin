import React, { Component } from 'react';
import notify from 'helpers/notify';
import { withRouter } from 'react-router';
import './Settings.scss';

class Settings extends Component {

  constructor(props) {
    super(props);

    const { FormActions, email } = props;
    FormActions.setEmailForm(email);
  }

  handleChangeEmailSetting = (e) => {
    const { FormActions } = this.props;
    FormActions.changeInput({form: 'emailSetting', name: e.target.name, value: e.target.value});
  }

  handleSubmitEmail = async () => {
    const { AuthActions, emailSetting, FormActions, logged, userId, history } = this.props; 
    const { email, newemail} = emailSetting;

    const regex = {
      email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }

    if(!logged || userId == null ) {
      // alert('login first');
      notify({type: 'error', message: 'Please Login'});
      setTimeout( ()=> {
          history.push('/login');
      }, 700);
      return;
    }

    let error = false;

    if (!regex.email.test(email)) {
        error = true;
        notify({type: 'error', message: "Email invalid"});
        FormActions.setInputError({form: 'emailSetting', name: 'email', error: true});
    } else {
        FormActions.setInputError({form: 'emailSetting', name: 'email', error: false});
    }

    if (!regex.email.test(newemail)) {
      error = true;
      notify({type: 'error', message: "New email invalid"});
      FormActions.setInputError({form: 'emailSetting', name: 'newemail', error: true});
    } else {
      FormActions.setInputError({form: 'emailSetting', name: 'newemail', error: false});
    }

    if(email === newemail) {
      error = true;
      notify({type: 'error', message: "Input another new email"});
    }

    if (error) {
      return;
    }

    await AuthActions.updateEmail(userId, newemail);
    notify({type: 'success', message: 'Successfully updated'});

    FormActions.formReset();
    FormActions.setEmailForm(this.props.email);
  }

  handleChangePasswordSetting = (e) => {
    const { FormActions } = this.props;
    FormActions.changeInput({form: 'passwordSetting', name: e.target.name, value: e.target.value});
  }

  handleSubmitPassword = async () => {
    const { AuthActions, passwordSetting, FormActions, logged, userId, history } = this.props; 
    const { newpassword, confirmpassword } = passwordSetting;

    const regex = {
      password: /^.{5,30}$/,
    }

    if(!logged || userId == null ) {
      // alert('login first');
      notify({type: 'error', message: 'Please Login'});
      setTimeout( ()=> {
          history.push('/login');
      }, 700);
      return;
    }

    let error = false;

    if (!regex.password.test(newpassword)) {
        error = true;
        notify({type: 'error', message: "Password should be 5~30 characters."});
        FormActions.setInputError({form: 'passwordSetting', name: 'newpassword', error: true});
    } else {
        FormActions.setInputError({form: 'passwordSetting', name: 'newpassword', error: false});
    }

    if (newpassword !== confirmpassword) {
      error = true;
      notify({type: 'error', message: "Password not matching"});
      FormActions.setInputError({form: 'passwordSetting', name: 'newpassword', error: true});
    } else {
      FormActions.setInputError({form: 'passwordSetting', name: 'newpassword', error: false});
    }

    if (error) {
      return;
    }

    await AuthActions.updatePassword(userId, newpassword);
    FormActions.formReset();
    notify({type: 'success', message: 'Successfully updated. Please login again.'});
    setTimeout( ()=> {
      history.push('/login');
    }, 700);

  }

  render() {

    const { handleChangeEmailSetting, handleChangePasswordSetting, handleSubmitEmail, handleSubmitPassword } = this;
    const { email, newemail } = this.props.emailSetting;
    const { newpassword, confirmpassword } = this.props.passwordSetting;

    return (
      <div className="settings_container">
        <p className="settings_title">Settings</p>
        <hr className="divider" />
        <div className="row">
          <div className="col pr-lg-5">
            <p className="subTitle"> Change Password</p>
            <input
              className="inputForm"
              placeholder="Enter your new password"
              name="newpassword"
              value={newpassword}
              onChange={handleChangePasswordSetting}
              type="password"
            />
            <input
              className="inputForm"
              placeholder="Confirm new password"
              name="confirmpassword"
              value={confirmpassword}
              onChange={handleChangePasswordSetting}
              type="password"
            />
            <br />
            <br />
            <a className="btnSaveGreen" onClick={handleSubmitPassword}>Save Change</a>
          </div>
          <div className="col pl-lg-5">
            <p className="subTitle"> Change Email</p>
            <input
              className="inputForm"
              placeholder="username@gmail.com"
              name="email"
              value={email}
              onChange={handleChangeEmailSetting}
            />
            <input
              className="inputForm"
              placeholder="Enter new email"
              name="newemail"
              value={newemail}
              onChange={handleChangeEmailSetting}
            />
            <br />
            <br />
            <a className="btnSaveYellow" onClick={handleSubmitEmail}>Save Change</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
