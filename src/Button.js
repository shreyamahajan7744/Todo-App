import React from 'react';


export default class Button extends React.Component {
    constructor() {
      super();
      this.state = {
        count: 0,
      };
    }
  
    updateCount() {
      this.setState((prevState) => {
        return { count: prevState.count + 1 }
      });
    }
  
    render() {
      return (<button className="btn-primary btn"
                onClick={() => this.updateCount()}
              >
                Clicked {this.state.count} times
              </button>);
    }
  }