import React, { useState } from "react";
import { Row, Col, Form, Input, Radio, Space, Button } from "antd";
import IconCombine from "../../../Icon";
import '../../index.css'
import { PUT_PersonInfo } from "../../../../Data/Api/DangKyKham";
const Index = (props) => {
  const SetStateChoPhepHienMau = (value) => {
    if(props.ChoPhepHienMau !== undefined){
        props.ChoPhepHienMau(value);
    }
  }
    const [PersonUpdate, SetPersonUpdate] = useState({

        "rowID": null,
        "canNang": null,
        "chieuCao": null,
        "mach": null,
        "huyetAp": null,
        "tinhTrangLamSang": null,
        "choPhepHienMau": null,
        "luongMauLay": null,
        "luongMauCoTheHien": null,
        "tamHoan": null,
        "luongHien": null,
        "phanUng": null,
        "xuTri": null
    })
    const [IsLoadding, SetIsloading] = useState(false);
    const PutPerson = async () => {
        SetIsloading(true);
        const ClonePersonUpdate = PersonUpdate;
        ClonePersonUpdate.rowID =  props.ID;
        await PUT_PersonInfo(PersonUpdate).then(() => SetIsloading(false))
    }
    return (
        <React.Fragment>
            <Form labelCol={8}>
                <Row gutter={[12]}>
                    <Col md={12} xs={24}>
                        <Form.Item label='Cân nặng(KG)'><Input onChange={(e) => { SetPersonUpdate({ ...PersonUpdate, canNang: e.target.value }) }} /></Form.Item>
                    </Col>
                    <Col md={12} xs={24}>
                        <Form.Item label='Chiều cao (Cm)'><Input onChange={(e) => { SetPersonUpdate({ ...PersonUpdate, chieuCao: e.target.value }) }} /></Form.Item>
                    </Col>
                </Row>
                <Row gutter={[12]}>
                    <Col md={12} xs={24}>
                        <Form.Item label='Mạch (Lần/Phút)'><Input onChange={(e) => { SetPersonUpdate({ ...PersonUpdate, mach: e.target.value }) }} /></Form.Item>
                    </Col>
                    <Col md={12} xs={24}>
                        <Form.Item label='Huyết áp(mmHg)'><Input onChange={(e) => { SetPersonUpdate({ ...PersonUpdate, huyetAp: e.target.value }) }} /></Form.Item>
                    </Col>
                </Row>
                <Row gutter={[12]}>
                    <Col md={24} xs={24}>
                        <Form.Item label='Tình trạng lâm sàng'><Input onChange={(e) => { SetPersonUpdate({ ...PersonUpdate, tinhTrangLamSang: e.target.value }) }} /></Form.Item>
                    </Col>
                </Row>
                <h2>KẾT LUẬN:</h2>
                <Row>
                    <Col md={12} xs={24}>
                        <Radio.Group>
                            <Space
                                direction="vertical"
                                onChange={(e) => {
                                    SetPersonUpdate({ ...PersonUpdate, choPhepHienMau: e.target.value === "1" ? true : false });
                                    SetStateChoPhepHienMau(e.target.value === "1" ? true : false);
                                }}>
                                <Radio value={1}>Cho phép hiến máu</Radio>
                                <Radio value={2}>Không cho phép hiến máu</Radio>
                            </Space>
                        </Radio.Group>
                    </Col>
                    <Col md={12} xs={24}>
                        <Space direction="vertical">
                            <Form.Item label='Lượng máu có thể hiến '>
                                <Input placeholder="(ml)" onChange={(e) => { SetPersonUpdate({ ...PersonUpdate, luongMauCoTheHien: e.target.value }) }}></Input>
                            </Form.Item>
                            <Form.Item label='Tạm hoãn '>
                                <Input placeholder="(Tuần)" onChange={(e) => { SetPersonUpdate({ ...PersonUpdate, tamHoan: e.target.value }) }}></Input>
                            </Form.Item>

                        </Space>
                    </Col>
                </Row>
                <Row>
                    <Col md={5} xs={24}>
                    </Col>
                    <Col md={5} xs={24}>
                    </Col>
                    <Col md={5} xs={24}>
                        <Button type="primary" loading={IsLoadding} onClick={PutPerson} className="btnFull" icon={<IconCombine.CheckOutlined />} >Xác nhận thông tin</Button>
                    </Col>
                </Row>
            </Form>


        </React.Fragment>
    )
}
export default Index;