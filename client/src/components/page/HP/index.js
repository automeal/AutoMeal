// import Nav from '../../shared/Nav';
import React from 'react';
// import './Landing.css';
import { Grid, Card } from 'semantic-ui-react';
import HomeHead from '../../shared/HomeHead';
import Carousel from '../../shared/Carousel';
import axios from 'axios';
import RecipeCard from '../../shared/RecipeCard';
import InfiniteCarousel from 'react-leaf-carousel';
import RecipeResults from '../../shared/RecipeResults';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // DASHBOARD
      // user data pulled from our DB
      currUser: {},
      // New item being searched and/or added to the respected list
      pantry: '',
      allergies: '',
      dietary_restrictions: '',
      cuisine: '',
      desiredMeal: '',
      includeAdditionalIngredients: '',
      ncludeAdditionalIngredients: '',
      recipeSearchResults: {},
      // For the popup
      open: false
    };
    //this.handleDelete = this.handleMove.bind(this);
  }
  getRecipe = () => {
    axios
      .get(`/recipeAPI/recipes/complexRecipe/?query=?`)
      .then(res => {
        this.setState({ recipeSearchResults: res.data });
      })
      .catch(err => console.log(err));
  };
  render() {
    this.getRecipe();
    return (
      <div>
        <Grid columns="equal" verticalAlign="middle" textAlign="center" divided stretched stackable>
          <Grid.Row>
            <Grid.Column>
              <HomeHead />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <RecipeResults
              header="Recipes to Try"
              itemsPerRow={5}
              recipeSearchResults={this.state.recipeSearchResults}
            />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
export default HomePage;
