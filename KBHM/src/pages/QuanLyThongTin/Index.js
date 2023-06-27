import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { Row, Col, Alert,  Card, Form, Button } from "antd";
import { Get_Token_Veryfy } from "../../Data/Api/Login";
import { useNavigate, useParams } from "react-router-dom";
import {
  GET_Person,
  PUT_PersonInfo,

} from "../../Data/Api/DangKyKham";
import TabThongtinKhaoSat from "../../Components/Tab.ThongTinKhaoSat";
import QuanLyThongTinLanHien from "../../Components/ComponentsGlobal/ThongTinLanHien/index";
import ThongTinTuaLaymau from "../../Components/ComponentsGlobal/ThongTinTuaLayMau/index";
import IconCombine from "../../Components/Icon";

import dayjs from "dayjs";


const Index = () => {
  const { ID } = useParams();
  const [from] = Form.useForm();
  const Navigate = useNavigate();
  const [IDPerson, SetIDPerson] = useState();

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
    FuncReload();

  }, []);
  const FuncReload = async () => {
    if (ID !== undefined) {
      GetQRCode(ID)
    }
  }

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
        <Button type='link' style={{ width: 100 + '%' }} onClick={() => { Navigate('/DanhSachDangKyHienMau') }}>
          Danh sách hiến máu
        </Button>
       

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
                {DataPerson?.Sync !== "1" && DataPerson && (
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
              funcReload={FuncReload}
            />
          </Col>
        </Row>
      </Card>

      <Card>
        <Row>
          <Col sm={24}>
            {HienThiThongTinTua && (
              <ThongTinTuaLaymau funcReload={FuncReload} ID={IDPerson} dataPerson={DataPerson} />
            )}
          </Col>
        </Row>
      </Card>

    
    </>
  );
};

export default Index;
