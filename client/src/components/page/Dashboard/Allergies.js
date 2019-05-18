import React from 'react';
import AllergyItem from './AllergyItem';
import { Segment, List, Header } from 'semantic-ui-react';
import SearchBox from '../../shared/Search';

const Allergies = props => {
  // Mapping allergy items to format into components
  const allergyItems =
    !props.currUser.allergies || !props.currUser.allergies.length
      ? ['no allergies']
      : props.currUser.allergies.map(item => (
          <AllergyItem db_field_name="allergies" item={item} onIconClick={props.handleItemDelete} />
        ));
  return (
    <div>
      {/*ALLERGIES COMPONENT*/}
      <Segment attached="top" textAlign="center" color="green">
        <Header as="h1">Your Allergies</Header>
      </Segment>
      <Segment attached="bottom">
        {/*Search component for allergy items*/}
        <SearchBox
          route="ingredients"
          handleResult={props.handleResultSelect}
          placeholder="Add new item to allergies"
          value={props.allergies}
          name="allergies"
          onChange={props.handleChange}
        />
        {/*Allergy items*/}
        <List items={allergyItems} />
      </Segment>
    </div>
  );
};

export default Allergies;
