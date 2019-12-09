import React, { useState, useEffect } from "react";
import { signinUser } from "../../actions/authActions";
import { connect } from "react-redux";
import { removeAlert } from "../../actions/alertActions";
import SocialLogin from "./SocialLogin";
import { Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alertActions";

const Signin = ({
  signinUser,
  setAlert,
  removeAlert,
  history,
  auth: { isAuthenticated, loading },
  error
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { email, password } = formData;

  useEffect(() => {
    if (error) {
      setAlert(error, "danger");
    }
    return () => {
      removeAlert();
    };
  }, [error]);

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const onSubmit = async e => {
    e.preventDefault();
    let res = await signinUser(email, password);
    if (!res) {
      setFormData({
        name: "",
        email: ""
      });
      history.push("/");
    }
  };
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div className="container">
      <div className="m-3">
        <h2 className="mt-5 mb-5">Sign In</h2>
        <hr />
        <SocialLogin />
        <hr />
        <form onSubmit={onSubmit} noValidate>
          <div className="form-group">
            <label className="text-muted">Email</label>
            <input
              onChange={onChange}
              type="email"
              className="form-control"
              value={email || ""}
              name="email"
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Password</label>
            <input
              onChange={onChange}
              type="password"
              className="form-control"
              value={password || ""}
              name="password"
            />
          </div>
          <button type="submit" className="btn btn-raised btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});
export default connect(mapStateToProps, { signinUser, removeAlert, setAlert })(
  Signin
);
