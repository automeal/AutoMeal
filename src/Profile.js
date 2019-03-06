import React from 'react'
import PropTypes from 'prop-types'
import ProfilePhoto from './ProfilePhoto'
import ProfileForm from './ProfileForm'

const Profile = (props) => (
  <div>
    <ProfilePhoto image={props.photo} />
    <ProfileForm values={props.profileFields} />
    <footer />
  </div>
)

Profile.propTypes = {
  photo: PropTypes.string.isRequired,
  profileFields: PropTypes.object.isRequired
}

export default Profile
