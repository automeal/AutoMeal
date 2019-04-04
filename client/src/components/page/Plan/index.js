import Nav from '../../shared/Nav';
import React from 'react';
//import './Landing.css';


const MealPlan = (props) => (
  <div className="Login">
    <div className="Login__banner">
    </div>
    <div className="Login__data">
      <div className="Login__data__content">
        <h1>Weekly Meal Plan</h1>
        <ul>
          <li>Meal Plan for each day of the week will go here</li>
          <li>Need to fix up backend, but some logic is there</li>
          <li>7 days of week, based on survey data</li>
          <li>Nutrition Info Displayed with each meal (based on survey data)</li>
        </ul>
      </div>
    </div>
  </div>
);
export default MealPlan;
/*import React from 'react';
import Meal from '../../shared/Meal';
import Tabs, {Tab} from '../../shared/Tabs';
import NotFound from '../../shared/NotFound';
import Nav from '../../shared/Nav';

import './Plan.css';

const createContent = (heading,dataOb,index) => {
  let contentArr = [];
  for(let mealType in dataOb){
    let content = dataOb[mealType][index];
    if(content){
      contentArr.push({label:mealType,content:content})
    }
  }
  return (
    <Tab heading =  { heading } key={`Tab__${index}`} >
      {
        contentArr.map((elem,i) => {
          let recipe = elem.content.recipe;
          let dietLabels = recipe.dietLabels ? recipe.dietLabels : {};
          let healthLabels =  recipe.healthLabels ? recipe.healthLabels : {};

          return (
            <Meal type={elem.label}
                  imgSrc={ recipe.image ? recipe.image : null }
                  heading={ recipe.label ? recipe.label : null }
                  source={ recipe.source ? recipe.source : null }
                  tags={[...dietLabels, ...healthLabels]}
                  url={ recipe.url ? recipe.url : "#"}
                  key={`Meal__${i}_${index}`}
            />
          )
        })
      }
    </Tab>
  )
}

const createTabs = (count,data) => {
  let tabs = [];
  for(let i=0;i<count;i++){
    let content = createContent(`Day ${i+1}`, data, i);
    tabs.push(content)
  }
  return (
    <Tabs defaultIndex={0} className="Plan__tabs" >{tabs.map((tab) => tab)}</Tabs>
  )
}

const Plan = (props) => {
  if(!props.location || !props.location.state || !props.location.state.data) return (
    <div>
      <Nav />
      <NotFound />
    </div>
  )
  let param = props.location.state.data;
  return(
    <div className="Plan">
      <Nav />
      {createTabs(param.num,param.data)}
    </div>
  )
}

export default Plan;
*/