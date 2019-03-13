import React from 'react';
import logo from './logo.jpg';

function Header() {
    return (
        <header style={headerStyle}>
          <h1>Login Page</h1>
          <img src={logo} width="40%"/>
        </header>

    );
}

const headerStyle = {
    background: '#dbdbdb',
    color: '#9e6969',
    textAlign: 'center',
    padding: '10px'
}

const linkStyle = {
    color: '#fff',
    textDecoration: 'none'
}

export default Header;
