'use strict'; 
class Drawings extends React.Component {

    render(){
        return(
            <div>
                  
            <table className="table table-striped table-inverse table-responsive">
            <div><h1 id = "DrawMsg">My Drawings</h1></div>
            <thead className="thead-inverse">
                
                </thead>
    
                <tbody>
                    <tr>
                        <td scope="row"></td>
                        <td><a id="profile" onClick = {() => Fingerpaint.prototype.goToDraw()}><img src="draw1.jpg" width="150" height="150"/></a></td>
                        <td><a id="profile" onClick = {() => Fingerpaint.prototype.goToDraw()}><img src="draw2.jpg" width="150" height="150"/></a></td>
                        <td><a id="profile" onClick = {() => Fingerpaint.prototype.goToDraw()}><img src="draw3.jpg" width="150" height="150"/></a></td>
                        <td><a id="profile" onClick = {() => Fingerpaint.prototype.goToDraw()}><img src="draw4.jpg" width="150" height="150"/></a></td>
                    </tr>
                    <tr>
                        <td scope="row"></td>
                        <td><a id="profile" onClick = {() => Fingerpaint.prototype.goToDraw()}><img src="draw4.jpg" width="150" height="150"/></a></td>
                        <td><a id="profile" onClick = {() => Fingerpaint.prototype.goToDraw()}><img src="draw3.jpg" width="150" height="150"/></a></td>
                        <td><a id="profile" onClick = {() => Fingerpaint.prototype.goToDraw()}><img src="draw2.jpg" width="150" height="150"/></a></td>
                        <td><a id="profile" onClick = {() => Fingerpaint.prototype.goToDraw()}><img src="draw1.jpg" width="150" height="150"/></a></td>
                    </tr>
                </tbody>
        </table>
        </div>
        );
    }
}
let titleContainer = document.querySelector('#drawings_container');
firebase.auth().onAuthStateChanged(function(user){
    if (user){
        ReactDOM.render(<Drawings />, titleContainer);
    }
  });