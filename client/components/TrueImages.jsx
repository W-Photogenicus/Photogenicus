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

  addToModel() {
    let images = this.state.images;
    let total = images.length - 1;
    let addTrue = document.getElementById('truestatus');
    addTrue.innerHTML = '0%';
    images.forEach((imageEl, i) => {
      this.props.classifier.addImage(document.getElementById('true' + i), 'true', () => {
        let current = i;
        let percentage = Math.floor((current / total) * 100)+'%'
        addTrue.innerHTML = percentage;
      });
    })
    let container = document.getElementById('truebox');
    document.getElementById('addtrue').disabled = true;
    container.innerHTML = ''
  }

  componentDidMount() {
    const images = [];
    fetch('http://localhost:5000/gettrue', {
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
        // let image = <img src={pic.url} id={'true' + i} width="224px" height="224px" key={'true' + i} crossOrigin="anonymous"/>
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
    var arrays = [], size = 4;
    console.log(this.state.images);

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
      <p>True Images</p>
      <Button bsStyle="info" onClick={this.addToModel.bind(this)}>Add to True Model</Button>

        <div id="truebox">
          <Grid>
            {outputImagesArr}
          </Grid>
        </div>
     </div>
    )
  }
}


