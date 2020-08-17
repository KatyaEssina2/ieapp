import React, { Component} from "react";
import { Switch, Route, Link } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import axiosInstance from "../axiosApi";

class App extends Component {

    render() {

        return (
            <div className="site">
                <main>
                    <Switch>
                        <Route exact path={"/login/"} component={Login}/>
                        <Route exact path={"/signup/"} component={Signup}/>
                        <Route path={"/"} render={() => <Home/>}/>
                   </Switch>
               </main>
            </div>
        );
    }
}

export default App;