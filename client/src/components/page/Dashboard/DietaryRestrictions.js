import React from 'react';
import AllergyItem from './AllergyItem';
import { Segment, List, Header } from 'semantic-ui-react';
import SearchBox from '../../shared/Search';

const DietaryRestrictions = props => {
  // Mapping dietary restrictions to format into components
  const dietaryItems =
    !props.currUser.dietary_restrictions || !props.currUser.dietary_restrictions.length
      ? ['no dietary restrictions']
      : props.currUser.dietary_restrictions.map(item => (
          <AllergyItem
            db_field_name="dietary_restrictions"
            item={item}
            onIconClick={props.handleItemDelete}
          />
        ));
  return (
    <div style={{ paddingBottom: '10px' }}>
      {/*DIETARY RESTRICTIONS COMPONENT*/}
      <Segment attached="top" textAlign="center" color="green">
        <Header as="h1">Your Dietary Restrictions</Header>
      </Segment>
      <Segment attached="bottom">
        {/*Search component for dietary restrictions*/}
        <SearchBox
          route="ingredients"
          placeholder="Add new item to dietary restrictions"
          value={props.dietary_restrictions}
          name="dietary_restrictions"
          onChange={props.handleChange}
          handleResult={props.handleResultSelect}
        />
        {/*Dietary restrictions*/}
        <List items={dietaryItems} />
      </Segment>
    </div>
  );
};

export default DietaryRestrictions;
