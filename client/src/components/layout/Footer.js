import React from 'react';
import {Link} from 'react-router-dom';

function Footer() {
    return (
        <div>
          <footer style={footerStyle}>
            <Link style={linkStyle} to="/about">AutoMeal</Link> 2019
          </footer>
        </div>
    );
}

const footerStyle = {
    background: '#b2c5b3',
    color: '#3c5148',
    textAlign: 'center',
    padding: '10px'
}

const linkStyle = {
    color: '#fff',
    textDecoration: 'none'
}

export default Footer;
