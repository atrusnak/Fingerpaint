/**
 * 
 * 
 * login methods
 * 
 * 
 */
'use strict';

//init
// Fingerpaint.prototype.initsetup = function() {
//   var config = this.getFirebaseConfig();
//   window.location='index.html';
// };


//login
Fingerpaint.prototype.login = function(){

  var that = this;

  var userEmail = document.getElementById("inputEmail").value;
  var userPass = document.getElementById("inputPassword").value;

  // console.log("login: before firebase add");
  // console.log("yes");
  
  
  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

  });

  // if(firebase.auth().currentUser != null){

  //     //todo: send to home page since logged in. 
  //     console.log("Bottom of login");
  //     window.location.href ="home.html"
  // }
  firebase.auth().onAuthStateChanged(function(user) { 
    
  if (user != null) { //then user is not null, don't need to log in. 
  window.location.href ="home.html";
  } 
})

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
    
    firebase.auth().onAuthStateChanged(function(user) { 
    
      if (user != null) { //then user is not null, don't need to log in. 
      window.location.href ="home.html";
      } 
    })
  }
}

Fingerpaint.prototype.edit = function(){
  var that = this;

  firebase.auth().onAuthStateChanged(function(user){

    if (user!=null) {
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
    var old_pass = document.getElementById("old_password_field").value;
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

  })
}

Fingerpaint.prototype.setDisplayName = function () {
  var user = firebase.auth().currentUser;
  var userName = document.getElementById("inputUserName").value;
  user.updateProfile({
    displayName: userName,

  }).then(function(){
    //Update successful.
    location.reload();
  }).catch(function(error){
  });
}
Fingerpaint.prototype.getDisplayName = function () {
  var user = firebase.auth().currentUser;
  return user.displayName;
}

Fingerpaint.prototype.setProfilePic = function () {
  var user = firebase.auth().currentUser;
  var profilePic = document.getElementById("inputProfilePic").value;
  user.updateProfile({
    photoURL: profilePic,
  }).then(function(){
    //Update successful.
    location.reload();
  }).catch(function(error){
   document.getElementById("passworderror").innerHTML = "Wrong password entry.";
  });
}

Fingerpaint.prototype.getProfilePic = function () {
  var user = firebase.auth().currentUser;
  return user.photoURL;
}

Fingerpaint.prototype.setPassword = function(){
  var user= firebase.auth().currentUser;
  var userProvidedPassword = document.getElementById("inputOldPassword").value;
  var newPassword = document.getElementById("inputPassword").value;
  var credential = firebase.auth.EmailAuthProvider.credential(
      user.email, 
      userProvidedPassword
  );

  user.reauthenticateWithCredential(credential).then(function(){
    //user re-authenticated
    user.updatePassword(newPassword).then(function(){
      //success
      location.reload();
    }).catch(function(error){
      //error
    });
  }).catch(function(error){
  //error happened
  });

}
Fingerpaint.prototype.resetPassword = function(){
  var auth = firebase.auth();
  var userEmail = document.getElementById("inputEmail").value;

  auth.sendPasswordResetEmail(userEmail).then(function(){
  location.reload();  
  }).catch(function(error){

  });
  console.log("resetPassword");
}
  
  


//5. logout. we don't need this
Fingerpaint.prototype.logout = function(){
  
    firebase.auth().signOut().then(() => {
      console.log("logout");
      window.location.href="/index.html";
    }).catch((error) => {

    });
    
  
}


