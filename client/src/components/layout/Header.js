import React, { Component } from "react";
import MenuButton from "../../components/MenuButton";
import Menu from "./Menu";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import pantrylogo from "../../img/pantry.png";
//import MenuContainer from './MenuContainer';

class Header extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      visible: false
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  handleMouseDown = e => {
    this.toggleMenu();

    console.log("Clicked!");
    e.stopPropagation();
  };

  toggleMenu() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    const path = this.props.location.pathname.slice(1);
    return (
      <div>
        <header style={buttonStyle}>
          <MenuButton handleMouseDown={this.handleMouseDown} />
        </header>
        <header style={headerStyle}>
          <Menu
            handleMouseDown={this.handleMouseDown}
            menuVisibility={this.state.visible}
          />
          <h1>{path}</h1>
          <img src={pantrylogo} width="20%" />
        </header>
      </div>
    );
  }
}

const headerStyle = {
  background: "#b2c5b3",
  color: "#3c5148",
  textAlign: "center",
  padding: "2px"
};

const buttonStyle = {
  background: "#b2c5b3",
  color: "#3c5148",
  textAlign: "left",
  padding: "2px"
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none"
};

Header.propTypes = {
  handleMouseDown: PropTypes.func.isRequired
};

export default withRouter(Header);
