import React, { Component } from 'react';
import { Search, Grid, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import axios from 'axios';

const resultRenderer = ({ name, title }) => <Label content={name || title} />;

resultRenderer.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  id: PropTypes.number
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

  handleChanger = event => {
    this.setState({
      [event.target.value]: event.target.value
    });
    this.props.onChange(event);
    // axios.get(`/recipeAPI/${this.props.route}?search=${event.target.value}`).then(res => {
    //   this.setState({ searchResults: res.data });
    //   console.log(this.state.searchResults);
    // });
  };

  handleSubmit = async event => {
    event.preventDefault();
  };

  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () => this.setState({ isLoading: false, searchResults: [], searchText: '' });

  handleResultSelect = (prop, e, result) => {
    this.setState({ searchText: result.name });
    this.props.handleResult(prop, result);
  };

  render() {
    return (
      <Grid>
        <Grid.Column width={6}>
          <Search
            loading={this.state.isLoading}
            onResultSelect={(e, { result }) => this.handleResultSelect(this.props.name, e, result)}
            onSearchChange={this.handleChanger}
            results={this.state.searchResults}
            placeholder={this.props.placeholder}
            value={this.props.value}
            name={this.props.name}
            resultRenderer={resultRenderer}
            onSubmit={this.props.onSubmit}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

export default SearchBox;
