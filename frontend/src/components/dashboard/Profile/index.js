import React, { Component } from 'react';
import './Profile.scss';

class Profile extends Component {

  render() {
    return (
      <div className="profile_container">
          <p className="profile_title">My Profile</p>
          <hr className="divider" />
          <div className="row">
            <div className="col-5">
              <p className="mb-1">First Name</p>
              <input className="inputForm" />
            </div>
            <div className="col-5 offset-2">
              <p className="mb-1">Last Name</p>
              <input className="inputForm" />
            </div>
          </div>
          <br />
          <p className="mb-1">Address</p>
          <div>
            <input className='mb-3 inputForm' />
          </div>
          <div>
            <input className="inputForm" />
          </div>
          <br />
          <div className="row">
            <div className="col pr-1">
              <p className="mb-1">Zip Code</p>
              <input className="inputForm" />
            </div>
            <div className="col pl-1 pr-1">
              <p className="mb-1">City</p>
              <input className="inputForm" />
            </div>
            <div className="col-3 pl-1">
              <p className="mb-1">Country</p>
              <select className="inputForm">
                <option>China</option>
                <option>United States</option>
              </select>
            </div>
          </div>
          <br />
          <br />
          <a className="btnSave">Save Update</a>
          <p className='d-inline-block updateSuccess'>
            &nbsp;&nbsp;<i
              className='fa fa-check check'
            />Update Change Successfully
          </p>
        </div>
    );
  }
}

export default Profile;
