import React from "react";
import { Link } from "react-router-dom";

import logo from "../../img/logo.png";

function Footer() {
  return (
    <div>
      <footer style={footerStyle}>
        <Link style={linkStyle} to="/about">
          <img src={logo} align="center" width="10%" alt="logo" />
        </Link>
      </footer>
    </div>
  );
}

const footerStyle = {
  background: "#b2c5b3",
  color: "#3c5148",
  textAlign: "center",
  padding: "10px"
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none"
};

export default Footer;
