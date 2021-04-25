class ProfilePic extends React.Component{
    
    render(){
        var photoURL = Fingerpaint.prototype.getProfilePic();
        return (
        < img src={photoURL} id="proPic" width="100" height="100" class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}" alt="profile image"/>
        );
    }
}
let ProfilePictureContainer = document.querySelector('#profile_picture_container');
firebase.auth().onAuthStateChanged(function(user){
    if (user){
        ReactDOM.render(<ProfilePic />, ProfilePictureContainer);
    }
  });