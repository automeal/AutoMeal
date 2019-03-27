import React, { Component } from "react";
import MenuButton from '../../components/MenuButton';

class MenuContainer extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            visible: false
        };

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    handleMouseDown = (e) => {
        this.toggleMenu();

        console.log("Clicked!");
        e.stopPropagation();
    }

    toggleMenu() {
        this.setState({
            visible: !this.state.visible
        });
    }

    render() {
        return(
            <div>
              <MenuButton handleMouseDown={this.handleMouseDown} />
              <div>
                <p>Can you spot the item that doesn't belong?</p>
                <ul>
                  <li>Banana</li>
                  <li>Grape</li>
                  <li>Tangerine</li>
                  <li>Tomato</li>
                  <li>Avocado</li>
                  <li>Spinach</li>
                </ul>
              </div>
            </div>
        );
    }
}

export default MenuContainer;
