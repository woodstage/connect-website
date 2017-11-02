import React, { PureComponent } from "react";

class SignIn extends PureComponent {
  signIn() {

  }

  render() {
    return (
      <div className="SignIn">
        Email: <input className="email" ref={n => (this.email = n.value)} />
        <br />
        Password:{" "}
        <input className="password" ref={n => (this.password = n.value)} />
        <br />
        <button onClick={this.signIn.bind(this)}>Sign In</button>
      </div>
    );
  }
}

export default SignIn;
