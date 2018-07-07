import React, { Component } from 'react';
// import '../style/style.css';

export default class FalseImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    }
  }

  addToModel() {
    let images = this.state.images;
    images.forEach((imageEl, i) => {
      console.log('adding to classifier');
      this.props.classifier.addImage(document.getElementById('false' + i), 'false');
    })
    let container = document.getElementById('falsebox');
    container.innerHTML = ''
  }

  componentDidMount() {
    const images = [];
    fetch('http://localhost:5000/getfalse', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
      }
    })
    .then(response => {
      return response.json();
    })
    .then(urlArr => {
      console.log(urlArr);
      urlArr.forEach((pic, i) => {
        let image = <img src={pic.url} id={'false' + i} width="224px" height="224px" key={'false' + i} crossOrigin="anonymous"/>

        images.push(image);
           console.log(images);
      });
      this.setState(preState => {
        preState.images = images;
        return preState;
      })
      return urlArr;
    })
  }

  render() {
    

    return (
      <div id="false">
      <p>false</p>
      <button onClick={this.addToModel.bind(this)} >Add to Model</button>
        <div id="falsebox">
          {this.state.images}
        </div>
     </div>
    )
  }
}


