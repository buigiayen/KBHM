import { Col, Row } from "antd";
import FloatButton from '../Components/Float.Button'
const Index = ({component}) =>{
    return (
        <Row>
        <Col sm={5}> </Col>
        <Col sm={14}>
          {component}
        </Col>
        
        <Col sm={5}>
          <FloatButton></FloatButton>
        </Col>
        
        </Row>
  )
}
export default Index;

