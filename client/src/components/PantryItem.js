import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PantryItem extends Component {
    getStyle = () => {
        return {
            background: '#f4f4f4',
            padding: '10px',
            borderBottom: '1px #ccc dotted',
            textDecoration: this.props.item.available ? 'none' : 'line-through'
        }
    }

    //<input type="checkbox" onChange={this.props.toggleAvailable.bind(this, id)} /> { ' ' }

    render() {
        const { id, title } = this.props.item;

        return(
            <div style={this.getStyle()}>

              { title }
              <button onClick={this.props.delItem.bind(this, id)} style={btnStyle}>x</button>
            </div>
        )

        /*
        return (
              <p>
              <input type="checkbox" onChange={this.props.markAvailable.bind
              (this, id)} /> {' '}
              {title}
              <button onClick={this.props.delItem.bind(this, id)} style={btnStyle}>x</button>
              </p>
            </div>
        )
        */
    }
}

// Proptypes
PantryItem.propTypes = {
    item: PropTypes.object.isRequired,
    toggleAvailable: PropTypes.func.isRequired,
    delItem: PropTypes.func.isRequired
}

const btnStyle = {
    background: '#9e6969',
    color: '#fff',
    border: 'none',
    padding: '5px 9px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right'
}


export default PantryItem;
