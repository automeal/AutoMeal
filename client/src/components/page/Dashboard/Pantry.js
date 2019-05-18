import React from 'react';
import PantryItem from './PantryItem';
import { Segment, List, Header } from 'semantic-ui-react';
import SearchBox from '../../shared/Search';

const Pantry = props => {
  // Mapping pantry items to format into components
  const pantryItems =
    !props.currUser.pantry || !props.currUser.pantry.length
      ? ['Pantry is empty']
      : props.currUser.pantry.map(item => (
          <PantryItem db_field_name="pantry" item={item} onIconClick={props.handleItemDelete} />
        ));
  return (
    <div>
      {/*PANTRY COMPONENT*/}
      <Segment attached="top" color="green">
        <Header as="h2" textAlign="center">
          Your Pantry
        </Header>
      </Segment>
      <Segment attached="bottom">
        <p>
          {/*Search component for ingredients*/}
          <SearchBox
            route="ingredients"
            onChange={props.handleChange}
            handleResult={props.handleResultSelect}
            placeholder="Add new item to pantry"
            value={props.pantry}
            name="pantry"
          />
          {/*Pantry items*/}
          <List items={pantryItems} />
        </p>
      </Segment>
    </div>
  );
};

export default Pantry;
