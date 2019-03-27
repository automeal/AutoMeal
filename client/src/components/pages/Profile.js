import React from 'react'
import PropTypes from 'prop-types'
import ProfilePhoto from '../../components/ProfilePhoto'
import ProfileForm from '../../components/ProfileForm'

import profilephoto from '../../img/landing_page_image-46.png'

const Profile = (props) => (
  <div>
    <ProfilePhoto image={profilephoto} />
    <ProfileForm values={props.profileFields} />
  </div>
)

Profile.propTypes = {
  photo: PropTypes.string.isRequired,
  profileFields: PropTypes.object.isRequired
}

export default Profile;
