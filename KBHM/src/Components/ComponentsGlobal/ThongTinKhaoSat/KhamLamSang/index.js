import React, { useState, useEffect } from "react";
import { Row, Col, Form, Input, Radio, Space, Button } from "antd";
import IconCombine from "../../../Icon";
import '../../index.css'
import { PUT_PersonInfo_healthy } from "../../../../Data/Api/DangKyKham";

const Index = ({ ID, dataPerson, SetDataPerson, SetChoPhepHienMau, HienMau }) => {
    const [isdisabled, SetIsdisabled] = useState(true);
    const [PersonUpdate, SetPersonUpdate] = useState({
        "RowID": null,
        "CanNang": null,
        "ChieuCao": null,
        "Mach": null,
        "HuyetAp": null,
        "TinhTrangLamSang": null,
        "ChoPhepHienMau": null,
        "LuongMauLay": null,
        "LuongMauCoTheHien": null,
        "TamHoan": null,
        "LuongHien": null,
        "PhanUng": null,
        "XuTri": null,

    })
    const [IsLoadding, SetIsloading] = useState(false);
    useEffect(() => {
        SetPersonUpdate(dataPerson);
    }, [dataPerson])
    const PutPerson = async () => {
        SetIsloading(true);
        const ClonePersonUpdate = PersonUpdate;
        SetDataPerson({
            ...dataPerson,
            ...PersonUpdate
        })
        ClonePersonUpdate.rowID = ID;
        await PUT_PersonInfo_healthy(PersonUpdate).then(() => { SetIsloading(false); SetIsdisabled(true) })
    }

    return (

        <React.Fragment>
            <Form labelCol={8}>
                <Row gutter={[12]}>
                    <Col md={12} xs={24}>
                        <Form.Item label='Cân nặng(KG)'><Input value={PersonUpdate?.CanNang} onChange={(e) => { SetPersonUpdate({ ...PersonUpdate, CanNang: e.target.value }); SetIsdisabled(false) }} /></Form.Item>
                    </Col>
                    <Col md={12} xs={24}>
                        <Form.Item label='Chiều cao (Cm)'><Input value={PersonUpdate?.ChieuCao} onChange={(e) => { SetPersonUpdate({ ...PersonUpdate, ChieuCao: e.target.value }); SetIsdisabled(false) }} /></Form.Item>
                    </Col>
                </Row>
                <Row gutter={[12]}>
                    <Col md={12} xs={24}>
                        <Form.Item label='Mạch (Lần/Phút)'><Input value={PersonUpdate?.Mach} onChange={(e) => { SetPersonUpdate({ ...PersonUpdate, Mach: e.target.value }); SetIsdisabled(false) }} /></Form.Item>
                    </Col>
                    <Col md={12} xs={24}>
                        <Form.Item label='Huyết áp(mmHg)'><Input value={PersonUpdate?.HuyetAp} onChange={(e) => { SetPersonUpdate({ ...PersonUpdate, HuyetAp: e.target.value }); SetIsdisabled(false) }} /></Form.Item>
                    </Col>
                </Row>
                <Row gutter={[12]}>
                    <Col md={24} xs={24}>
                        <Form.Item label='Tình trạng lâm sàng'><Input value={PersonUpdate?.TinhTrangLamSang} onChange={(e) => { SetPersonUpdate({ ...PersonUpdate, TinhTrangLamSang: e.target.value }); SetIsdisabled(false) }} /></Form.Item>
                    </Col>
                </Row>
                <h2>KẾT LUẬN:</h2>
                <Row>
                    <Col md={12} xs={24}>
                        <Radio.Group
                            value={PersonUpdate?.ChoPhepHienMau}
                            onChange={(e) => {
                                SetPersonUpdate({ ...PersonUpdate, ChoPhepHienMau: e.target.value });
                                SetChoPhepHienMau(e.target.value)
                                HienMau(e.target.value)
                                SetIsdisabled(false)
                            }}>
                            <Space direction="vertical">
                                <Radio value={true}>Cho phép hiến máu</Radio>
                                <Radio value={false}>Không cho phép hiến máu</Radio>
                            </Space>
                        </Radio.Group>
                    </Col>
                    <Col md={12} xs={24}>
                        <Space direction="vertical">
                            <Form.Item label='Lượng máu có thể hiến '>
                                <Input placeholder="(ml)" value={PersonUpdate?.LuongMauCoTheHien} onChange={(e) => { SetPersonUpdate({ ...PersonUpdate, LuongMauCoTheHien: e.target.value }); SetIsdisabled(false) }}></Input>
                            </Form.Item>
                            <Form.Item label='Tạm hoãn '>
                                <Input placeholder="(Tuần)" value={PersonUpdate?.TamHoan} onChange={(e) => { SetPersonUpdate({ ...PersonUpdate, TamHoan: e.target.value }); SetIsdisabled(false) }}></Input>
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
                        {PersonUpdate?.Sync === null ? <Button type="primary" disabled={isdisabled} loading={IsLoadding} onClick={PutPerson} className="btnFull" icon={<IconCombine.CheckOutlined />} >Xác nhận thông tin</Button> : <> </>}
                    </Col>
                </Row>
            </Form>


        </React.Fragment>
    )
}
export default Index;