import { useEffect } from "react";
import { useState } from "react";
import { Row, Col, Input, Alert } from 'antd'
import Marquee from 'react-fast-marquee';
import { Get_Token_Veryfy } from '../../Data/Api/Login'
import { useNavigate } from "react-router-dom";
import { GET_Person } from '../../Data/Api/DangKyKham'
import TabThongtinKhaoSat from '../../Components/Tab.ThongTinKhaoSat'
import QuanLyThongTinLanHien from '../../Components/ComponentsGlobal/ThongTinLanHien/index'
import ThongTinTuaLaymau from '../../Components/ComponentsGlobal/ThongTinTuaLayMau/index'
const { Search } = Input;
const Index = () => {
    const Navigate = useNavigate();
    const [HienThiThongTinTua, SetThongTinTua] = useState();
    const [DataPerson, SetDataPerson] = useState();
    useEffect(() => {
        if (localStorage.getItem('Token') === undefined || localStorage.getItem('Token') === null || localStorage.getItem('Token') === '') {
            Navigate('/login')
        } else {
            Get_Token_Veryfy().then().catch(() => { Navigate('/login') })
        }

    }, [])

    const GetQRCode = (pra) => {

        GET_Person(pra).then(rs => {
            SetDataPerson(rs[0]);
        })
    }

    return (<>
        <Row>
            <Col sm={24}>
                <h2 style={{ textAlign: 'center', color: 'red' }}>THÔNG TIN LẦN HIẾN</h2>
            </Col>
        </Row>
        <Row>
            <Col sm={12} xs={24}>
                <Search placeholder="QR " onSearch={GetQRCode} enterButton />
            </Col>
            <Col sm={12} xs={24}>
                <Alert
                    banner
                    message={
                        <Marquee pauseOnHover gradient={false}>
                            Người hiến có những triệu trứng sau cần chú ý
                        </Marquee>
                    }
                />
            </Col>
        </Row>

        <Row>
            <Col sm={24}>
                <QuanLyThongTinLanHien dtPerson={DataPerson} NotreadOnly={false}></QuanLyThongTinLanHien>
            </Col>
        </Row>
        <Row>
            <Col sm={24}>
                <TabThongtinKhaoSat ID={DataPerson?.RowID} SetChoPhepHienMau={(SetChoPhepHienMau) => { SetThongTinTua(SetChoPhepHienMau) }}></TabThongtinKhaoSat>
            </Col>
        </Row>
        <Row>
            <Col sm={24}>
                {HienThiThongTinTua && <ThongTinTuaLaymau ID={DataPerson?.RowID}></ThongTinTuaLaymau>}
            </Col>
        </Row>
    </>)

}

export default Index;