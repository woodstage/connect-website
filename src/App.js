import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import SignIn from "./components/SignIn";

const SignUp = () => (
  <div>
    <h2>SignUp</h2>
  </div>
)

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path="/" component={SignIn} />
            <Route path="/signUp" component={SignUp} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
