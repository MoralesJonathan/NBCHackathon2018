import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const prodConfig = {
  apiKey: "AIzaSyBpa9mZnX_DdCgZfBt843-1_fp98Gh3WW0",
  authDomain: "nbchackathon2018.firebaseapp.com",
  databaseURL: "https://nbchackathon2018.firebaseio.com",
  projectId: "nbchackathon2018",
  storageBucket: "nbchackathon2018.appspot.com",
  messagingSenderId: "756657388416"
};

const devConfig = {
  apiKey: "AIzaSyBpa9mZnX_DdCgZfBt843-1_fp98Gh3WW0",
  authDomain: "nbchackathon2018.firebaseapp.com",
  databaseURL: "https://nbchackathon2018.firebaseio.com",
  projectId: "nbchackathon2018",
  storageBucket: "nbchackathon2018.appspot.com",
  messagingSenderId: "756657388416"
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
};
