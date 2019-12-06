import React from "react";
import GoogleLogin from "react-google-login";
import { socialLogin } from "../../actions/authActions";
import { removeAlert } from "../../actions/alertActions";
import { connect } from "react-redux";

const SocialLogin = ({ socialLogin, removeAlert }) => {
  const responseGoogle = response => {
    console.log(response);
    const { googleId, name, email, imageUrl } = response.profileObj;
    const user = {
      password: googleId,
      name: name,
      email: email,
      imageUrl: imageUrl
    };
    socialLogin(user);
    removeAlert();
  };

  return (
    <div>
      <div className="container">
        <GoogleLogin
          clientId="679380407525-2cvoah9gpsjjffc5k1p6atahhf2vqfl4.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
      </div>
    </div>
  );
};

export default connect(null, { socialLogin, removeAlert })(SocialLogin);
