import firebase from "firebase";

const Config = firebase.initializeApp({
  apiKey: "AIzaSyDMEtWkUoh4P6fkJksLA4REbtA6OG72YSc",
  authDomain: "travel-guru-75c63.firebaseapp.com",
  databaseURL: "https://travel-guru-75c63.firebaseio.com",
  projectId: "travel-guru-75c63",
  storageBucket: "travel-guru-75c63.appspot.com",
  messagingSenderId: "463300706864",
  appId: "1:463300706864:web:9c79f9027fbb2c79aa23f5"



  // apiKey: "AIzaSyA5trI428OfKcAGqT-8mZHNliNO9KN8WRo",
  // authDomain: "travel-guru-4399a.firebaseapp.com",
  // databaseURL: "https://travel-guru-4399a.firebaseio.com",
  // projectId: "travel-guru-4399a",
  // storageBucket: "travel-guru-4399a.appspot.com",
  // messagingSenderId: "153215978414",
  // appId: "1:153215978414:web:579d4ed0f3a4a71ee7d63f",
  // measurementId: "G-2HGCKNVNCC",
});

export const auth = firebase.auth();

export default Config;
