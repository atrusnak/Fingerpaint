class DrawNew extends React.Component {

    render(){
        return(
            <a className="anchorButton" id="plus" onClick = {() => Fingerpaint.prototype.goToDraw()}><h1>+</h1></a>
        );
    }
}
let drawcontainer = document.querySelector('#draw_new_container');
firebase.auth().onAuthStateChanged(function(user){
    if (user){
        ReactDOM.render(<DrawNew />, drawcontainer);
    }
  });
