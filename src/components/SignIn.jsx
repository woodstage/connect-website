import React, { PureComponent } from "react";
import CognitoHandler from "../utils/CognitoHandler";
import io from "socket.io-client";
import SignalingServerClient from "signaling-server-client";

class SignIn extends PureComponent {
  signIn() {
    CognitoHandler.signIn(this.username.value, this.password.value)
      .then(result => {
        console.log("access token + " + result.getAccessToken().getJwtToken());
        const client = new SignalingServerClient();
        client
          .connect(
            "wss://ec2-52-199-211-229.ap-northeast-1.compute.amazonaws.com:8080?token=" +
              result.getAccessToken().getJwtToken()
          )
          .then(result => {
            // client.connect("wss://localhost:8080?token=" + result.getAccessToken().getJwtToken()).then(result => {
            console.log(result);
          });
        client.on("users", data => {
          console.log("users:", data);
        });

        client.on("user_online", data => {
          console.log("user online:", data);
        });

        client.on("user_offline", data => {
          console.log("user offline:", data);
        });

        client.on("message", message => {
          console.log("message receiced: ", message);
          return { reply: "hello" };
        });
        window.client = client;
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
