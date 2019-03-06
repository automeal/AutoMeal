import React from 'react';
import {Link} from 'react-router-dom';

function Footer() {
    return (
        <footer style={footerStyle}>
          <Link style={linkStyle} to="/">Home</Link> | <Link style={linkStyle}
          to="/pantry">Pantry</Link> | <Link style={linkStyle}
          to="/profile">Profile</Link> | <Link style={linkStyle}
          to="/recipes">Recipes</Link> | <Link style={linkStyle}
          to="/userSettings">User Settings</Link>
        </footer>
    );
}

const footerStyle = {
    background: '#dbdbdb',
    color: '#9e6969',
    textAlign: 'center',
    padding: '10px'
}

const linkStyle = {
    color: '#fff',
    textDecoration: 'none'
}

export default Footer;
