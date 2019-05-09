import React, { Component } from 'react';
import { Button, Card, Header, Image, Modal } from 'semantic-ui-react';

import recipe from './recipe.jpg';

class RecipeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  render() {
    const { open, dimmer } = this.state;

    return (
      <Card width="33 %">
        <Image src={this.props.item.image} />
        <Card.Content>
          <Card.Header>{this.props.item.title}</Card.Header>
          <Card.Meta>{'Ingredients: ' + this.props.item.extendedIngredients}</Card.Meta>
          <Card.Description>
            {'Time to Make: ' + this.props.item.readyInMinutes + ' minutes'}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button onClick={this.show('blurring')}>Read More</Button>
          <Modal dimmer={dimmer} open={open} onClose={this.close} centered={true}>
            <Modal.Content scrolling>
              <Image wrapped src={this.props.item.image} size="big" rounded bordered />
              <Modal.Description>
                <Header as="h1">{this.props.item.title}</Header>
                <p>
                  <Header as="h3">Ingredients: </Header> {this.props.item.extendedIngredients}
                </p>
                <p>
                  <Header as="h3">Time to Make: </Header> {this.props.item.readyInMinutes} minutes
                </p>
                <p>
                  <Header as="h3">Instructions: </Header> {this.props.item.instructions}
                </p>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        </Card.Content>
      </Card>
    );
  }
}

export default RecipeCard;
