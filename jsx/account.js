'use strict'; 
class Account extends React.Component {

    render(){
        return(
            <div>
              <button type="button" name="b1" id="changeUserName" class="btn btn-primary" btn-lg btn-block>Change Username</button>
              <button type="button" name="b1" id="changePassword" class="btn btn-primary" btn-lg btn-block>Change Password</button>
              <button type="button" name="b1" id="changePicture" class="btn btn-primary" btn-lg btn-block>Change Profile Picture</button>
              <button type="button" onClick = {() => Fingerpaint.prototype.logout()} name="n1" id="logout" class="btn btn-primary" btn-lg btn-block>Logout</button>
            </div>
        );
    }
}
let accountContainer = document.querySelector('#account_function_container');
firebase.auth().onAuthStateChanged(function(user){
    if (user){
        ReactDOM.render(<Account />, accountContainer);
    }
  });