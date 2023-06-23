import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { Row, Col, Input, Alert, Modal, Card, Form, Button } from "antd";
import { Get_Token_Veryfy } from "../../Data/Api/Login";
import { useNavigate } from "react-router-dom";
import {
  GET_Person,
  PUT_PersonInfo,
  GET_PersonInfo,
} from "../../Data/Api/DangKyKham";
import TabThongtinKhaoSat from "../../Components/Tab.ThongTinKhaoSat";
import QuanLyThongTinLanHien from "../../Components/ComponentsGlobal/ThongTinLanHien/index";
import ThongTinTuaLaymau from "../../Components/ComponentsGlobal/ThongTinTuaLayMau/index";
import IconCombine from "../../Components/Icon";
import QRCam from "../../Components/QR.Camera";
import dayjs from "dayjs";

const { Search } = Input;
const Index = () => {
  const [from] = Form.useForm();
  const Navigate = useNavigate();
  const [IDPerson, SetIDPerson] = useState();
  const [OpenModal, SetOpenModal] = useState(false);
  const [HienThiThongTinTua, SetThongTinTua] = useState();
  const [DataPerson, SetDataPerson] = useState();
  useEffect(() => {
    if (
      localStorage.getItem("Token") === undefined ||
      localStorage.getItem("Token") === null ||
      localStorage.getItem("Token") === ""
    ) {
      Navigate("/login");
    } else {
      Get_Token_Veryfy()
        .then()
        .catch(() => {
          Navigate("/login");
        });
    }
  }, []);
  const FetchPeron = async (value) => {
    const pra = {
      text: value,
      row: 1,
    };
    await GET_PersonInfo(pra).then((rs) => {
      if (rs !== undefined && rs.length > 0) {
        rs[0].BirthDay = dayjs(rs[0].BirthDay);
        from?.setFieldsValue(rs[0]);
      }
    });
  };
  const GetQRCode = (pra) => {
    if (pra !== undefined && pra !== "") {
      GET_Person(pra).then((rs) => {
        SetDataPerson(rs[0]);
        SetThongTinTua(rs[0]?.ChoPhepHienMau);
        const PersonInfo = rs[0];
        PersonInfo["BirthDay"] = dayjs(PersonInfo["BirthDay"]);
        from?.setFieldsValue(PersonInfo);
        SetIDPerson(pra);
      });
    }
  };
  const EditPersonInfo = async () => {
    from.validateFields().then((rs) => {
      rs = { ...rs, RowID: IDPerson };
      PUT_PersonInfo(rs);
    });
  };
  const hideModal = () => {
    SetOpenModal(false);
  };
  const suffix = (
    <IconCombine.CameraOutlined
      onClick={() => {
        SetOpenModal(true);
      }}
    />
  );
  return (
    <>
      <Row>
        <Col sm={24}>
          <h2 style={{ textAlign: "center", color: "red" }}>
            THÔNG TIN LẦN HIẾN
          </h2>
        </Col>
      </Row>

      <Row>
        <Search
          placeholder="QR "
          onSearch={GetQRCode}
          suffix={suffix}
          enterButton
        />

        {DataPerson?.warning !== 0 &&
        DataPerson?.warning !== null &&
        DataPerson?.warning !== undefined ? (
          <Alert
            style={{ width: 100 + "%" }}
            banner
            message={
              <Marquee pauseOnHover gradient={false}>
                Người hiến có những triệu trứng sau cần chú ý
              </Marquee>
            }
          />
        ) : (
          ""
        )}
      </Row>
      <Card>
        <Row>
          <Col sm={24}>
            <Form form={from} layout="vertical">
              <QuanLyThongTinLanHien
                form={from}
                dtPerson={DataPerson}
                NotreadOnly={false}
              />
              <Form.Item>
                {DataPerson?.Sync !== "1"  && (
                  <Button
                    type="primary"
                    style={{ width: 100 + "%" }}
                    onClick={EditPersonInfo}
                    icon={
                      <IconCombine.CheckOutlined></IconCombine.CheckOutlined>
                    }>
                    Xác nhận thông tin
                  </Button>
                )}
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Card>
      <br></br>
      <Card>
        <Row>
          <Col sm={24}>
            <TabThongtinKhaoSat
              IDPerson={IDPerson}
              IsBloodDonation={SetThongTinTua}
              DataPerson={DataPerson}
            />
          </Col>
        </Row>
      </Card>

      <Card>
        <Row>
          <Col sm={24}>
            {HienThiThongTinTua && (
              <ThongTinTuaLaymau ID={IDPerson} dataPerson={DataPerson} />
            )}
          </Col>
        </Row>
      </Card>

      <Modal
        open={OpenModal}
        onOk={hideModal}
        onCancel={hideModal}
        title={"Quét QR"}
        okText="Lấy"
        cancelText="Tắt"
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}>
        {OpenModal && (
          <QRCam
            Value={(e) => {
              if (e != null && e != undefined) {
                GetQRCode(e);
                SetOpenModal(false);
              }
            }}
          />
        )}
      </Modal>
    </>
  );
};

export default Index;
