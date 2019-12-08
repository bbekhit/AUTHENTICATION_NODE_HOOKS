import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getProfiles } from "../../actions/profileActions";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

const Profiles = ({ profile: { profiles, loading }, getProfiles }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  return (
    <div className="container">
      {profiles.length > 0 && profiles !== null && !loading ? (
        profiles.map((profile, i) => (
          <div key={i} className="card m-3 p-3">
            <p>{profile.user.name}</p>
            <p>{profile.user.email}</p>
            <p>{profile.user._id}</p>
            <p>{profile.address}</p>
            <p>{profile.phone}</p>
            <button className="btn btn-success">
              <Link to={`/user/${profile.user._id}`}>view</Link>
            </button>
          </div>
        ))
      ) : (
        <Spinner />
      )}
    </div>
  );
};
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(mapStateToProps, { getProfiles })(Profiles);
