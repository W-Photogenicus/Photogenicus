import React, { Component } from 'react';
import { Button, Grid, Row, Col, Image } from 'react-bootstrap';
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
    let total = images.length - 1;
    let falsestatus = document.getElementById('falsestatus');
    images.forEach((imageEl, i) => {
      this.props.classifier.addImage(document.getElementById('false' + i), 'false', () => {
        let current = i;
        let percentage = Math.floor((current / total) * 100)+'%'
        falsestatus.innerHTML = percentage;
      });
    })
    let container = document.getElementById('falsebox');
    document.getElementById('addfalse').disabled = true;
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
      // console.log(urlArr);

      urlArr.forEach((pic, i) => {
        // let image = <img src={pic.url} id={'false' + i} width="224px" height="224px" key={'false' + i} crossOrigin="anonymous"/>

        images.push(pic.url);

      });
      this.setState(preState => {
        preState.images = images;
        return preState;
      })
      return urlArr;
    })
  }

  render() {

    var arrays = [], size = 4;
    let imagesLen = this.state.images.length;
    console.log(this.state.images);
    // let imagesClone = this.state.images.slice();
    while (this.state.images.length > 0)
      arrays.push(this.state.images.splice(0, size));

    let outputImagesArr = [];
    // future todo, is to break out row, col, and image into separate containers
    for ( let ii = 0; ii < arrays.length; ii++) {
      outputImagesArr.push(
        <Row key={ii}>
          <Col xs={12} sm={3}>
            <Image width="224px" height="224px" className='img-thumbnail' id={'false' + imagesLen--} key={arrays[ii][0]} crossOrigin="anonymous" src={arrays[ii][0]} />
          </Col>
          <Col xs={12} sm={3}>
            <Image width="224px" height="224px" className='img-thumbnail' id={'false' + imagesLen--} key={arrays[ii][0]} crossOrigin="anonymous" src={arrays[ii][1]} />
          </Col>
          <Col xs={12} sm={3}>
            <Image width="224px" height="224px" className='img-thumbnail' id={'false' + imagesLen--} key={arrays[ii][0]} crossOrigin="anonymous" src={arrays[ii][2]} />
          </Col>
          <Col xs={12} sm={3}>
            <Image width="224px" height="224px" className='img-thumbnail' id={'false' + imagesLen--} key={arrays[ii][0]} crossOrigin="anonymous" src={arrays[ii][3]} />
          </Col>
        </Row>
      );
    }
    
    return (
      <div id="false">
      <p>False Images</p>
      <Button bsStyle="danger" onClick={this.addToModel.bind(this)}>Add to False Model</Button>

        <div id="falsebox">
          <Grid>
            {outputImagesArr}
          </Grid>
        </div>
     </div>
    )
  }
}


