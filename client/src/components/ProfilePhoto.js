import React from "react";
import PropTypes from "prop-types";

const ProfilePhoto = props => (
  <div className="profile-photo">
    <img src={props.image} alt="profile" />
  </div>
);

ProfilePhoto.propTypes = {
  image: PropTypes.string
};

export default ProfilePhoto;
