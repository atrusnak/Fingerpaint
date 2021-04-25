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
class UserNameForm extends React.Component{
    render(){
        return(
            <div>
               <label htmlFor ="inputUserName" className="visually-hidden"></label>
               <input type="username" id="inputUserName" className="form-control" placeholder="username"></input>
               <button className="btn btn-primary" btn-lg="true" btn-block="true" onClick={() => Fingerpaint.prototype.setDisplayName()}>Submit</button> 
            </div>
        );
    }
}
class PhotoURL extends React.Component{
    render(){
        return(
            <div>
               <label htmlFor ="inputURL" className="visually-hidden"></label>
               <input id="inputProfilePic" className="form-control" placeholder="Profile Picture URL"></input>
               <button className="btn btn-primary" btn-lg="true" btn-block="true" onClick={() => Fingerpaint.prototype.setProfilePic()}>Submit</button> 
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
            profilePicForm: false,
        }
        this._passwordClick = this._passwordClick.bind(this);
        this._userNameClick = this._userNameClick.bind(this);
        this._photoURLClick = this._photoURLClick.bind(this);
    }   
    _passwordClick(){
        this.setState({
            passwordForm: true,
          });
    }
    _userNameClick(){
        this.setState({
            userNameForm: true,
        });
    }
    _photoURLClick(){
        this.setState({
            profilePicForm: true,
        });
    }
    render(){
        return(
            <div>
              <button type="button" id="changeUserName" className="btn btn-primary" btn-lg="true" btn-block="true" onClick ={this._userNameClick}>Change Username</button>
              {this.state.userNameForm ? ReactDOM.render(<UserNameForm/>, accountContainer) :null}
              <button type="button" id="changePassword" className="btn btn-primary" btn-lg="true" btn-block="true" onClick ={this._passwordClick}>Change Password</button>
              {this.state.passwordForm ? ReactDOM.render(<PasswordForm/>, accountContainer) : null}
              <button type="button" id="changePicture" className="btn btn-primary" btn-lg="true" btn-block="true" onClick = {this._photoURLClick}>Change Profile Picture</button>
              {this.state.profilePicForm ? ReactDOM.render(<PhotoURL/>, accountContainer) :null}
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