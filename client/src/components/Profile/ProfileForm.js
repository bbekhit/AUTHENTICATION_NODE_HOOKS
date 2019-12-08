import React, { useState } from "react";
import { addProfile } from "../../actions/profileActions";
import { connect } from "react-redux";
import { removeAlert } from "../../actions/alertActions";

const Signin = ({
  addProfile,
  removeAlert,
  history,
  auth: { isAuthenticated }
}) => {
  const [formData, setFormData] = useState({
    address: "",
    phone: ""
  });
  const { address, phone } = formData;
  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const onSubmit = async e => {
    e.preventDefault();
    let data = {
      address,
      phone
    };
    let res = await addProfile(data);
    if (!res) {
      setFormData({
        address: "",
        phone: ""
      });
      history.push("/users");
    }
  };
  return (
    <div className="container">
      <div className="m-3">
        <h2 className="mt-5 mb-5">Add Profile</h2>
        <form onSubmit={onSubmit} noValidate>
          <div className="form-group">
            <label className="text-muted">Address</label>
            <input
              onChange={onChange}
              type="address"
              className="form-control"
              value={address || ""}
              name="address"
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Phone</label>
            <input
              onChange={onChange}
              type="phone"
              className="form-control"
              value={phone || ""}
              name="phone"
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
export default connect(mapStateToProps, { addProfile, removeAlert })(Signin);
