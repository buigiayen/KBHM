import React from "react";
import ThongTinLanHien from '../../Components/ComponentsGlobal/ThongTinLanHien/index'
import KhaoSatThongTinSucKhoe from '../../Components/ComponentsGlobal/KhaoSatThongTinSK/index'
import { Config } from "../../Data/Config/config.system";
import { Row, Col, Button, Space } from "antd";
const Index = () => {
    return (<>
        <Row>
            <Col sm={5}> </Col>
            <Col sm={14}>
                <Row>
                    <Col sm={24}>
                        <h4 style={{ textAlign: 'center', color: 'red' }}>PHIẾU ĐĂNG KÝ HIẾN MÁU TÌNH NGUYỆN</h4>
                    </Col>
                </Row>
                <Row>

                    <Col sm={24}>
                        <ThongTinLanHien />
                    </Col>
                </Row>
                <Row>

                    <Col sm={24}>
                        <KhaoSatThongTinSucKhoe />
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
                            <Button type='primary'>Xác nhận thông tin</Button>
                        </Space>

                    </Col>
                </Row>

            </Col>

            <Col sm={5}>
            </Col>

        </Row>


    </>)
}
export default Index;