import { useEffect, useState } from "react";
import ThongTinLanHien from "../../Components/ComponentsGlobal/ThongTinLanHien/index";
import KhaoSatThongTinSucKhoe from "../../Components/ComponentsGlobal/KhaoSatThongTinSK/index";
import { Config } from "../../Data/Config/config.system";
import { GET_CheckDonorDelay, POST_DangKyHienMau } from "../../Data/Api/DangKyKham";
import { Button, Space, Card, Form, Result, message, Alert } from "antd";
import { Row, Col } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Warning } from "../../Components/notification";
import { GET_PersonInfo } from "../../Data/Api/DangKyKham";
import dayjs from "dayjs";
import moment from "moment";
import { ConvertDatetime } from "../../Data/UnitData/Convert.Properties";
import Paragraph from "antd/es/skeleton/Paragraph";

const Index = () => {
  const { IDDiemHien, TimeChecking, TimeIn } = useParams();
  const [form] = Form.useForm();
  const Navigate = useNavigate();
  const [Persons, DataPersons] = useState();
  const [Properties, DataProperties] = useState();
  const [IsLoadding, SetLoading] = useState(false);
  const [expiredQR, setExpiredQR] = useState(false);
  let Person = {
    Name: String,
    BirthDay: Date,
    Sex: Number,
    CCCD: String,
    NoiCapCCCD: String,
    Phone: String,
    Email: String,
    NgheNghiep: String,
    DiaChiCoQuan: String,
    DiaChiThuongTru: String,
    DiaChiThuongTru_ChiTiet: String,
    DiaChiLienLac: String,
    CheckNhuDiaChiThuongTru: Boolean,
    DiaChiThuongLienLac_ChiTiet: String,
    UrlImage: String,
    PersonProperties: [],
  };

  useEffect(() => {
    if (TimeIn) {
      const parsedTimeIn = dayjs(Number(TimeIn));
      const formattedDate = parsedTimeIn.format("YYYY-MM-DD");
      if (formattedDate) {
        const now = new Date();
        const timeDifference = now - new Date(formattedDate);
        const differenceInDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) - 1;
        if (differenceInDays > 15) {
          setExpiredQR(true);
        }
      }
    }
  }, []);

  const CheckAge = (dateofbirth, AgeMin) => {
    return dayjs().$y - dayjs(dateofbirth).$y >= AgeMin;
  };
  const FetchPeron = async (value) => {
    const { CheckDonnor } = await GET_CheckDonorDelay({ CCCD: value });
    if (CheckDonnor) {
      Warning({ message: <div style={{ fontWeight: "bold", fontSize: 16 }}>Người hiến bị trì hoãn hiến máu vĩnh viễn!</div> });
      return;
    } else {
      const pra = {
        text: value,
        row: 1,
      };
      await GET_PersonInfo(pra).then((rs) => {
        if (rs !== undefined && rs.length > 0) {
          rs[0].BirthDay = dayjs(rs[0].BirthDay);
          form?.setFieldsValue(rs[0]);
          DataPersons(rs[0]);
        }
      });
    }
  };
  const Confirm = async () => {
    if (await CheckCondition()) {
      form
        .validateFields()
        .then((RS) => {
          const BirthDay = ConvertDatetime({ DateTime: RS?.BirthDay });
          Person = {
            Name: RS?.Name,
            BirthDay: BirthDay,
            Sex: RS?.Sex,
            CCCD: RS?.CCCD,
            NoiCapCCCD: RS?.NoiCapCCCD,
            Phone: RS?.Phone,
            Email: RS?.Email,
            NgheNghiep: RS?.NgheNghiep,
            DiaChiCoQuan: RS?.DiaChiCoQuan,
            DiaChiThuongTru: RS?.DiaChiThuongTru,
            DiaChiThuongTru_ChiTiet: RS?.DiaChiThuongTru_ChiTiet,
            UrlImage: RS?.UrlImage,
            DiaChiLienLac: RS?.CheckNhuDiaChiThuongTru ? RS?.DiaChiThuongTru : RS?.DiaChiLienLac,
            DiaChiThuongLienLac_ChiTiet: RS?.CheckNhuDiaChiThuongTru ? RS?.DiaChiThuongTru_ChiTiet : RS?.DiaChiThuongLienLac_ChiTiet,
            PersonProperties: Properties.sort((a, b) => a.key - b.key),
            DiemLayMau: IDDiemHien,
            DateRegister: TimeChecking === undefined ? null : dayjs(Number(TimeChecking)).format(),
          };
          POST_DangKyHienMau(Person).then((rs) => {
            Navigate("/TraCuuThongTin/" + rs[0].Code);
          });
        })
        .catch((info) => {
          console.log(info);
          Warning({
            message: `Xin hãy trả lời các câu hỏi trong mục khảo sát`,
          });
        });
    }
  };
  const CheckCondition = async () => {
    let flag = true;
    if (Properties === undefined || Properties.length < 21) {
      Warning({ message: <div style={{ fontWeight: "bold", fontSize: 16 }}>Xin hãy trả lời các câu hỏi trong mục khảo sát</div> });
      flag = false;
    }
    if (CheckAge(dayjs(form.getFieldValue("BirthDay")), 18) === false) {
      Warning({ message: <div style={{ fontWeight: "bold", fontSize: 16 }}>Bạn chưa đủ 18 tuổi để hiến máu!</div> });
      flag = false;
    }
    const { CheckDonnor } = await GET_CheckDonorDelay({ CCCD: form.getFieldValue("CCCD") });
    if (CheckDonnor) {
      Warning({ message: <div style={{ fontWeight: "bold", fontSize: 16 }}>Người hiến bị trì hoãn hiến máu vĩnh viễn!</div> });
      flag = false;
    }
    if (
      (CheckAge(dayjs(form.getFieldValue("BirthDay")), 56) === true && form.getFieldValue("Sex") == 0) ||
      (CheckAge(dayjs(form.getFieldValue("BirthDay")), 61) === true && form.getFieldValue("Sex") == 1)
    ) {
      Warning({ message: <div style={{ fontWeight: "bold", fontSize: 16 }}>Bạn đã quá tuổi để hiến máu!</div> });
      flag = false;
    }

    return flag;
  };
  return (
    <>
      {!expiredQR ? (
        <>
          <Row>
            <Col xl={24}>
              <h3 style={{ textAlign: "center", color: "red" }}>PHIẾU ĐĂNG KÝ HIẾN MÁU TÌNH NGUYỆN</h3>
            </Col>
          </Row>
          <Row>
            <Col sm={12} lg={12} md={12}>
              <Card>
                <Form form={form} layout="vertical">
                  <ThongTinLanHien
                    from={form}
                    ValuePerson={Persons}
                    FetchPerson={FetchPeron}
                    ImagePicture={Persons?.UrlImage}
                    GetBirthDay={(e) => {
                      form.setFieldValue({ SN: e });
                    }}
                  />
                </Form>
              </Card>
            </Col>
          </Row>
          <br />
          <Row>
            <Col sm={24}>
              <KhaoSatThongTinSucKhoe Value={DataProperties} Persons={Persons} />
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
                Tôi đã hiểu đầy đủ trả lời trung thực những câu hỏi trên. Nếu tôi phát hiện ra bất cứ thông tin gì liên quan tới an toàn cho đơn vị máu tôi đã hiến tôi sẽ liên hệ ngay với{" "}
                {Config.Name} để đảm bảo an toàn cho người nhận máu của tôi. Hôm nay tôi hoàn toàn khỏe mạnh và sẵn sàng tham gia hiến máu tình nguyện.{" "}
              </p>
            </Col>
          </Row>
          <Row>
            <Col lg={4}></Col>
            <Col lg={4} xs={12} sm={12}>
              <Button type="primary" onClick={Confirm} loading={IsLoadding} style={{ width: 100 + "%" }}>
                Xác nhận thông tin
              </Button>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Result status="error" title="Mã QR đã hết hạn" extra={[]}></Result>
        </>
      )}
    </>
  );
};
export default Index;
