import logo from './logo.svg';
import './App.css';
import RouterIndex from './Router/index'
import { Row, Col } from 'antd'
function App() {
  return (
    <div className="App">

      <Row>
        <Col sm={5}> </Col>
        <Col sm={14}>
          <Row>
            <Col sm={24}>
              <h2 style={{ textAlign: 'center', color: 'red' }}>PHIẾU ĐĂNG KÝ HIẾN MÁU TÌNH NGUYỆN</h2>
            </Col>
          </Row>
          <RouterIndex></RouterIndex>
        </Col>

        <Col sm={5}> </Col>

      </Row>

    </div>
  );
}

export default App;
