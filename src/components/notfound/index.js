import {Component} from "react";
import {Link} from "react-router-dom";

import Cookies from "js-cookie";

import "./index.css";
class NotFound extends Component {

    render(){
         const jwtToken=Cookies.get("jwtTokenSyncthread");
            if(jwtToken){
                this.props.history.replace("/dashboard");
            }
        return(

            <div className="not-found-page">
                User not logged in

                <Link to="/login">Go to Login page</Link>
            </div>
              
           
        )
    }
}

export default NotFound;