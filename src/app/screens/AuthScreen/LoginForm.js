/**
 * Based on https://github.com/mmazzarolo/react-native-login-animation-example
 * Edited by Isamu Isozaki
 * Login form
 * TODO: Make this a functional component
 */
import React, { Component } from "react";

import CustomButton from "./components/CustomButton";
import CustomTextInput from "./components/CustomTextInput";
import { TextField } from "@material-ui/core";
import KiaraButton from "./components/KiaraButton";
import Link from "@material-ui/core/Link";

//import metrics from '../../config/metrics';

export default class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    username: "",
  };

  render() {
    const { email, password } = this.state;
    const { isLoading, onSignupLinkPress, onLoginPress } = this.props;
    const isValid = email !== "" && password !== "";
    return (
      <div>
        <div>
          <TextField
            name={"email"}
            placeholder={"Email"}
            onChange={(e) => this.setState({ email: e.target.value })}
            label={"Email"}
            variant="outlined"
            style={{ marginBottom: "10%" }}
          />

          <TextField
            name={"password"}
            placeholder={"Password"}
            type="password"
            onChange={(e) => this.setState({ password: e.target.value })}
            label={"Password"}
            variant="outlined"
          />
        </div>
        <KiaraButton
          onPress={() => {
            onLoginPress(email, password);
          }}
          isEnabled={isValid}
          isLoading={isLoading}
          text={"Log In"}
          style={{ marginTop: "10%" }}
        />
        <hr />
        <div className="footer">
          <div></div>
          <a href="{onSignupLinkPress}"></a>
          <div style={{ float: "right", color: "blue" }}>
            <Link href="#" onClick={onSignupLinkPress} color="inherit">
              {"Register Here"}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
