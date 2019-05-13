import React, { Component } from "react";

class userProfile extends Component {
  componentDidMount() {
    document.title = "Automeal: My Account";
  }

  render() {
    return (
      <div className="userProfile content-container">
        <h1 className="page-title">My Daily Goals</h1>
        <div className="userProfile__account-functions">
          <p>You're logged in as.</p>
        </div>
      </div>
    );
  }
}
export default userProfile;
