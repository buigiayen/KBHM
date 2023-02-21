import React from "react";
import dayjs from 'dayjs';
import { Divider, Form, Input, Row, Col, Checkbox, Button, DatePicker } from 'antd'
import LocationCombobox from '../Location.combobox'
import ElementCombobox from "../Element.combobox";
import { Config } from "../../../Data/Config/config.system";
import IconCombine from "../../Icon";
import DateTime from '../../ComponentsGlobal/DateTime'
import { PUT_PersonTrip } from "../../../Data/Api/DangKyKham";
import './index.css'
const Index = () => {
const Putperson = () => {
    PUT_PersonTrip
}
    return (
        <>
            <Divider orientation="left"><span style={{ color: 'blue', fontStyle: 'italic' }}>Thông tin tua lấy máu</span></Divider>
            <Form labelCol={8}>
                <Row gutter={[12]}>
                    <Col md={12} xs={24}>
                        <Form.Item label='Ngày hiến'><DateTime /></Form.Item>
                    </Col>
                    <Col md={12} xs={24}>
                        <Form.Item label='Hiến loại thành phần'><ElementCombobox defaultValue={Config.LoaiThanhPhan} /></Form.Item>
                    </Col>
                </Row>
                <Row gutter={[12]}>
                    <Col md={12} xs={24}>
                        <Form.Item label='Điểm lấy máu'><LocationCombobox /></Form.Item>
                    </Col>
                    <Col md={12} xs={24}>
                        <Form.Item label='Địa chỉ'>{Config.Region}</Form.Item>
                    </Col>
                </Row>
                <Row gutter={[12]}>
                    <Col md={12} xs={24}>
                        <Form.Item label='In phiếu ĐKHM khi cấp mã túi máu'><Checkbox value={true} /></Form.Item>
                    </Col>
                    <Col md={12} xs={24}>
                        <Form.Item label='Mã túi máu'><Input /></Form.Item>
                    </Col>
                </Row>
                <Row gutter={[8]}>
                    <Col md={6} xs={24}>
                        <Button className="btnFull" icon={<IconCombine.FileOutlined></IconCombine.FileOutlined>}>In phiếu ĐKHM</Button>
                    </Col>
                    <Col md={6} xs={24}>

                    </Col>
                    <Col md={6} xs={24}>
                        <Button className="btnFull" type='dashed' danger icon={<IconCombine.CloseCircleOutlined></IconCombine.CloseCircleOutlined>}>Hủy lấy máu</Button>
                    </Col>
                    <Col md={6} xs={24}>
                        <Button className="btnFull" type='primary' icon={<IconCombine.CheckOutlined></IconCombine.CheckOutlined>}>Cấp mã túi máu</Button>
                    </Col>
                </Row>
            </Form>

        </>
    )
}
export default Index