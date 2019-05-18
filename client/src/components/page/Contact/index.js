import React, { Component } from 'react';
import { Divider, Form, Header } from 'semantic-ui-react';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      message: ''
    };
  }

  handleChange = (e, { value }) => this.setState({ value });

  render() {
    // TO DO:
    // - Add actual functionality to submitting a message

    return (
      <div>
        <br />
        <Header as="h1" textAlign="center">
          Contact Us
        </Header>
        <Divider />
        {/*Form for submitting message*/}
        <Form>
          <Form.Group widths="equal">
            {/*First name input*/}
            <Form.Input
              fluid
              label="First name"
              placeholder="First name"
              value={this.state.firstName}
            />
            {/*Last name input*/}
            <Form.Input
              fluid
              label="Last name"
              placeholder="Last name"
              value={this.state.lastName}
            />
            {/*Email input*/}
            <Form.Input
              fluid
              label="E-mail Address"
              placeholder="E-mail Address"
              value={this.state.email}
            />
          </Form.Group>
          {/*Message input*/}
          <Form.TextArea
            label="Message"
            placeholder="Feel free to let us know any questions/comments/suggestions you may have..."
            value={this.state.message}
          />
          {/*Submit button*/}
          <Form.Button>Submit</Form.Button>
        </Form>
        <br />
      </div>
    );
  }
}

export default Contact;
