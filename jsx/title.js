'use strict'; 
class Title extends React.Component {

    render(){
        const mysytle= {
            padding: '300',
            cursor: 'pointer',
            marginWidth: '300',
        };
        return(
            <small id="finger" style={mysytle} className="text-muted" onClick = {() => Fingerpaint.prototype.goToHome()}><h1>FINGERPAINT</h1></small>
        );
    }
}
let titleContainer = document.querySelector('#title_container');
firebase.auth().onAuthStateChanged(function(user){
    if (user){
        ReactDOM.render(<Title />, titleContainer);
    }
  });