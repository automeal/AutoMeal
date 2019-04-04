import Nav from "../../shared/Nav";
import React from "react";

import request from "request";

/*import { Redirect } from 'react-router'
//import './Landing.css';
import Select from '../../shared/Form/Select';
import { CheckboxGroup } from '../../shared/Form/Checkbox';
import RadioGroup, { Radio } from '../../shared/Form/Radio';
import Button from '../../shared/Button';
import Tabs, { Tab } from '../../shared/Tabs';
import Nav from '../../shared/Nav';
//api related
import getPlan from '../../../utils/mealPlan';
import { getSurveyData } from '../../../utils/data';
*/

export class MyPantry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: this.props.ingredients,
      recipes: []
    };

    this.getRecipes = this.getRecipes.bind(this);
  }

  getRecipes() {
    let urlIng = this.props.ingredients
      .map((item, key) => {
        item = item.replace(/ /g, "+");
        if (key === 0) {
          return item;
        } else {
          return `%2C${item}`;
        }
      })
      .join("");

    let url =
      "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ranking=1&limitLicense=false&number=10&ingredients=" +
      urlIng;
    let options = {
      url: url,
      headers: {
        "X-Mashape-Key": "vos3qIVKbemshFfm5IbM0uPPvUYKp1i7TgCjsnkQ8sA6uNsjYY",
        Accept: "application/json"
      }
    };

    request.get(options, (err, res, body) => {
      let data = JSON.parse(body);
      data = data.map(item => {
        if (item.missedIngredientCount === 0) {
          return item.title;
        }
      });

      console.log(data);

      this.setState({ recipes: data });
    });
  }
}
const Pantry = props => (
  <div className="Pantry">
    <Nav />
    <div className="Pantry__banner" />
    <div className="Pantry__data">
      <div className="Pantry__data__content">
        <h1>Pantry</h1>
        <ul>
          {this.props.ingredients.map((ingredient, key) => {
            return <li key={key}>{ingredient}</li>;
          })}
        </ul>
        <button
          onClick={this.getRecipes}
          style={{ display: this.props.ingredients.length > 0 ? "" : "none" }}
          className="btn btn-secondary"
        >
          Get Recipes
        </button>
        <h3
          style={{ display: this.props.ingredients.length > 0 ? "" : "none" }}
        >
          Recipes
        </h3>
        <ul
          style={{ display: this.props.ingredients.length > 0 ? "" : "none" }}
        >
          {this.state.recipes.map((item, key) => {
            return <li key={key}>{item}</li>;
          })}
        </ul>
      </div>
    </div>
  </div>
);

export default Pantry;
