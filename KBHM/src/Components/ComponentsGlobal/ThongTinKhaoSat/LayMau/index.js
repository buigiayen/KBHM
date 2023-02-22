import React from "react";
import { Row, Col, Form, Input, DatePicker, Button } from "antd";
import Ml from "../../ml.combobox";
import ElementCombobox from "../../Element.combobox";
import "../../index.css";
const Index = () => {
  return (
    <React.Fragment>
      <Form labelCol={{ span: 8 }}>
        <Row gutter={[12]}>
          <Col md={12} xs={24}>
            <Form.Item label="Mã túi máu">
              <Input readOnly />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[12]}>
          <Col md={12} xs={24}>
            <Form.Item label="Lượng hiến">
              <Ml />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item label="Hiến loại thành phần máu">
              <ElementCombobox />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[12]}>
          <Col md={12} xs={24}>
            <Form.Item label="Phản ứng">
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item label="Xử trí">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[12]}>
          <Col md={4} xs={24}>  
          </Col>
          <Col md={4} xs={24}>  
          </Col>
          <Col md={6} xs={24}>
            <Button type="primary" className="btnFull">
              Kết thúc lấy máu
            </Button>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
};
export default Index;
