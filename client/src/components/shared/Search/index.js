import React, { Component } from 'react';
import { Search, Grid, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from 'axios';

const resultRenderer = ({ name }) => <Label content={name} />;

resultRenderer.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string
};

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: '',
      searchText: '',
      searchResults: [],
      isLoading: false
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    axios.get(`/recipeAPI/${this.props.route}?search=${event.target.value}`).then(res => {
      this.setState({ searchResults: res.data });
      console.log(this.state.searchResults);
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
  };

  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () => this.setState({ isLoading: false, searchResults: [], searchText: '' });

  handleResultSelect = (e, { result }) => this.setState({ searchText: result.name });

  render() {
    return (
      <Grid>
        <Grid.Column width={6}>
          <Search
            loading={this.state.isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleChange}
            results={this.state.searchResults}
            value={this.state.searchText}
            name="searchText"
            resultRenderer={resultRenderer}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

export default SearchBox;
