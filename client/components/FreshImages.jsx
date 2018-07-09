import React, { Component } from 'react';
import { Button, Grid, Row, Col, Image } from 'react-bootstrap';
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
    images.forEach((imageEl, i) => {
    	console.log('creating classify promise');
      let classifyProm = new Promise((resolve, reject) => {
        this.props.classifier.classify(document.getElementById('fresh' + i), function(results) {
          if (results === 'true') {
            console.log('adding to filtered');
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
        //let image = <img src={pic.url} id={'fresh' + i} width="224px" height="224px" key={'fresh' + i} crossOrigin="anonymous"/>
        images.push(pic.url);
          //  console.log(images);
      });
      this.setState(preState => {
        preState.images = images;
        return preState;
      })
      return urlArr;
    })
  }

  render() {

    //this.state.images  is our LARGE array
    var arrays = [], size = 4;

    while (this.state.images.length > 0)
      arrays.push(this.state.images.splice(0, size));

    let outputImagesArr = [];
    // future todo, is to break out row, col, and image into separate containers
    for ( let ii = 0; ii < arrays.length; ii++) {
      outputImagesArr.push(
        <Row key={ii}>
          <Col xs={12} sm={3}>
            <Image width="224px" height="224px" className='img-thumbnail' key={arrays[ii][0]} crossOrigin="anonymous" src={arrays[ii][0]} />
          </Col>
          <Col xs={12} sm={3}>
            <Image width="224px" height="224px" className='img-thumbnail' key={arrays[ii][0]} crossOrigin="anonymous" src={arrays[ii][1]} />
          </Col>
          <Col xs={12} sm={3}>
            <Image width="224px" height="224px" className='img-thumbnail' key={arrays[ii][0]} crossOrigin="anonymous" src={arrays[ii][2]} />
          </Col>
          <Col xs={12} sm={3}>
            <Image width="224px" height="224px" className='img-thumbnail' key={arrays[ii][0]} crossOrigin="anonymous" src={arrays[ii][3]} />
          </Col>
        </Row>
      );
    }

    return (
      <div id="true">
      <p>true</p>
      <Button bsStyle="success" onClick={this.classify.bind(this)} >Classify</Button>
      <div id="truebox">
      <Grid>
          {outputImagesArr}
        </Grid>
      </div>
     </div>
    )
  }

}


