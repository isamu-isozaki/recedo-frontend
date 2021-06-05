/**
 * Based on https://github.com/mmazzarolo/react-native-login-animation-example
 * Edited by Isamu Isozaki
 * Sign up form
 * TODO: Make this a functional component
 */
import React, { Component } from "react";

import CustomButton from "./components/CustomButton";
import CustomTextInput from "./components/CustomTextInput";
import { TextField } from "@material-ui/core";
import KiaraButton from "./components/KiaraButton";
import Link from "@material-ui/core/Link";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
// import metrics from '../../config/metrics';

export default class SignupForm extends Component {
  state = {
    email: "",
    password: "",
    username: "",
  };

  hideForm = async () => {
    if (this.buttonRef && this.formRef && this.linkRef) {
      await Promise.all([
        this.buttonRef.zoomOut(200),
        this.formRef.fadeOut(300),
        this.linkRef.fadeOut(300),
      ]);
    }
  };

  render() {
    const { email, password, username } = this.state;
    const { isLoading, onLoginLinkPress, onSignupPress } = this.props;
    const isValid = email !== "" && password !== "" && username !== "";
    return (
      <div className="">
        <div className="form">
          <TextField
            name={"Username"}
            placeholder={"Username"}
            onChange={(e) => this.setState({ username: e.target.value })}
            label={"Username"}
            variant="outlined"
            style={{ marginBottom: "10%" }}
          />

          <TextField
            name={"Email"}
            placeholder={"Email"}
            onChange={(e) => this.setState({ email: e.target.value })}
            label={"Email"}
            variant="outlined"
            style={{ marginBottom: "10%" }}
          />

          <TextField
            name={"Password"}
            placeholder={"Password"}
            type="password"
            onChange={(e) => this.setState({ password: e.target.value })}
            label={"Password"}
            variant="outlined"
            style={{ marginBottom: "10%" }}
          />

          <KiaraButton
            onPress={() => onSignupPress(email, password, username)}
            isEnabled={isValid}
            isLoading={isLoading}
            text={"Create Account"}
          />
        </div>
        <hr />
        <div className="footer">
          <div></div>
          <div style={{ float: "right", color: "blue" }}>
            <Link href="#" onClick={onLoginLinkPress} color="inherit">
              <VpnKeyIcon fontSize="small" /> {"Sign In Here"}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
