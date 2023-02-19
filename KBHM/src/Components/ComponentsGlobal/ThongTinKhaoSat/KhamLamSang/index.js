import React from "react";
import { Row, Col, Form, Input, Radio, Space } from "antd";

const Index = () => {

    return (
        <React.Fragment>
            <Row gutter={[12]}>
                <Col md={12} xs={24}>
                    <Form.Item label='Cân nặng(KG)'><Input /></Form.Item>
                </Col>
                <Col md={12} xs={24}>
                    <Form.Item label='Chiều cao (Cm)'><Input /></Form.Item>
                </Col>
            </Row>
            <Row gutter={[12]}>
                <Col md={12} xs={24}>
                    <Form.Item label='Mạch (Lần/Phút)'><Input /></Form.Item>
                </Col>
                <Col md={12} xs={24}>
                    <Form.Item label='Huyết áp(mmHg)'><Input /></Form.Item>
                </Col>
            </Row>
            <Row gutter={[12]}>
                <Col md={24} xs={24}>
                    <Form.Item label='Tình trạng lâm sàng'><Input /></Form.Item>
                </Col>
            </Row>
            <h2>KẾT LUẬN:</h2>
            <Row>
                <Col md={12} xs={24}>
                    <Radio.Group>
                        <Space direction="vertical">
                            <Radio value={1}>Cho phép hiến máu</Radio>
                            <Radio value={2}>Không cho phép hiến máu</Radio>
                        </Space>
                    </Radio.Group>
                </Col>
                <Col md={12} xs={24}>
                    <Radio.Group>
                        <Space direction="vertical">
                            <Form.Item label='Lượng máu có thể hiến '>
                                <Input placeholder="(ml)"></Input>
                            </Form.Item>
                            <Form.Item label='Tạm hoãn '>
                                <Input placeholder="(Tuần)"></Input>
                            </Form.Item>

                        </Space>
                    </Radio.Group>
                </Col>
            </Row>

        </React.Fragment>
    )
}
export default Index;