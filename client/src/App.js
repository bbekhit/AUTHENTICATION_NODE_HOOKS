import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser, signout } from "./actions/authActions";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";
import Alert from "./components/Alert/Alert";
import Navbar from "./components/Layout/Navbar";
import ProfileForm from "./components/Profile/ProfileForm";
import Profiles from "./components/Profile/Profiles";
import Profile from "./components/Profile/Profile";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      store.dispatch(loadUser());
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Alert />
          <Switch>
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/add-profile" component={ProfileForm} />
            <Route exact path="/users" component={Profiles} />
            <Route exact path="/user/:userId" component={Profile} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
