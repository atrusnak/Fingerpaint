'use strict'; 
class Title extends React.Component {

    render(){
        return(
            <small id="finger" className="text-muted"><h1>FINGERPAINT</h1></small>
        );
    }
}
let titleContainer = document.querySelector('#title_container');
firebase.auth().onAuthStateChanged(function(user){
    if (user){
        ReactDOM.render(<Title />, titleContainer);
    }
  });