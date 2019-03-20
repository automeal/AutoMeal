import React, { Component } from 'react';
import './Menu.css';

class Menu extends Component {
    render() {
        var visibility = "hide";

        if (this.props.menuVisibility) {
            visibility = "show";
        }

        return(
            <div id="flyoutMenu"
            onMouseDown={this.props.handleMouseDown}
            className={visibility}>
              <h2><a href="/Home">Home</a></h2>
              <h2><a href="/Pantry">Pantry</a></h2>
              <h2><a href="/Profile">Profile</a></h2>
              <h2><a href="/Recipes">Recipes</a></h2>
            </div>
        );
    }
}

export default Menu;
