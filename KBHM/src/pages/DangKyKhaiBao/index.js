import  { useState } from "react";
import ThongTinLanHien from "../../Components/ComponentsGlobal/ThongTinLanHien/index";
import KhaoSatThongTinSucKhoe from "../../Components/ComponentsGlobal/KhaoSatThongTinSK/index";
import { Config } from "../../Data/Config/config.system";
import { POST_DangKyHienMau } from "../../Data/Api/DangKyKham";
import { Row, Col, Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { Warning } from "../../Components/notification";
const Index = () => {
  const Navigate = useNavigate();
  const [Persons, DataPersons] = useState();
  const [Properties, DataProperties] = useState();
  const [IsLoadding, SetLoading] = useState(false);
  const Confirm = () => {
    const PersonClone = Persons;
    PersonClone.personProperties = Properties;
    if (CheckCondition(PersonClone)) {
      SetLoading(true);
      POST_DangKyHienMau(PersonClone).then((rs) => {
        SetLoading(false);
        Navigate("TraCuuThongTin/" + rs[0].Code);
      });
    }
  };
  const CheckCondition = (PersonClone) => {
    const flag = true;
    const {
      Name,
      BirthDay,
      Sex,
      CCCD,
      Phone,
      DiaChiThuongLienLac_ChiTiet,
      DiaChiThuongTru_ChiTiet,
    } = PersonClone;

    const messengers = [
      { Value: Name, messenger: "Họ và tên" },
      { Value: BirthDay, messenger: "Ngày sinh" },
      { Value: Sex, messenger: "Giới tính" },
      { Value: CCCD, messenger: "Căn cước công dân" },
      { Value: Phone, messenger: "Số điện thoại" },
      { Value: DiaChiThuongLienLac_ChiTiet, messenger: "Địa chỉ liên lạc" },
      { Value: DiaChiThuongTru_ChiTiet, messenger: "Địa chỉ thường trú" },
    ];
    const mess = "Trường thông tin :";
    console.log(messengers);
    const ruler = messengers
      .filter((p) => p.Value === null || p.Value === '')
      .map(({ messenger }) => {
        return messenger;
      });

    if (ruler.length  > 0) {
      Warning({ message: `${mess} ${ruler.join(", ")} Chưa hợp lệ` });
      flag = false;
    }
    return flag;
  };
  return (
    <>
      <Row>
        <Col sm={24}>
          <h2 style={{ textAlign: "center", color: "red" }}>
            PHIẾU ĐĂNG KÝ HIẾN MÁU TÌNH NGUYỆN
          </h2>
        </Col>
      </Row>
      <Row>
        <Col sm={24}>
          <ThongTinLanHien
            ValuePerson={(ValuePerson) => {
              DataPersons(ValuePerson);
            }}
            NotreadOnly
          />
        </Col>
      </Row>
      <Row>
        <Col sm={24}>
          <KhaoSatThongTinSucKhoe
            Value={(Value) => {
              DataProperties(Value);
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={24}>
          <p
            style={{
              fontSize: 12,
              fontWeight: "bold",
              color: "blue",
              fontStyle: "italic",
            }}
          >
            Tôi đã hiểu đầy đủ trả lời trung thực những câu hỏi trên. Nếu tôi
            phát hiện ra bất cứ thông tin gì liên quan tới an toàn cho đơn vị
            máu tôi đã hiến tôi sẽ liên hệ ngay với {Config.Name} để đảm bảo an
            toàn cho người nhận máu của tôi. Hôm nay tôi hoàn toàn khỏe mạnh và
            sẵn sàng tham gia hiến máu tình nguyện.{" "}
          </p>
        </Col>
      </Row>
      <Row>
        <Col sm={18} />
        <Col sm={6}>
          <Space direction="vertical">
            {/* <small style={{ fontSize: 12, fontWeight: 'bold',textAlign:'center', fontStyle: 'italic' }}>Ngày {new Date().getDay()}/{new Date().getMonth()}/{new Date().getFullYear()}</small>
                            <small>Người hiến máu xác nhận</small> */}
            <Button type="primary" onClick={Confirm} loading={IsLoadding}>
              Xác nhận thông tin
            </Button>
          </Space>
        </Col>
      </Row>
    </>
  );
};
export default Index;
