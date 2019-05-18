import React, { Component } from 'react';
import { Divider, Form, Header, Modal } from 'semantic-ui-react';

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

  render() {
    // TO DO:
    // - Add actual functionality to submitting a message
    // - So far, just says "Submitted!" on click

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
            <Form.Input fluid label="First name" placeholder="First name" />
            {/*Last name input*/}
            <Form.Input fluid label="Last name" placeholder="Last name" />
            {/*Email input*/}
            <Form.Input fluid label="E-mail Address" placeholder="E-mail Address" />
          </Form.Group>
          {/*Message input*/}
          <Form.TextArea
            label="Message"
            placeholder="Feel free to let us know any questions/comments/suggestions you may have..."
          />
          {/*Submit button*/}
          <Modal trigger={<Form.Button>Submit</Form.Button>}>
            <Modal.Content>
              <Header textAlign="center" as="h2">
                Submitted!
              </Header>
            </Modal.Content>
          </Modal>
        </Form>
        <Divider />
        Photo Credits: <a href="https://www.flickr.com/photos/ellaolsson/">Ella Olsson</a>
        <br />
      </div>
    );
  }
}

export default Contact;
