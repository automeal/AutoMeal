import React from 'react'
import Profile from './Profile'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      photo: require('./landing_page_image-46.png'),
      profileFields: {
        Email: 'lian576267257@gmail.com',
        DietRestrictions: 'none',
        SavedItems:'none',
        LikedRecipes:'none'
      }
    }
  }

  render () {
    return (
      <div>
        <Profile profileFields={this.state.profileFields} photo={this.state.photo} />
      </div>
    )
  }
}
