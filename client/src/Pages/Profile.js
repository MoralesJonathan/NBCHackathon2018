import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';
import locationAPI from '../utils/locationAPI';
import DatePicker from "react-datepicker";
import Switch from "react-switch";
import moment from "moment"; 
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      address: '',
      phoneNumber: '',
      dob: null,
      language: 'english',
      interests: [],
      addressOpts: [],
    }
    this.setOptions = this.setOptions.bind(this);
    this.getGoogleAddress = this.getGoogleAddress.bind(this);
    this.setAddress = this.setAddress.bind(this);
    this.setAddressFromGeoloc = this.setAddressFromGeoloc.bind(this);
    this.interestsChanges = this.interestsChanges.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
    this.submit = this.submit.bind(this);
  }

  submit(evt) {
    evt.preventDefault();
    const dob = this.state.dob && this.state.dob.format(this.props.translate('dateFormat'));
    const profileInfo = {
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
      language: this.state.language,
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

  changeLanguage(checked) {
    let newLanguage = checked ? "english" : "spanish";
    this.props.switchLanguage(newLanguage);
    this.setState({language: newLanguage});
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
    const interestsOptions = [
      { value: 'republican', label: this.props.translate('republican') },
      { value: 'democrat', label: this.props.translate('democrat') },
      { value: 'tax', label: this.props.translate('tax') },
      { value: 'welfare', label: this.props.translate('welfare') },
      { value: 'education', label: this.props.translate('education') },
      { value: 'gun', label: this.props.translate('gun') },
      { value: 'social', label: this.props.translate('social') },
      { value: 'retirement', label: this.props.translate('retirement') },
      { value: 'GlobalWarming', label: this.props.translate('GlobalWarming') },
      { value: 'GenderEquality', label: this.props.translate('GenderEquality') },
      { value: 'Culture', label: this.props.translate('Culture') },
    ];
    const translate = this.props.translate;
    const isEnglish = this.state.language === 'english';
    return (
      <div>
        <div id="RegisterArea" className="container jumbotron profileContainer">
          <form>
            <img id="loginLogo" src={'http://www.nbcumedialabs.com/static/img/logo-dark-1.png'} alt="logo"></img>
            <div className="form-group" style={{position:'relative'}}>
              <label>{translate('language')}</label>
              <div style={{display: 'flex'}}>
                <span style={{marginRight: '5px'}} className={isEnglish ? '' : 'selected-language'}>{translate("spanish")}</span>
                <Switch
                  checked={isEnglish}
                  onChange={this.changeLanguage}
                  onColor="#86d3ff"
                  offColor="#86d3ff"
                  onHandleColor="#2693e6"
                  handleDiameter={30}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                  activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                  height={20}
                  width={48}
                  className="react-switch"
                  id="material-switch"
                />
                <span style={{marginLeft: '5px'}} className={isEnglish ? 'selected-language' : 'normal'}>{translate("english")}</span>
              </div>
            </div>
            <div className="form-group">
              <label>{translate('telephone')}</label>
              <input type="tel" className="form-control" name="phone" onChange={evt => this.setState({phoneNumber: evt.target.value})} placeholder={translate('phonePlaceholder')} />
            </div>
            <div className="form-group" style={{position:'relative'}}>
              <label>{translate('address')}<sup style={{color:'red'}}>*</sup></label>
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
              <label>{translate('dob')}</label>
              <DatePicker
                className='dob-datepicker'
                selected={this.state.dob}
                placeholderText={translate('dateDisplayFormat')}
                dateFormat={translate('dateFormat')}
                onChange={(date) => this.setState({dob: date})}
              />
            </div>
            <div className="form-group">
              <label>{translate('interests')}</label>
              <Select
                value={this.state.interests}
                onChange={this.interestsChanges}
                options={interestsOptions}
                isMulti
                isSearchable
              />
            </div>
            <button type="submit" onClick={this.submit} className="btn btn-primary">{translate('continue')}</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Profile;