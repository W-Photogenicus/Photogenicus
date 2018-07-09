import React, { Component } from 'react';
import TrueImages from './TrueImages.jsx';
import FalseImages from './FalseImages.jsx';
import FreshImages from './FreshImages.jsx';
import { Button, Navbar } from 'react-bootstrap';

// import '../style/style.css';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      trained: false
    }
  }

  train() {
    // let loss = document.getElementById('loss')
    this.props.classifier.train() 

  }
  render() {
    return (
      <div>

        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <a className="title" href="/">Photogenicus</a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Button bsStyle="primary" onClick={this.train.bind(this)}>Train</Button>
        <TrueImages classifier={this.props.classifier}/>
        <FalseImages classifier={this.props.classifier}/>
        <FreshImages classifier={this.props.classifier}/>

      </div>
    )
  }
}
