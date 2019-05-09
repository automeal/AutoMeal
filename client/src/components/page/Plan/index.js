// import Nav from '../../shared/Nav';
import React from 'react';
import { Container, Header, Button, Icon } from 'semantic-ui-react';
import food5 from '../../../Resources/food5.jpg';
//import './Landing.css';

const MealPlan = ({ mobile }) => (
  <div className="ui fluid image">
    <img src={food5} alt="" />
    <div
      style={{
        position: 'absolute',
        bottom: '40%',
        width: '100%',
        height: 'auto'
      }}
    >
      <Container text textAlign="center">
        <Header
          as="h1"
          content="Your Meal Plan"
          style={{
            fontSize: mobile ? '2em' : '4em',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop: mobile ? '1.5em' : '3em'
          }}
        />
        <Button href="/daily_mealplan" color="green" size="huge" animated>
          <Button.Content visible>Daily Meal Plan</Button.Content>
          <Button.Content hidden>
            <Icon name="arrow right" />
          </Button.Content>
        </Button>
        <Button href="/weekly_mealplan" color="green" size="huge" animated>
          <Button.Content visible>Weekly Meal Plan</Button.Content>
          <Button.Content hidden>
            <Icon name="arrow right" />
          </Button.Content>
        </Button>
      </Container>
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
