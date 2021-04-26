class ProfilePicture extends React.Component {
    
    render(){
        var photoURL = Fingerpaint.prototype.getProfilePic();
        return(
            
            <a className="anchorButton" id="profile" onClick = {() => Fingerpaint.prototype.goToAccount()}><img src={photoURL} width="50" height="50"/></a>
        );
    }
}
let profilePicContainer = document.querySelector('#navbar_profile_picture_container');
firebase.auth().onAuthStateChanged(function(user){
    if (user){
        ReactDOM.render(<ProfilePicture />, profilePicContainer);
    }
  });
