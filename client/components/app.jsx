import React, { Component } from 'react';
import TrueImages from './TrueImages.jsx';
import FalseImages from './FalseImages.jsx';
import FreshImages from './FreshImages.jsx';

// import '../style/style.css';

export default class App extends Component {


  train() {
    // let loss = document.getElementById('loss')
    this.props.classifier.train() 
  }
  render() {

    return (
      <div>
        <button onClick={this.train.bind(this)}>Train</button>
        <TrueImages classifier={this.props.classifier}/>
        <FalseImages classifier={this.props.classifier}/>
        <FreshImages classifier={this.props.classifier}/>
      </div>
    )
  }
}
