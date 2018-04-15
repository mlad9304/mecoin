import React, { Component } from 'react';
import './Profile.scss';
import PlacesAutocomplete from 'react-places-autocomplete';
import notify from 'helpers/notify';

class Profile extends Component {

  constructor(props) {
    super(props);

    const { FormActions, user } = props;
    FormActions.setProfileForm(user);
    
    this.state = {
      updated: false,
      city: user.city
    }

    this.onChangeCity = (city) => this.setState({ city })
  }

  componentDidMount() {
    // var input = document.getElementById('searchTextField');
    // new window.google.maps.places.Autocomplete(input);
  }


  handleChange = (e) => {
    this.setState({
      updated: false
    });
    const { FormActions } = this.props;
    FormActions.changeInput({form: 'profile', name: e.target.name, value: e.target.value});
  }

  handleSubmit = async () => {
    const { AuthActions, form, user, logged, history } = this.props;
    const { firstname, lastname } = form;
    const { _id: userId } = user;

    if(!logged || userId == null ) {
      // alert('login first');
      notify({type: 'error', message: 'Please Login'});
      setTimeout( ()=> {
          history.push('/login');
      }, 700);
      return;
    }

    const formData = {
      ...form,
      city: this.state.city
    }
    
    await AuthActions.updateUserInfo(userId, formData);

    this.setState({
      updated: true
    });
  }


  render() {

    const { handleChange, handleSubmit } = this;
    const { firstname, lastname, address1, address2, zipcode } = this.props.form;

    const inputProps = {
      value: this.state.city,
      onChange: this.onChangeCity,
    }

    const myStyles = {
      root: { width: '100%' },
      input: { width: '100%', height: '40px', backgroundColor: '#b5b7ba' },
      autocompleteContainer: { backgroundColor: '#b5b7ba' },
      autocompleteItem: { backgroundColor: '#b5b7ba' },
      autocompleteItemActive: { backgroundColor: '#b5b7ba' }
    }

    return (
      <div className="profile_container">
          <p className="profile_title">My Profile</p>
          <hr className="divider" />
          <div className="row">
            <div className="col-5">
              <p className="mb-1">First Name</p>
              <input className="inputForm" value={firstname} name="firstname" onChange={handleChange}/>
            </div>
            <div className="col-5 offset-2">
              <p className="mb-1">Last Name</p>
              <input className="inputForm" value={lastname} name="lastname" onChange={handleChange}/>
            </div>
          </div>
          <br />
          <p className="mb-1">Address</p>
          <div>
            <input className='mb-3 inputForm' value={address1} name="address1" onChange={handleChange}/>
          </div>
          <div>
            <input className="inputForm" value={address2} name="address2" onChange={handleChange}/>
          </div>
          <br />
          <div className="row pr-1">
            <div className="col pr-1">
              <p className="mb-1">Zip Code</p>
              <input className="inputForm" value={zipcode} name="zipcode" onChange={handleChange}/>
            </div>
            <div className="col pl-1">
              <p className="mb-1">City</p>
              {/* <input className="inputForm" id="searchTextField" /> */}
              <PlacesAutocomplete className="inputForm" styles={myStyles} inputProps={inputProps} />
            </div>
            {/* <div className="col-3 pl-1">
              <p className="mb-1">Country</p>
              <select className="inputForm">
                <option>United States</option>
              </select>
            </div> */}
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
