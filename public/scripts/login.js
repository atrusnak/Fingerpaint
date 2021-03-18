/**
 * 
 * 
 * login methods
 * 
 * 
 */
'use strict';

//init
Fingerpaint.prototype.initsetup = function() {
  var config = this.getFirebaseConfig();
  document.getElementById("login").style.display = "block"; //should pop up login screen
};


//login
Fingerpaint.prototype.login = function(){

  var that = this;

  var userEmail = document.getElementById("inputEmail").value;
  var userPass = document.getElementById("inputPassword").value;

  //console.log("login: before firebase add");
  
  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

  });

  if(firebase.auth().currentUser != null){

      //todo: send to home page since logged in. 
      console.log("Bottom of login");
      window.location.href ="home.html"
  }

}

//4. create account
Fingerpaint.prototype.create = function(){
  console.log("In create 1");
  var that = this;

  console.log("In create 2");
  
  var userEmail = document.getElementById("inputEmail").value;
  var userPass = document.getElementById("inputPassword").value;

  if(userEmail && userPass){ //if checks if empty
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("Error : " + errorMessage);
    });
    
    if(firebase.auth().currentUser != null){

      //now send to home screen of logged in user. 
      
    }
  }
}

Fingerpaint.prototype.edit = function(){
  var that = this;

  if(firebase.auth().currentUser != null){
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
    var address = document.getElementById("address_field").value;
    var phone = document.getElementById("phone_field").value;
    var old_pass = document.getElementById("old_password_field").value;

    if(address){
     const uid = firebase.auth().currentUser.uid;
      const userData = {user_address: address};     
      firebase.firestore().doc('/users/'+uid).set(userData, {merge: true});
    }

    if(phone){
      const uid = firebase.auth().currentUser.uid;
      const userData = {user_phone: phone};        
      firebase.firestore().doc('/users/'+uid).set(userData, {merge: true});
    }

    //Now need ability to change username and password.
    console.log("Before change password and email");
    console.log(firebase.auth().currentUser.password);
    firebase.auth()
    .signInWithEmailAndPassword(firebase.auth().currentUser.email, old_pass)
    .then(function(userCredential) {
        userCredential.user.updateEmail(userEmail);
        userCredential.user.updatePassword(userPass);
    })


  }
  
}

//5. logout. we don't need this
Fingerpaint.prototype.logout = function(){
  if(firebase.auth().currentUser != null){
    firebase.auth().signOut();
  }
}


