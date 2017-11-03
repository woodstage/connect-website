import React, { PureComponent } from "react";
import { Redirect } from "react-router-dom";
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser
} from "amazon-cognito-identity-js";
import CognitoHandler from "../utils/CognitoHandler";

class ConfirmRegistration extends PureComponent {
  state = {
    navToSignIn: false
  };

  verify() {
    CognitoHandler.confirmRegistration(
      this.username.value,
      this.verificationCode.value
    )
      .then(result => {
        this.setState({ navToSignIn: true });
      })
      .catch(err => console.error(err));
  }

  render() {
    return this.state.navToSignIn ? (
      <Redirect to="/signIn" />
    ) : (
      <div className="ConfirmRegistration">
        username:{" "}
        <input
          ref={n => {
            this.username = n;
          }}
        />
        <br />
        verification code:{" "}
        <input
          ref={n => {
            this.verificationCode = n;
          }}
        />
        <button onClick={this.verify.bind(this)}>Verify</button>
      </div>
    );
  }
}

export default ConfirmRegistration;
