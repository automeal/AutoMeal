import React, { Component } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Pantry from './components/pages/Pantry';
import AddItem from './components/AddItem';
import uuid from 'uuid';

import './App.css';

class App extends Component {
  state = {
      pantry: [
          {
              id: uuid.v4(),
              title: 'Eggs',
              available: true
          },
          {
              id: uuid.v4(),
              title: 'Milk',
              available: true
          },
          {
              id: uuid.v4(),
              title: 'Bacon',
              available: true
          }
      ]
  }

  // Toggle Available
  toggleAvailable = (id) => {
      this.setState({ pantry: this.state.pantry.map( item => {
          if(item.id === id) {
              item.available = !item.available
          }
          return item;
      }) })
  }

  // Delete Item
  delItem = (id) => {
      this.setState({ pantry: [...this.state.pantry.filter
      (item => item.id !== id)] });
  }

  // Add Item
  addItem = (title) => {
      const newItem = {
          id: uuid.v4(),
          title,
          available: true
      }

      this.setState({ pantry: [...this.state.pantry, newItem]})
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <Header />
          <AddItem addItem={this.addItem}/>
          <Pantry pantry={this.state.pantry} toggleAvailable=
          {this.toggleAvailable} delItem={this.delItem} />
          <Footer />
        </div>

      </div>
    );
  }
}

export default App;
