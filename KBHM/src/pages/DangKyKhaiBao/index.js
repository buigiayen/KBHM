import React, { useState } from "react";
import ThongTinLanHien from '../../Components/ComponentsGlobal/ThongTinLanHien/index'
import KhaoSatThongTinSucKhoe from '../../Components/ComponentsGlobal/KhaoSatThongTinSK/index'
import { Config } from "../../Data/Config/config.system";
import { POST_DangKyHienMau } from "../../Data/Api/DangKyKham";
import { Row, Col, Button, Space } from "antd";
import { useNavigate } from 'react-router-dom';
const Index = () => {
    const Navigate = useNavigate();
    const [Persons, DataPersons] = useState();
    const [Properties, DataProperties] = useState();
    const [IsLoadding, SetLoading] = useState(false);
    const Confirm = () => {

        const PersonClone = Persons;
        const InfomationPersonAddress = [];
        InfomationPersonAddress.push({ key: 'NoiCapCCCD', label: "Nơi cấp CCCD", value: Persons.NoiCapCCCD })
        InfomationPersonAddress.push({ key: 'DiaChiThuongTruCCCD', label: "Địa chỉ thường trú(Ghi trên căn cước công dân)", value: Persons.DiaChiThuongTruCCCD })
        InfomationPersonAddress.push({ key: 'XPHT1', label: "Xã Phường huyện tỉnh thường trú", value: Persons.XPHT1 })
        InfomationPersonAddress.push({ key: 'DiaChiLienLac', label: "Địa chỉ liên lạc", value: Persons.DiaChiLienLac })
        InfomationPersonAddress.push({ key: 'XPHT2', label: "Xã  phường huyện tỉnh địa chỉ liên lạc", value: Persons.XPHT2 })
        InfomationPersonAddress.forEach(rs => {
            Properties.push({ 'key': rs.key, 'label': rs.label, 'value': rs.value })
        });


        PersonClone.personProperties = Properties;


        console.log('person', PersonClone);
        SetLoading(true);
        POST_DangKyHienMau(PersonClone).then(rs => {
            SetLoading(false);
            Navigate('TraCuuThongTin/' + rs[0].Code)
        })
    }

    return (<>

      
            <Row>
                <Col sm={24}>
                    <ThongTinLanHien dtPerson={(dtPerson => { DataPersons(dtPerson) })} />
                </Col>
            </Row>
            <Row>

                <Col sm={24}>
                    <KhaoSatThongTinSucKhoe Value={(Value) => { DataProperties(Value) }} />
                </Col>
            </Row>
            <Row>
                <Col sm={24}>
                    <p style={{ fontSize: 12, fontWeight: 'bold', color: 'blue', fontStyle: 'italic' }}>Tôi đã hiểu đầy đủ trả lời trung thực những câu hỏi trên. Nếu tôi phát hiện ra bất cứ thông tin gì liên quan tới an toàn cho đơn vị máu tôi đã hiến tôi sẽ liên hệ ngay với {Config.Name} để đảm bảo an toàn cho người nhận máu của tôi. Hôm nay tôi hoàn toàn khỏe mạnh và sẵn sàng tham gia hiến máu tình nguyện. </p>
                </Col>
            </Row>
            <Row>
                <Col sm={18} />
                <Col sm={6}>
                    <Space direction="vertical">
                        {/* <small style={{ fontSize: 12, fontWeight: 'bold',textAlign:'center', fontStyle: 'italic' }}>Ngày {new Date().getDay()}/{new Date().getMonth()}/{new Date().getFullYear()}</small>
                            <small>Người hiến máu xác nhận</small> */}
                        <Button type='primary' onClick={Confirm} loading={IsLoadding}>Xác nhận thông tin</Button>
                    </Space>

                </Col>
            </Row>

       


    </>)
}
export default Index;