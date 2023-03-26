import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { Row, Col, Input, Alert, Modal, Card } from "antd";

import { Get_Token_Veryfy } from "../../Data/Api/Login";
import { useNavigate } from "react-router-dom";
import { GET_Person } from "../../Data/Api/DangKyKham";
import TabThongtinKhaoSat from "../../Components/Tab.ThongTinKhaoSat";
import QuanLyThongTinLanHien from "../../Components/ComponentsGlobal/ThongTinLanHien/index";
import ThongTinTuaLaymau from "../../Components/ComponentsGlobal/ThongTinTuaLayMau/index";
import IconCombine from "../../Components/Icon";
import QRCam from "../../Components/QR.Camera";

const { Search } = Input;
const Index = () => {
  const Navigate = useNavigate();
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

  const GetQRCode = (pra) => {
    if (pra !== undefined && pra !== "") {
      GET_Person(pra).then((rs) => {
        SetDataPerson(rs[0]);
        SetThongTinTua(rs[0]?.ChoPhepHienMau);
      });
    }
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
        <Col sm={12} xs={24}>
          <Search
            placeholder="QR "
            onSearch={GetQRCode}
            suffix={suffix}
            enterButton
          />
        </Col>
        <Col sm={12} xs={24}>
          {DataPerson?.warning !== 0 &&
            DataPerson?.warning !== null &&
            DataPerson?.warning !== undefined ? (
            <Alert
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
        </Col>
      </Row>
      <Card>
        <Row>
          <Col sm={24}>
            <QuanLyThongTinLanHien
              dtPerson={DataPerson}
              NotreadOnly={false}
            />
          </Col>
        </Row>
      </Card>
        <br></br>
      <Card>
        <Row>
          <Col sm={24}>
            <TabThongtinKhaoSat
              ID={DataPerson?.RowID}
              SetChoPhepHienMau={(e) => {
                SetThongTinTua(e);
              }}
              dataPerson={DataPerson}
              HienThiThongTinTua={HienThiThongTinTua}
            />
          </Col>
        </Row>
      </Card>
    
      <Card>
        <Row>
          <Col sm={24}>
            {HienThiThongTinTua && (
              <ThongTinTuaLaymau
                ID={DataPerson?.RowID}
                dataPerson={DataPerson}
              ></ThongTinTuaLaymau>
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
        okButtonProps={{ style: { display: "none" } }}
      >
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
