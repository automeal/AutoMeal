import React from "react";
import SearchBar from "../../shared/SearchBar/";
import { Grid } from "semantic-ui-react";
//import './Landing.css';

const HomePage = props => (
  <div className="Login">
    <div className="Login__banner" />
    <div className="Login__data">
      <div className="Login__data__content">
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <h1>Welcome to AutoMeal</h1>
        </Grid>
        <SearchBar />
        <ul>
          <li>Recipes You've Liked</li>
          <li>Recipes to Try</li>
          <li>Recently Searched Items</li>
          <li>Other Home Page Stuff</li>
        </ul>
      </div>
    </div>
  </div>
);
export default HomePage;
