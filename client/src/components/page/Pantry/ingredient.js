import React from 'react';

export class Ingredient extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            visible: this.props.visible
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.setState({
            visible: false
        });

        this.props.getIngredient(this.props.name);
    }


    render(){
        let style = {
            display : this.state.visible ? null : 'none'
        };
        return(
          <div onClick={this.handleClick}  className="Ingredient container">
              <div style={style} className="row">
                  <a><div className="col-sm-1">+</div></a>
                  <div className="col-sm-3">{this.props.name}</div>
              </div>
          </div>
        );
    }
}