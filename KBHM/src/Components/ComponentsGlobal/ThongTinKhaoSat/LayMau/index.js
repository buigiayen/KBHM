import React from "react";
import { Row, Col, Form, Input, Radio, Space, Button } from "antd";

const Index = () => {

    return (
        <React.Fragment>
            <Form labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}>
                <Row gutter={[12]}>
                    <Col md={12} xs={24}>
                        <Form.Item label='Ngày hiến'><Input /></Form.Item>
                    </Col>
                    <Col md={12} xs={24}>
                        <Form.Item label='Mã túi máu'><Input /></Form.Item>
                    </Col>
                </Row>
                <Row gutter={[12]}>
                    <Col md={12} xs={24}>
                        <Form.Item label='Lượng hiến'><Input /></Form.Item>
                    </Col>
                    <Col md={12} xs={24}>
                        <Form.Item label='Hiến loại thành phần máu'><Input /></Form.Item>
                    </Col>
                </Row>
                <Row gutter={[12]}>
                    <Col md={12} xs={24}>
                        <Form.Item label='Phản ứng'><Input /></Form.Item>
                    </Col>
                    <Col md={12} xs={24}>
                        <Form.Item label='Xử trí'><Input /></Form.Item>
                    </Col>
                </Row>
                <Row gutter={[12]}>
                    <Button type='primary'>Kết thúc lấy máu</Button>
                </Row>
            </Form>

        </React.Fragment>
    )
}
export default Index;