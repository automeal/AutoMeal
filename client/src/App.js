import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Pantry from "./components/pages/Pantry";
import Recipes from "./components/pages/Recipes";
import AddItem from "./components/AddItem";
import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import uuid from "uuid";

import "./App.css";

class App extends Component {
  state = {
    pantry: [
      {
        id: uuid.v4(),
        title: "Eggs",
        available: true
      },
      {
        id: uuid.v4(),
        title: "Milk",
        available: true
      },
      {
        id: uuid.v4(),
        title: "Bacon",
        available: true
      }
    ]
  };

  // Toggle Available
  toggleAvailable = id => {
    this.setState({
      pantry: this.state.pantry.map(item => {
        if (item.id === id) {
          item.available = !item.available;
        }
        return item;
      })
    });
  };

  // Delete Item
  delItem = id => {
    this.setState({
      pantry: [...this.state.pantry.filter(item => item.id !== id)]
    });
  };

  // Add Item
  addItem = title => {
    const newItem = {
      id: uuid.v4(),
      title,
      available: true
    };

    this.setState({ pantry: [...this.state.pantry, newItem] });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            {/* HOME */}
            <Route exact path="/Home" component={Home} />
            {/* PANTRY */}
            <Route
              exact
              path="/Pantry"
              render={props => (
                <React.Fragment>
                  <AddItem addItem={this.addItem} />
                  <Pantry
                    pantry={this.state.pantry}
                    toggleAvailable={this.toggleAvailable}
                    delItem={this.delItem}
                  />
                </React.Fragment>
              )}
            />
            {/* PROFILE */}
            <Route exact path="/Profile" render={props => <Profile />} />
            {/* LOGIN */}
            <Route exact path="/Login" render={props => <Login />} />
            {/* REGISTER */}
            <Route exact path="/Register" render={props => <Register />} />
            <Route exact path="/Recipes" render={props => <Recipes />} />
            {/* <Route exact path="/about" component={About}/> */}
            <Footer />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
