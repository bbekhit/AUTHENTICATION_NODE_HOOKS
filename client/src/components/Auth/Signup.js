import React, { useState } from "react";
import { signupUser } from "../../actions/authActions";
import { removeAlert } from "../../actions/alertActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const Signup = ({
  signupUser,
  removeAlert,
  history,
  auth: { isAuthenticated }
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const { name, email, password } = formData;
  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const onSubmit = async e => {
    e.preventDefault();
    let res = await signupUser({ name, email, password });
    if (!res) {
      setFormData({
        name: "",
        email: "",
        password: "",
        open: true
      });
      removeAlert();
      history.push("/");
    }
  };
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div className="container">
      <div className="m-3">
        <h2 className="mt-5 mb-5">Signup</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label className="text-muted">Name</label>
            <input
              onChange={onChange}
              type="text"
              className="form-control"
              value={name || ""}
              name="name"
            />
          </div>
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
  auth: state.auth
});

export default connect(mapStateToProps, { signupUser, removeAlert })(Signup);
