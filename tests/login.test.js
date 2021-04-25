var firebase = require("firebase/app");

require("firebase/auth");
var firebaseApp = firebase.initializeApp({
apiKey: "AIzaSyBxDI2F_zEe31DlR-dEC9K0rIQAyb4grhY",
authDomain: "fingerpaint-7b504.firebaseapp.com",
projectId: "fingerpaint-7b504",
storageBucket: "fingerpaint-7b504.appspot.com",
messagingSenderId: "490319202305",
appId: "1:490319202305:web:70af544e67c10ac31e9800",
measurementId: "G-3MQRDQBTS8"
});
var Fingerpaint = require ("../public/src/fingerpaint.js");
jest.mock('../public/src/fingerpaint.js');
var login = require("../public/src/login.js");

test('test login', () => {
  expect(Fingerpaint.prototype.login()).toBe(3);
});