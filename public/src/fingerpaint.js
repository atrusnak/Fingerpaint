/**
 * 
 * 
 * fingerpaint, the best fucking app eber. 
 * 
 * 
 */
'use strict';


/**
 * Initializes the Fingerpaint app.
 */
function Fingerpaint() {

    var that = this;
    
    firebase.auth().onAuthStateChanged(function(user) { //assuming 'anonymous' is not allowed.
    
    if (user != null) { //then user is not null, don't need to log in. 
      //display homescreen of logged in user. 
    } 
    else { //user is null, has to login or continue as guest. 

      //that.initsetup();  //displays login page.
      
    }
  })
}

window.onload = function() {
  window.app = new Fingerpaint();
};