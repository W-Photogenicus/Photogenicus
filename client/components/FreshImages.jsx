import React, { Component } from 'react';
// import '../style/style.css';

export default class TrueImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    }
  }

  classify() {
    let images = this.state.images;
    let filtered = [];
    let promises = [];
    let total = images.length;
    images.forEach((imageEl, i) => {
      let classifyProm = new Promise((resolve, reject) => {
        this.props.classifier.classify(document.getElementById('fresh' + i), function(results) {
          if (results === 'true') {
            filtered.push(imageEl);
          }
          resolve();
        })
      });
      promises.push(classifyProm);


    })
    Promise.all(promises)
    .then(() => {
    	this.setState(preState => {
  			console.log('setting state', filtered);
        preState.images = filtered;
        return preState;
      })
    })
    .then(() => {
      let info = document.getElementById('info');
      let information = `Selected ${filtered.length} images from a batch of ${total}.`
      document.getElementById('classify').disabled = true;
      info.innerHTML = information;
    })
  }

  componentDidMount() {
    const images = [];
    fetch('http://localhost:5000/getfresh', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
      }
    })
    .then(response => {
      return response.json();
    })
    .then(urlArr => {
      urlArr.forEach((pic, i) => {
        let image = <img src={pic.url} id={'fresh' + i} width="224px" height="224px" key={'fresh' + i} crossOrigin="anonymous"/>

        images.push(image);
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
      <div id="true">
      <p>Unsorted Images</p>
      <button onClick={this.classify.bind(this)} id="classify" >Classify</button>
        <p id="info"></p>
        <div id="unfiltered">
          {this.state.images}
        </div>
     </div>
    )
  }

}