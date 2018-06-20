import React, { Component } from 'react';

import axios from 'axios';
import QuestionGenerator from './Questions';

class App extends Component {
  constructor(){
    super()
    this.state = {
      questions:[],
      triviaData: [],
    }

    // this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount(){
    axios.get('https://opentdb.com/api.php?amount=10&type=multiple')
      .then((response) => {
       this.setState({triviaData : response.data.results})
       console.log(this.state.triviaData);
     })
    }



  // handleClickQuestions() {
  //
  // }

  render() {
    return (
      <div className ="button_container">
        {/* <button className = 'button' onClick={this.handleClick}>
          Click Me
        </button> */}
        <p>
        {this.state.triviaData && this.state.triviaData[0] ? this.state.triviaData[0].category : null }
        </p>
      </div>
    );
  }
}

export default App;
