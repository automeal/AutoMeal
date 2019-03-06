import React from 'react';
import pantrylogo from './pantry.png';

function Header() {
    return (
        <header style={headerStyle}>
          <h1>Your Pantry</h1>
          <img src={pantrylogo} width="40%"/>
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
