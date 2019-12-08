import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getCurrentProfile } from "../../actions/profileActions";
const MyProfile = ({ getCurrentProfile, profile: { currentUserProfile } }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return (
    <div className="container">
      {currentUserProfile && (
        <div className="card m-3 p-3">
          <p>{currentUserProfile.name}</p>
          <p>{currentUserProfile.address}</p>
          <p>{currentUserProfile.phone}</p>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(mapStateToProps, { getCurrentProfile })(MyProfile);
