import React, { PureComponent } from "react";
import { Redirect } from "react-router-dom";
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser
} from "amazon-cognito-identity-js";
import CognitoHandler from "../utils/CognitoHandler";

class SignUp extends PureComponent {
  constructor(props) {
    super(props);
  }

  state = {
    navToConfirmRegistration: false
  };

  signUp() {
    const attributeList = [];
    attributeList.push({
      Name: "email",
      Value: this.email.value
    });
    CognitoHandler.signUp(
      this.username.value,
      this.password.value,
      attributeList,
      null
    )
      .then(result => {
        const cognitoUser = result.user;
        console.log("user name is " + cognitoUser.getUsername());
        this.setState({ navToConfirmRegistration: true });
      })
      .catch(err => console.error(err));
  }

  render() {
    return this.state.navToConfirmRegistration ? (
      <Redirect to="/confirmRegistration" />
    ) : (
      <div className="SignUp">
        username:{" "}
        <input
          ref={n => {
            this.username = n;
          }}
        />
        <br />
        password:{" "}
        <input
          type="password"
          ref={n => {
            this.password = n;
          }}
        />
        <br />
        email:{" "}
        <input
          ref={n => {
            this.email = n;
          }}
        />
        <br />
        <button onClick={this.signUp.bind(this)}>Sign Up</button>
      </div>
    );
  }
}

export default SignUp;
