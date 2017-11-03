import React, { PureComponent } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Home extends PureComponent {
  render() {
    return (
      <div className="Home">
        <Link to="/signUp">Sign Up</Link>
        <br/>
        <Link to="/signIn">Sign In</Link>
      </div>
    );
  }
}

export default Home;
