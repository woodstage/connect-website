import React, { PureComponent } from "react";
import CognitoHandler from "../utils/CognitoHandler";

class SignIn extends PureComponent {
  signIn() {
    CognitoHandler.signIn(this.username.value, this.password.value)
      .then(result => {
        console.log("access token + " + result.getAccessToken().getJwtToken());
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="SignIn">
        username:{" "}
        <input
          className="username"
          ref={n => {
            this.username = n;
          }}
        />
        <br />
        password:{" "}
        <input
          className="password"
          type="password"
          ref={n => {
            this.password = n;
          }}
        />
        <br />
        <button onClick={this.signIn.bind(this)}>Sign In</button>
      </div>
    );
  }
}

export default SignIn;
