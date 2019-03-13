import React from 'react'
import PropTypes from 'prop-types'
import ProfilePhoto from './ProfilePhoto'
import ProfileForm from './ProfileForm'
import Profilephoto from './landing_page_image-46.png'

const Profile = (props) => (
  <div>
    <ProfilePhoto image={Profilephoto} />
    <ProfileForm values={props.profileFields} />
  </div>
)

Profile.propTypes = {
  photo: PropTypes.string.isRequired,
  profileFields: PropTypes.object.isRequired
}

export default Profile
