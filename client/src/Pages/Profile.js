import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';
import locationAPI from '../utils/locationAPI';

const interestsOptions = {

}

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      address: '',
      dob: '',
      language: 'en',
      interests: [],
      addressOpts: [],
    }
    this.setOptions = this.setOptions.bind(this);
    this.getGoogleAddress = this.getGoogleAddress.bind(this);
    this.setAddress = this.setAddress.bind(this);
    this.setAddressFromGeoloc = this.setAddressFromGeoloc.bind(this);
  }

  getGoogleAddress() {
    console.log('getGoogleAddress');
    locationAPI.getLocationFromAddress(this.state.address).then(this.setOptions);
  }

  setAddressFromGeoloc(evt) {
    evt.preventDefault();
    navigator.geolocation.getCurrentPosition((pos) => {
      console.log('coords ', pos.coords);
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
    console.log('setOptions');
    if (Array.isArray(res.data.results) && res.data.results.length > 0) {
      options = res.data.results.map(opt => opt.formatted_address);
    }
    console.log('res: ', options);
    this.setState({addressOpts: options});
  }

  setAddress(address) {
    console.log(address);
    this.setState({address}, () => {
      console.log('after setState address');
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
                <img height='34px' src='https://upload.wikimedia.org/wikipedia/commons/f/f8/Ic_my_location_48px.svg' />
              </button>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email</label>
              <input type="text" className="form-control" name="email" onChange={this.props.handleInputChange()} placeholder="Enter email address" />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" name="password" onChange={this.props.handleInputChange()} placeholder="Password" />
            </div>
            <button type="submit" onClick={this.props.handleProfile()} className="btn btn-primary">Register</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Profile;