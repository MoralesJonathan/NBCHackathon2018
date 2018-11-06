import axios from "axios";

const superSecretKey = 'AIzaSyDbS4SeA7JCmkn_SS9pkkrHC6qJlKF4qzo';
const getFormattedQuery = (address) => {
  return `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${superSecretKey}`
}
const getFormattedGeoLoc = (geoLoc) => {
  return `https://maps.googleapis.com/maps/api/geocode/json?latlng=${geoLoc.latitude},${geoLoc.longitude}&key=${superSecretKey}`
}
export default {
  getLocationFromAddress: function (address) {
    return axios.get(getFormattedQuery(address));
  },
  getLocationFromGeoLocation: function (geoLoc) {
    return axios.get(getFormattedGeoLoc(geoLoc));
  }
};