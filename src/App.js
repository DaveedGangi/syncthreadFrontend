import {Component} from "react";

import {Switch,Route,Redirect} from "react-router-dom";

import Login from "./components/login";
import Dashboard from "./components/dashboard";
import Map from "./components/map";

import NotFound from "./components/notfound";
class App extends Component {


  render(){
    return(
    <div>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/map/current" component={Map} />
        <Route exact path="/map/:lat/:lon" component={Map} />
        <Route  path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </div>
    )
  }
}

export default App;