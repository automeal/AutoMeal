import React from 'react';
import './Landing.css';
import Button from '../../shared/Button';
import SearchBox from '../../shared/Search';

const Landing = props => (
  <div className="Landing">
    <div className="Landing__banner" />
    <div className="Landing__data">
      <div className="Landing__data__content">
        <h1>AutoMeal Custom Meal Plan Generator</h1>
        <ul>
          <li>Build a Customizable Meal Plan Based On Your Preferences</li>
          <li>Track Calorie Intake and Nutrition Information</li>
          <li>Explore and Search New Recipes</li>
          <li>Organize Your Meals Around Your Pantry Items</li>
        </ul>
        <div>
          <Button type="accent" link={true} path="/register" className="Landing__data__button">
            Register
          </Button>
        </div>
        <div>
          <Button type="accent" link={true} path="/login" className="Landing_data_button">
            Login
          </Button>
        </div>
        <SearchBox route="ingredients" />
      </div>
    </div>
  </div>
);

export default Landing;
