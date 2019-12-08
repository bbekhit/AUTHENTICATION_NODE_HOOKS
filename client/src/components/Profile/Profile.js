import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getProfileById,
  followProfile,
  unFollowProfile
} from "../../actions/profileActions";
import Spinner from "../Spinner/Spinner";

const Profile = ({
  profile: { profile, loading },
  getProfileById,
  match: {
    params: { userId }
  },
  auth: { isAuthenticated, user },
  followProfile,
  unFollowProfile
}) => {
  useEffect(() => {
    getProfileById(userId);
  }, [getProfileById, userId]);

  const follow = (userId, profileId) => {
    followProfile(userId, profileId);
  };

  const unFollow = (userId, profileId) => {
    unFollowProfile(userId, profileId);
  };

  const isFollowing = profile => {
    if (!profile) return false;
    if (profile.following.indexOf(user._id) === -1) return false;
    return true;
  };
  return (
    <div className="container">
      {profile && !loading ? (
        <div className="card m-3 p-3">
          <p>{profile.user.name}</p>
          <p>{profile.user.email}</p>
          <p>{profile.address}</p>
          <p>{profile.phone}</p>
          {isAuthenticated && profile.user._id === user._id ? (
            <button className="btn-danger">Delete</button>
          ) : null}
          <div className="justify-content-between d-flex w-75">
            {profile.following.length > 0 ? (
              <p>{`${profile.following.length} ${
                profile.following.length === 1 ? "person" : "persons"
              } follow ${profile.user.name}`}</p>
            ) : (
              <p style={{ color: "red" }}>No one follow this profile yet</p>
            )}
            <div>
              {user && profile.user._id !== user._id ? (
                <button
                  onClick={() =>
                    isFollowing(profile)
                      ? unFollow(user._id, profile._id)
                      : follow(user._id, profile._id)
                  }
                  className={isFollowing(profile) ? "btn-info" : "btn"}
                >
                  Follow
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};
const mapStateToProps = (state, props) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getProfileById,
  followProfile,
  unFollowProfile
})(Profile);
