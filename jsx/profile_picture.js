class ProfilePicture extends React.Component {
    
    render(){

        return(
            <a className="anchorButton" id="profile" onClick = {() => Fingerpaint.prototype.goToAccount()}><img src="groot.png" width="40" height="50"/></a>
        );
    }
}
let profilePicContainer = document.querySelector('#profile_picture_container');
firebase.auth().onAuthStateChanged(function(user){
    if (user){
        ReactDOM.render(<ProfilePicture />, profilePicContainer);
    }
  });
