class DisplayName extends React.Component{
    
    render(){
        var displayName = Fingerpaint.prototype.getDisplayName();
        return( 
        <div>User Name: {displayName}</div>
        );
    }
}
let displayNameContainer = document.querySelector('#display_name_container');
firebase.auth().onAuthStateChanged(function(user){
    if (user){
        ReactDOM.render(<DisplayName />, displayNameContainer);
    }
  });