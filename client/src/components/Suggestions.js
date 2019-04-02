import React from "react";

const Suggestions = props => {
  let key = 0;
  const options = props.results.map(item => <li key={key++}>{item.name}</li>);
  return <ul>{options}</ul>;
};

export default Suggestions;
