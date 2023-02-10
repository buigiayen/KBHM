import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Divider, Row, Col, Card } from 'antd'
import { GET_Person, GET_PropertiesPerson } from '../../Data/Api/DangKyKham'
import Qrcode from '../../Components/QRCode'
const Index = () => {
    let { ID } = useParams();
    const [InformationPerson, SetInfomationPerson] = useState();
    const [InformationPersonProperties, SetInfomationPersonProperties] = useState();
    const [DiaChiThuongTruCCCD, SetDiaChiThuongTruCCCD] = useState();
    useMemo(async () => {
        await GET_Person(ID).then(rs => { SetInfomationPerson(rs[0]) })
        await GET_PropertiesPerson(ID).then(rs => {
            SetDiaChiThuongTruCCCD(rs.filter(p => p.Key == 'DiaChiThuongTruCCCD')[0])
        })

    }, [])
    return (<>

        <Divider orientation="left" orientationMargin="0">
            <span style={{ color: 'blue', fontStyle: 'italic' }}>Tóm tắt thông tin người đăng ký hiến máu</span>
        </Divider>
        <Row gutter={16}>
            <Col xs={24} xl={13}>
                <h4>HỌ VÀ TÊN:  {InformationPerson?.Name?.toUpperCase()}</h4>
                <p>
                    <span className="blod">Ngày sinh:</span> {InformationPerson?.BirthDay}
                </p>
                <p>
                    <span className="blod">Giới tính:</span> {InformationPerson?.Sex == 1 ? "Nam" : "Nữ"}
                </p>
                <p>
                    <span className="blod">Số CCCD:</span> {InformationPerson?.CCCD}
                </p>
                <p>
                    <span className="blod">Số điện thoại:</span> {InformationPerson?.Phone}
                </p>
                <p>
                    {DiaChiThuongTruCCCD &&
                        <span>{DiaChiThuongTruCCCD.Label}: {DiaChiThuongTruCCCD.value}</span>}
                </p>
                <p>
                    <h4 style={{color:'red'}}>Lưu ý:</h4>
                    <p>Để tránh lộ thông tin cá nhân và kết quả xét nghiệm sàng lọc túi máu Người hiến có trách nhiệm bảo mật thông tin hiện trên màn hình này!</p>
                    <p>Chỉ tiết lộ cho cán bộ thuộc đơn vị lấy máu trong quá trình khám sàng lọc và lấy máu trước và trong khi thực hiện hiến máu.</p>
                </p>




            </Col>
            <Col xs={24} xl={3}>

            </Col>
            <Col xs={24} xl={8}>
                <Qrcode value={"Yên đẹp trai"}></Qrcode>
            </Col>

        </Row>
    </>)

}

export default Index;