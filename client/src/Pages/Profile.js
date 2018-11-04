import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';
import locationAPI from '../utils/locationAPI';
import DatePicker from "react-datepicker";
import moment from "moment"; 
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';

const interestsOptions = [
  { value: 'republican', label: 'Republican' },
  { value: 'democrat', label: 'Democrat' },
  { value: 'tax', label: 'Low Taxes' },
  { value: 'welfare', label: 'Social Welfare' },
  { value: 'education', label: 'Education' },
  { value: 'gun', label: 'Gun Baning' },
  { value: 'social', label: 'Social Security' },
  { value: 'retirement', label: 'Retirement' },
];

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      address: '',
      dob: null,
      language: 'en',
      interests: [],
      addressOpts: [],
    }
    this.setOptions = this.setOptions.bind(this);
    this.getGoogleAddress = this.getGoogleAddress.bind(this);
    this.setAddress = this.setAddress.bind(this);
    this.setAddressFromGeoloc = this.setAddressFromGeoloc.bind(this);
    this.interestsChanges = this.interestsChanges.bind(this);
    this.submit = this.submit.bind(this);
  }

  submit(evt) {
    evt.preventDefault();
    const dob = this.state.dob && this.state.dob.format('MM/DD/YYYY');
    const profileInfo = {
      address: this.state.address,
      language: 'en',
      interests: this.state.interests.map(i => i.value),
      dob,
    }
    this.props.handleProfile(profileInfo);
  }

  getGoogleAddress() {
    locationAPI.getLocationFromAddress(this.state.address).then(this.setOptions);
  }

  interestsChanges(opt) {
    this.setState({ interests: opt });
  }

  setAddressFromGeoloc(evt) {
    evt.preventDefault();
    navigator.geolocation.getCurrentPosition((pos) => {
      locationAPI.getLocationFromGeoLocation(pos.coords).then((res) => {
        if(Array.isArray(res.data.results) && res.data.results.length > 0) {
          this.setState({address: res.data.results[0].formatted_address});
          this.setOptions(res);
        }
      });
    });
  }

  setOptions(res) {
    let options = [];
    if (Array.isArray(res.data.results) && res.data.results.length > 0) {
      options = res.data.results.map(opt => opt.formatted_address);
    }
    this.setState({addressOpts: options});
  }

  setAddress(address) {
    this.setState({address}, () => {
      this.getGoogleAddress();
    });
  }

  render() {
    return (
      <div>
        <div id="RegisterArea" className="container jumbotron profileContainer">
          <form>
            <img id="loginLogo" src={'http://www.nbcumedialabs.com/static/img/logo-dark-1.png'} alt="logo"></img>
            <div className="form-group" style={{position:'relative'}}>
              <label htmlFor="exampleInputName1">Address<sup style={{color:'red'}}>*</sup></label>
              <Autocomplete
                getItemValue={(item) => item}
                items={this.state.addressOpts}
                wrapperStyle={{ display:'block',position:'relative'}}
                renderItem={(item, isHighlighted) =>
                  <div style={{ paddingLeft:"12px", background: isHighlighted ? 'lightgray' : 'white' }}>
                    {item}
                  </div>
                }
                renderInput={(props) => <input {...props} type="search" className="form-control"/>}
                value={this.state.address}
                onChange={(e) => this.setAddress(e.target.value)}
                onSelect={this.setAddress}
              />
              <button className="btn search-address" onClick={this.setAddressFromGeoloc} style={{padding: 0}}>
                <img height='24px' src='https://upload.wikimedia.org/wikipedia/commons/f/f8/Ic_my_location_48px.svg' />
              </button>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Date of Birth</label>
              <DatePicker
                className='dob-datepicker'
                selected={this.state.dob}
                placeholderText="mm/dd/yyyy"
                onChange={(date) => this.setState({dob: date})}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Interests</label>
              <Select
                value={this.state.interests}
                onChange={this.interestsChanges}
                options={interestsOptions}
                isMulti
                isSearchable
              />
            </div>
            <button type="submit" onClick={this.submit} className="btn btn-primary">Continue</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Profile;