import React, { Component } from "react";
import PropTypes from "prop-types";

class AddItem extends Component {
  state = {
    title: ""
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.addItem(this.state.title);
    this.setState({ title: "" });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <form onSubmit={this.onSubmit} style={{ display: "flex" }}>
        <input
          type="text"
          name="title"
          style={{ flex: "10", padding: "5px" }}
          placeholder="Add Pantry Item ..."
          value={this.state.title}
          onChange={this.onChange}
        />
        <input
          type="submit"
          value="Enter"
          className="enterBtn"
          style={{ flex: "1" }}
        />
      </form>
    );
  }
}

// Proptypes
AddItem.propTypes = {
  addItem: PropTypes.func.isRequired
};

export default AddItem;
