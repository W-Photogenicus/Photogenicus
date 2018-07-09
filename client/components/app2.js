import React, { Component } from 'react';
// import '../../style/style.css';

export default class App extends Component {
    constructor(props) {
      super(props)
      this.state = {
        imageArr: [],
        truthArr: [],
        falseArr: []
      }
    }

  render() {
    return (
    //   <div>
    //     <h1>Is it an Animal</h1>
    //     <p>The MobileNet model labeled this as
    //     <span id="result">...</span> with a confidence of
    //     <span id="probability">...</span></p>
    //     <img src="https://ml5js.org/docs/assets/img/bird.jpg"
    //   crossOrigin="anonymous" id="image" width="400" />
    //  </div>

    <div>
      <h1>Is It an animal?</h1>
    </div>
    )
  }
}