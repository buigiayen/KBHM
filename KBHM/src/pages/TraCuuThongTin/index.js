import React from "react";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Divider, Row, Col, Card } from 'antd'
import dayjs from 'dayjs';
import { GET_Person, GET_PropertiesPerson } from '../../Data/Api/DangKyKham'

import Qrcode from '../../Components/QRCode'
import './index.css'
const Index = () => {
    let { ID } = useParams();
    const [InformationPerson, SetInfomationPerson] = useState();
    useMemo(async () => {
        await GET_Person(ID).then(rs => { SetInfomationPerson(rs[0]) })
    }, [])
    return (<Card>

        <Divider orientation="left" orientationMargin="0">
            <span style={{ color: 'blue', fontStyle: 'italic' }}>Tóm tắt thông tin người đăng ký hiến máu</span>
        </Divider>
        <Row gutter={16}>
            <Col xs={24} xl={13}>
                <h4>HỌ VÀ TÊN:  {InformationPerson?.Name?.toUpperCase()}</h4>
                <p>
                    <span className="label">Ngày sinh:</span> {dayjs(InformationPerson?.BirthDay).format("DD/MM/YYYY")}
                </p>
                <p>
                    <span className="label">Giới tính:</span> {InformationPerson?.Sex == 1 ? "Nam" : "Nữ"}
                </p>
                <p>
                    <span className="label">Số CCCD:</span> {InformationPerson?.CCCD}
                </p>
                <p>
                    <span className="label">Mã bảo mật:</span> {ID}
                </p>
                <p>
                    <span className="label">Email:</span> {InformationPerson?.Email}
                </p>
                <p>
                    <span className="label">Số điện thoại:</span> {InformationPerson?.Phone}
                </p>
                <p>
                <span className="label">Địa chỉ thường trú (ghi trên CCCD):</span> {InformationPerson?.DiaChiThuongTru} -  {InformationPerson?.DiaChiThuongTru_ChiTiet}
                </p>
                <p>
                    <span className="label">Link tra cứu: <a>{ID}</a></span> 
                </p>
                <p>
                    <h4 style={{ color: 'red' }}>Lưu ý:</h4>
                    <p className="Waring-blue">Để tránh lộ thông tin cá nhân và kết quả xét nghiệm sàng lọc túi máu Người hiến có trách nhiệm bảo mật thông tin hiện trên màn hình này!</p>
                    <p className="Waring-blue">Chỉ tiết lộ cho cán bộ thuộc đơn vị lấy máu trong quá trình khám sàng lọc và lấy máu trước và trong khi thực hiện hiến máu.</p>
                </p>




            </Col>
            <Col xs={24} xl={3}>

            </Col>
            <Col xs={24} xl={8}>
                <Qrcode value={`${ID}`}></Qrcode>
            </Col>

        </Row>
    </Card>)

}

export default Index;