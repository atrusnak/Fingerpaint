'use strict'; 
class PasswordForm extends React.Component{
render(){
    return(
   <div>
        <label htmlFor ="inputOldPassword" className="visually-hidden"></label>
        <input type="password" id="inputOldPassword" className="form-control" placeholder="old password"></input>
        <label htmlFor ="inputPassword" className="visually-hidden"></label>
        <input type="password" id="inputPassword" className="form-control" placeholder="new password"></input>
        <button className="btn btn-primary" btn-lg="true" btn-block="true" onClick={() => Fingerpaint.prototype.setPassword()}>Submit</button>
        <div id="passworderror"></div>
   </div> 
    );
}
}
class Account extends React.Component {
    constructor(props){
        super(props);
        this.state={
            passwordForm: false,
            userNameForm: false,
            profilePicFrom: false,
        }
        this._passwordClick = this._passwordClick.bind(this);
    }   
    _passwordClick(){
        this.setState({
            passwordForm: true,
          });
    }
    render(){
        return(
            <div>
              <button type="button" id="changeUserName" className="btn btn-primary" btn-lg="true" btn-block="true">Change Username</button>
              <button type="button" id="changePassword" className="btn btn-primary" btn-lg="true" btn-block="true" onClick ={this._passwordClick}>Change Password</button>
              {this.state.passwordForm ? <PasswordForm /> : null}
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