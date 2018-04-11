import React, { Component } from 'react';
import './Profile.scss';

class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      updated: false
    }
  }

  handleChange = (e) => {
    const { FormActions } = this.props;
    FormActions.changeInput({form: 'profile', name: e.target.name, value: e.target.value});
  }

  handleSubmit = () => {
    const { AuthActions, form, user } = this.props;
    const { firstname, lastname } = form;
    const { userId } = user;
    // AuthActions.updateUserInfo({userId, firstname, lastname});
  }

  render() {

    const { handleChange, handleSubmit } = this;
    const { user, form } = this.props;
    const { firstname, lastname } = user;

    return (
      <div className="profile_container">
          <p className="profile_title">My Profile</p>
          <hr className="divider" />
          <div className="row">
            <div className="col-5">
              <p className="mb-1">First Name</p>
              <input className="inputForm" defaultValue={firstname} name="firstname" onChange={handleChange}/>
            </div>
            <div className="col-5 offset-2">
              <p className="mb-1">Last Name</p>
              <input className="inputForm" defaultValue={lastname} name="lastname" onChange={handleChange}/>
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
          <a className="btnSave" onClick={handleSubmit}>Save Update</a>
          {this.state.updated && 
          <p className='d-inline-block updateSuccess'>
            &nbsp;&nbsp;<i className='fa fa-check check' />
            Update Change Successfully
          </p>
          }
        </div>
    );
  }
}

export default Profile;
