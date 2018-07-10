import React, { Component } from 'react';

export default class UploadBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heightClass: '',
    }
  }

  collapseDiv() {
    this.setState((current) => {
      if (current.heightClass === '') {
              current.heightClass = 'collapsed';
      } else {
        current.heightClass = '';
      }
      return current;
    })
  }

  render() {
    return (
      <div className={this.state.heightClass}>
      <button className="btn-dark" onClick={this.collapseDiv.bind(this)}>Collapse</button>
      <div id="uploadbox" >

            <form action="http://localhost:5000/upload" className="dropzone" method="post" encType="multipart/form-data">
                <div className="fallback">
                    <input name="file" type="file" multiple />
                </div>
            </form>    
     </div>
     </div>
    )
  }
}
