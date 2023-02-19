import { useEffect } from "react";
import { Row, Col, Input, Alert } from 'antd'
import Marquee from 'react-fast-marquee';
import { Get_Token_Veryfy } from '../../Data/Api/Login'
import { useNavigate } from "react-router-dom";
import QuanLyThongTinLanHien from '../../Components/ComponentsGlobal/ThongTinLanHien/index'
import TabThongtinKhaoSat from '../../Components/Tab.ThongTinKhaoSat'
const { Search } = Input;
const Index = () => {
    const Navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('Token') === undefined || localStorage.getItem('Token') === null || localStorage.getItem('Token') === '') {
            Navigate('/login')
        } else {
            Get_Token_Veryfy().then().catch(() => { Navigate('/login') })
        }
    }, [])
    return (<>
        <Row>
            <Col sm={24}>
                <h2 style={{ textAlign: 'center', color: 'red' }}>THÔNG TIN LẦN HIẾN</h2>
            </Col>
        </Row>
        <Row>
            <Col sm={12} xs={24}>
                <Search placeholder="QR " />
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
                <QuanLyThongTinLanHien></QuanLyThongTinLanHien>
            </Col>
        </Row>
        <Row>
            <Col sm={24}>
                <TabThongtinKhaoSat></TabThongtinKhaoSat>
            </Col>
        </Row>
    </>)

}

export default Index;