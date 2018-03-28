import React, { Component } from 'react';
import './Settings.scss';

class Settings extends Component {
  render() {
    return (
      <div className="settings_container">
        <p className="settings_title">Settings</p>
        <hr className="divider" />
        <div className="row">
          <div className="col pr-lg-5">
            <p className="subTitle"> Change Password</p>
            <input
              className="inputForm"
              placeholder="Enter your old password"
            />
            <input
              className="inputForm"
              placeholder="Enter your new password"
            />
            <input
              className="inputForm"
              placeholder="Confirm new password"
            />
            <br />
            <br />
            <a className="btnSaveGreen">Save Change</a>
          </div>
          <div className="col pl-lg-5">
            <p className="subTitle"> Change Email</p>
            <input
              className="inputForm"
              placeholder="username@gmail.com"
            />
            <input
              className="inputForm"
              placeholder="Enter new email id"
            />
            <br />
            <br />
            <a className="btnSaveYellow">Save Change</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
