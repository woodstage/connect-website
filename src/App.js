import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ConfirmRegistration from "./components/ConfirmRegistration";
import CognitoHandler from "./utils/CognitoHandler";

CognitoHandler.setup("ap-northeast-1_6a7cKUfQR", "52e6ek4kh6d2gbtukv5kem2kg3");
window.CognitoHandler = CognitoHandler;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/signIn" component={SignIn} />
            <Route path="/signUp" component={SignUp} />
            <Route
              path="/confirmRegistration"
              component={ConfirmRegistration}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
