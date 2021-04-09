'use strict'; 
class Drawings extends React.Component {

    render(){
        return(
            <table class="table table-striped table-inverse table-responsive">
            <thead class="thead-inverse">
    
                </thead>
    
                <tbody>
                    <tr>
                        <td scope="row"></td>
                        <td><a id="profile" onclick = "Fingerpaint.prototype.goToDraw()"><img src="draw1.jpg" width="150" height="150"/></a></td>
                        <td><a id="profile" onclick = "Fingerpaint.prototype.goToDraw()"><img src="draw2.jpg" width="150" height="150"/></a></td>
                        <td><a id="profile" onclick = "Fingerpaint.prototype.goToDraw()"><img src="draw3.jpg" width="150" height="150"/></a></td>
                        <td><a id="profile" onclick = "Fingerpaint.prototype.goToDraw()"><img src="draw4.jpg" width="150" height="150"/></a></td>
                    </tr>
                    <tr>
                        <td scope="row"></td>
                        <td><a id="profile" onclick = "Fingerpaint.prototype.goToDraw()"><img src="draw4.jpg" width="150" height="150"/></a></td>
                        <td><a id="profile" onclick = "Fingerpaint.prototype.goToDraw()"><img src="draw3.jpg" width="150" height="150"/></a></td>
                        <td><a id="profile" onclick = "Fingerpaint.prototype.goToDraw()"><img src="draw2.jpg" width="150" height="150"/></a></td>
                        <td><a id="profile" onclick = "Fingerpaint.prototype.goToDraw()"><img src="draw1.jpg" width="150" height="150"/></a></td>
                    </tr>
                </tbody>
        </table>
        );
    }
}
let titleContainer = document.querySelector('#drawings_container');
firebase.auth().onAuthStateChanged(function(user){
    if (user){
        ReactDOM.render(<Drawings />, titleContainer);
    }
  });