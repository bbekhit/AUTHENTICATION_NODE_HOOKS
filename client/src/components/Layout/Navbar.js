import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout } from "../../actions/authActions";
import { connect } from "react-redux";

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "#ff9900" };
  else return { color: "#ffffff" };
};

const Navbar = ({
  history,
  auth: { isAuthenticated, user },
  signout,
  profile: { currentUserProfile }
}) => (
  <div>
    <ul className="nav nav-tabs bg-primary">
      <li className="nav-item">
        <Link className="nav-link" style={isActive(history, "/")} to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/users"
          style={isActive(history, "/users")}
          className="nav-link"
        >
          Users
        </Link>
      </li>

      {!isAuthenticated && (
        <Fragment>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/signin")}
              to="/signin"
            >
              Sign In
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/signup")}
              to="/signup"
            >
              Sign Up
            </Link>
          </li>
        </Fragment>
      )}

      {user && isAuthenticated && (
        <Fragment>
          <li className="nav-item">
            <Link
              to={`/user/${user._id}`}
              style={isActive(history, `/user/${user._id}`)}
              className="nav-link"
            >
              {`${user.name}'s profile`}
            </Link>
          </li>
          <li className="nav-item">
            <span
              className="nav-link"
              style={{ cursor: "pointer", color: "#fff" }}
              onClick={() => signout(history)}
            >
              Sign Out
            </span>
          </li>
        </Fragment>
      )}
    </ul>
  </div>
);

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});
export default connect(mapStateToProps, { signout })(withRouter(Navbar));
