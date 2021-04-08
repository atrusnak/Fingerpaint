'use strict'; 
class Account extends React.Component {

    render(){
        return(
            <div>
              <button type="button" id="changeUserName" className="btn btn-primary" btn-lg="true" btn-block="true">Change Username</button>
              <button type="button" id="changePassword" className="btn btn-primary" btn-lg="true" btn-block="true">Change Password</button>
              <button type="button" id="changePicture" className="btn btn-primary" btn-lg="true" btn-block="true">Change Profile Picture</button>
              <button type="button" onClick = {() => Fingerpaint.prototype.logout()} name="n1" id="logout" className="btn btn-primary" btn-lg="true" btn-block="true">Logout</button>
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