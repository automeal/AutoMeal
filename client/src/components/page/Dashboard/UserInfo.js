import React from 'react';
import { Segment, Header } from 'semantic-ui-react';

const UserInfo = props => {
  console.log(`currUser::::::`);
  console.log(Object.keys(props.currUser));
  var planTypeAlpha = '';

  if (props.currUser.planType === 7) {
    planTypeAlpha = 'Weekly';
  } else {
    planTypeAlpha = 'Daily';
  }

  return (
    <div>
      {/* OTHER INFO */}
      <Segment attached="top" textAlign="center" color="green">
        <Header as="h1">User Information</Header>
      </Segment>
      <Segment attached="bottom">
        <p>
          <Header as="h5">Name: </Header> {props.currUser.full_name}
          <Header as="h5">Email: </Header> {props.currUser.email}
          <Header as="h5">Meals a Day: </Header> {props.currUser.mealCount}
          <Header as="h5">Plan Type: </Header> {planTypeAlpha}
          {/* <Header as="h5">Plan Size: </Header> */}
          <Header as="h5">Dietary Preferences: </Header>{' '}
          {!props.currUser.calories || !props.currUser.calories ? (
            ''
          ) : (
            <div>
              <div style={{ color: 'green' }}>
                <b>Calories:</b>
              </div>
              <div>min: {props.currUser.calories.min}</div>
              <div>max: {props.currUser.calories.max}</div>
            </div>
          )}
          {/* <Header as="h5">Daily Calorie Intake: </Header> */}
        </p>
      </Segment>
    </div>
  );
};

export default UserInfo;
