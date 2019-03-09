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
              <h2><a href="/home">Home</a></h2>
              <h2><a href="/pantry">Pantry</a></h2>
              <h2><a href="/profile">Profile</a></h2>
              <h2><a href="/recipes">Recipes</a></h2>
            </div>
        );
    }
}

export default Menu;
