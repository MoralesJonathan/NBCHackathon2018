import axios from "axios";
const getFormattedQuery = (address) => {
  return `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDbS4SeA7JCmkn_SS9pkkrHC6qJlKF4qzo`
}
const getFormattedGeoLoc = (geoLoc) => {
  return `https://maps.googleapis.com/maps/api/geocode/json?latlng=${geoLoc.latitude},${geoLoc.longitude}&key=AIzaSyDbS4SeA7JCmkn_SS9pkkrHC6qJlKF4qzo`
}
export default {
  getLocationFromAddress: function (address) {
    return axios.get(getFormattedQuery(address));
  },
  getLocationFromGeoLocation: function (geoLoc) {
    return axios.get(getFormattedGeoLoc(geoLoc));
  }
};