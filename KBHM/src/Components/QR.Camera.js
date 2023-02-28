import React, { Component } from 'react'
import QrReader from 'react-qr-reader'

class IndexQR extends Component {
  constructor(props){
    super(props)
    this.state = {
      delay: 100,
      result: 'No result',
    }

    this.handleScan = this.handleScan.bind(this)
  }
  handleScan(data){
    this.setState({
      result: data,
    })
    this.props?.Value(data);
  }
  handleError(err){
    console.error(err)
  }
  render(){
    const previewStyle = {
      height: 260,
      
        
    }

    return(
      <div>
        <QrReader
          delay={this.state.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
          
          />
        <p>Kết quả QR:{this.state.result}</p>
      </div>
    )
  }
}
export default IndexQR;