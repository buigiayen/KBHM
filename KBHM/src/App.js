
import './App.css';
import RouterIndex from './Router/index'
import { Row, Col } from 'antd'
import FloatButton from './Components/Float.Button'
import Banner from './Components/Img.Carousel'

function App() {
  return (
    <div className="App">
      <Banner></Banner>
      <Row>
        <Col sm={5}> </Col>
        <Col sm={14}>
          <RouterIndex></RouterIndex>
        </Col>

        <Col sm={5}>
          <FloatButton></FloatButton>
        </Col>

      </Row>
      <br />
      <br />
    </div>
  );
}

export default App;
