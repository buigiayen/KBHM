import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { Row, Col, Alert, Card, Form, Button } from "antd";
import { Get_Token_Veryfy } from "../../Data/Api/Login";
import { useNavigate, useParams } from "react-router-dom";
import { GET_DonorDelay, GET_LastDonor, GET_Person, GET_PersonDonateDelay, PUT_PersonInfo } from "../../Data/Api/DangKyKham";
import TabThongtinKhaoSat from "../../Components/Tab.ThongTinKhaoSat";
import HistoryDonnor from "../../Components/ComponentsGlobal/HistoryDonnor/index";
import QuanLyThongTinLanHien from "../../Components/ComponentsGlobal/ThongTinLanHien/index";
import ThongTinTuaLaymau from "../../Components/ComponentsGlobal/ThongTinTuaLayMau/index";
import IconCombine from "../../Components/Icon";

import dayjs from "dayjs";
import { ConvertDatetime } from "../../Data/UnitData/Convert.Properties";
import { TimeTriHoan, TimeTriHoanText } from "../../Data/UnitData/data";
import { DateToStringDate } from "./helper";
import { Get_Category } from "../../Data/Api/Category";

const Index = () => {
  const { ID } = useParams();
  const [from] = Form.useForm();
  const Navigate = useNavigate();
  const [IDPerson, SetIDPerson] = useState();
  const [HienThiThongTinTua, SetThongTinTua] = useState();
  const [DataPerson, SetDataPerson] = useState();
  const [dataDelay, setDataDelay] = useState(null);
  const [loadingDelay, setLoadingDelay] = useState(false);
  const [reason, setReason] = useState("");
  const [qualified, setQualified] = useState(true);
  const [noteQualify, setNoteQualify] = useState("");
  const [lastDonor, setLastDonor] = useState();
  const [Category, setCategory] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("Token") === undefined || localStorage.getItem("Token") === null || localStorage.getItem("Token") === "") {
      Navigate("/login");
    } else {
      Get_Token_Veryfy()
        .then()
        .catch(() => {
          Navigate("/login");
        });
    }
    FuncReload();
    GetCategory();
  }, []);
  const FuncReload = async () => {
    if (ID !== undefined) {
      GetQRCode(ID);
    }
  };

  const GetCategory = async () => {
    setCategory(await Get_Category());
  };

  const GetQRCode = (pra) => {
    if (pra !== undefined && pra !== "") {
      GET_Person(pra).then((rs) => {
        SetDataPerson(rs[0]);
        SetThongTinTua(rs[0]?.ChoPhepHienMau);
        const PersonInfo = rs[0];
        if (PersonInfo) {
          PersonInfo["BirthDay"] = dayjs(PersonInfo["BirthDay"]);
          PersonInfo["DateRegister"] = dayjs(PersonInfo["DateRegister"]);
          from?.setFieldsValue(PersonInfo);
        }

        SetIDPerson(pra);
      });
    }
  };

  const GetLastDonor = async (ID) => {
    await GET_LastDonor(ID).then((res) => {
      if (res.length > 0) {
        setLastDonor(res[0]);
      } else {
        setQualified(true);
        setNoteQualify("");
      }
    });
  };

  const renderToDate = (data) => {
    let text = "";
    if (data) {
      let toDate = new Date(data.DelayDate);
      if (data.DelayTimeline != TimeTriHoan.Forever && data.DelayTimeline != TimeTriHoan.Temporary) {
        text = "đến ngày ";
        switch (data.DelayTimeline) {
          case TimeTriHoan.Day:
            toDate.setDate(toDate.getDate() + data.DelayTime);
            text += DateToStringDate(toDate);
            break;
          case TimeTriHoan.Week:
            toDate.setDate(toDate.getDate() + data.DelayTime * 7);
            text += DateToStringDate(toDate);
            break;
          case TimeTriHoan.Month:
            toDate.setMonth(toDate.getMonth() + data.DelayTime);
            text += DateToStringDate(toDate);
            break;
          case TimeTriHoan.Year:
            toDate.setFullYear(toDate.getFullYear() + data.DelayTime);
            text += DateToStringDate(toDate);
            break;
        }
      }
    }
    return text;
  };

  const GetDataDelay = (ID) => {
    if (ID) {
      setLoadingDelay(true);
      GET_PersonDonateDelay(ID).then((res) => {
        if (res?.length > 0) {
          res[0].DelayDate = dayjs(res[0].DelayDate);
          setDataDelay(res[0]);
          let newReason = `Người hiến máu từng bi trì hoãn ${res[0].DelayTime || ""} ${TimeTriHoanText[res[0].DelayTimeline]} từ ngày ${DateToStringDate(new Date(res[0].DelayDate))} ${renderToDate(
            res[0]
          )} do nguyên nhân `;
          if (res[0].HIV_Infection) {
            newReason += "HIV, ";
          }
          if (res[0].HCV_Infection) {
            newReason += "HCV, ";
          }
          if (res[0].HBV_Infection) {
            newReason += "HBV, ";
          }
          if (res[0].VDRL_Infection) {
            newReason += "VDRL, ";
          }
          if (res[0].AIDS_Risk) {
            newReason += "Mắc bệnh AIDS, ";
          }
          if (res[0].Liver_Risk) {
            newReason += "Viêm gan, ";
          }
          if (res[0].Tattoo) {
            newReason += "Hình xăm, xỏ khuyên, ";
          }
          if (res[0].CJD) {
            newReason += "CJD, ";
          }
          if (res[0].Hormon) {
            newReason += "Sử dụng Hormon, ";
          }
          if (res[0].Weight) {
            newReason += "Cân nặng, ";
          }
          if (res[0].BloodPressure) {
            newReason += "Huyết áp, ";
          }
          if (res[0].Pulse) {
            newReason += "Mạch, ";
          }
          if (res[0].Temperature) {
            newReason += "Nhiệt độ, ";
          }
          if (res[0].Hb) {
            newReason += "Hb, ";
          }
          if (res[0].HealthHistory) {
            newReason += "Tiền sử sức khỏe, ";
          }
          if (res[0].HealthHistoryDetail) {
            newReason += `${res[0].HealthHistoryDetail}, `;
          }
          if (res[0].MCV) {
            newReason += "MCV, ";
          }
          if (res[0].HCT) {
            newReason += "HCT, ";
          }
          if (res[0].WhiteBloodCellQuantity) {
            newReason += "Số lượng bạch cầu, ";
          }
          if (res[0].SmallVen) {
            newReason += "Ven nhỏ, ";
          }
          if (res[0].PlateletQuantity) {
            newReason += "Số lượng tiểu cầu, ";
          }
          if (res[0].TimeBloodDonorsReiterated) {
            newReason += "Thời gian hiến mắu nhắc lại, ";
          }
          if (res[0].HbsAg) {
            newReason += "HbsAg (Test nhanh), ";
          }
          if (res[0].Other) {
            newReason += `${res[0].Other}, `;
          }
          if (res[0].HIV_Positive) {
            newReason += "HIV, ";
          }
          if (res[0].HCV_Positive) {
            newReason += "HCV, ";
          }
          if (res[0].HBV_Positive) {
            newReason += "HBV, ";
          }
          if (res[0].VDRL_Positive) {
            newReason += "VDRL, ";
          }
          if (res[0].CoombsTT_Positive) {
            newReason += "Coombs TT, ";
          }
          if (res[0].KTBT_Positive) {
            newReason += "KTBT, ";
          }
          if (res[0].HIV_Infection) {
            newReason += "HBsAg_Positive, ";
          }
          if (res[0].ABO_Undetermined) {
            newReason += "ABO, ";
          }
          if (res[0].Rh_Undetermined) {
            newReason += "RH, ";
          }

          setReason(newReason);
        } else {
          GET_DonorDelay(ID).then((resp) => {
            const response = JSON.parse(resp);
            if (response.length > 0) {
              response[0].DelayDate = dayjs(response[0].DelayDate);
              setDataDelay(response[0]);
              let newReason = `Trì hoãn ${response[0].DelayTime || ""} ${TimeTriHoanText[response[0].DelayTimeline]} với lý do `;
              if (response[0].HIV_Infection) {
                newReason += "HIV, ";
              }
              if (response[0].HCV_Infection) {
                newReason += "HCV, ";
              }
              if (response[0].HBV_Infection) {
                newReason += "HBV, ";
              }
              if (response[0].VDRL_Infection) {
                newReason += "VDRL, ";
              }
              if (response[0].AIDS_Risk) {
                newReason += "Mắc bệnh AIDS, ";
              }
              if (response[0].Liver_Risk) {
                newReason += "Viêm gan, ";
              }
              if (response[0].Tattoo) {
                newReason += "Hình xăm, xỏ khuyên, ";
              }
              if (response[0].CJD) {
                newReason += "CJD, ";
              }
              if (response[0].Hormon) {
                newReason += "Sử dụng Hormon, ";
              }
              if (response[0].Weight) {
                newReason += "Cân nặng, ";
              }
              if (response[0].BloodPressure) {
                newReason += "Huyết áp, ";
              }
              if (response[0].Pulse) {
                newReason += "Mạch, ";
              }
              if (response[0].Temperature) {
                newReason += "Nhiệt độ, ";
              }
              if (response[0].Hb) {
                newReason += "Hb, ";
              }
              if (response[0].HealthHistory) {
                newReason += "Tiền sử sức khỏe, ";
              }
              if (response[0].HealthHistoryDetail) {
                newReason += `${response[0].HealthHistoryDetail}, `;
              }
              if (response[0].MCV) {
                newReason += "MCV, ";
              }
              if (response[0].HCT) {
                newReason += "HCT, ";
              }
              if (response[0].WhiteBloodCellQuantity) {
                newReason += "Số lượng bạch cầu, ";
              }
              if (response[0].SmallVen) {
                newReason += "Ven nhỏ, ";
              }
              if (response[0].PlateletQuantity) {
                newReason += "Số lượng tiểu cầu, ";
              }
              if (response[0].TimeBloodDonorsReiterated) {
                newReason += "Thời gian hiến mắu nhắc lại, ";
              }
              if (response[0].HbsAg) {
                newReason += "HbsAg (Test nhanh), ";
              }
              if (response[0].Other) {
                newReason += `${response[0].Other}, `;
              }
              if (response[0].HIV_Positive) {
                newReason += "HIV, ";
              }
              if (response[0].HCV_Positive) {
                newReason += "HCV, ";
              }
              if (response[0].HBV_Positive) {
                newReason += "HBV, ";
              }
              if (response[0].VDRL_Positive) {
                newReason += "VDRL, ";
              }
              if (response[0].CoombsTT_Positive) {
                newReason += "Coombs TT, ";
              }
              if (response[0].KTBT_Positive) {
                newReason += "KTBT, ";
              }
              if (response[0].HIV_Infection) {
                newReason += "HBsAg_Positive, ";
              }
              if (response[0].ABO_Undetermined) {
                newReason += "ABO, ";
              }
              if (response[0].Rh_Undetermined) {
                newReason += "RH, ";
              }
              setReason(newReason);
            } else {
              setDataDelay(null);
            }
          });
        }
        setLoadingDelay(false);
      });
    }
  };

  const EditPersonInfo = async () => {
    from.validateFields().then((rs) => {
      rs = {
        ...rs,
        RowID: IDPerson,
        BirthDay: ConvertDatetime({ DateTime: rs?.BirthDay }),
      };
      PUT_PersonInfo(rs);
    });
  };

  useEffect(() => {
    if (DataPerson?.CCCD) {
      GetLastDonor(DataPerson.CCCD);
      GetDataDelay(DataPerson.CCCD);
    }
  }, [DataPerson]);

  return (
    <>
      <Row>
        <Col sm={24}>
          <h2 style={{ textAlign: "center", color: "red" }}>THÔNG TIN LẦN HIẾN</h2>
        </Col>
      </Row>

      <Row>
        <Button
          type="link"
          style={{ width: 100 + "%" }}
          onClick={() => {
            Navigate("/DanhSachDangKyHienMau");
          }}
        >
          Danh sách hiến máu
        </Button>

        {DataPerson?.warning !== 0 && DataPerson?.warning !== null && DataPerson?.warning !== undefined ? (
          <Alert
            style={{ width: 100 + "%" }}
            banner
            message={
              <Marquee pauseOnHover gradient={false} style={{ fontWeight: "bold", fontSize: 16 }}>
                Người hiến có những triệu chứng sau cần chú ý
              </Marquee>
            }
          />
        ) : (
          ""
        )}
        {qualified == false && <Alert style={{ width: "100%" }} banner message={<div style={{ fontWeight: "bold", fontSize: 16 }}>{noteQualify}</div>} />}
        {dataDelay && <Alert style={{ width: "100%" }} banner message={<div style={{ fontWeight: "bold", color: "red", fontSize: 18 }}>{reason}</div>} />}
      </Row>
      <Card>
        <Row>
          <Col sm={24}>
            <Form form={from} layout="vertical">
              <QuanLyThongTinLanHien form={from} />
              <Form.Item>
                {DataPerson?.Sync !== "1" && DataPerson && (
                  <Button type="primary" style={{ width: 100 + "%" }} onClick={() => EditPersonInfo()} icon={<IconCombine.CheckOutlined></IconCombine.CheckOutlined>}>
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
            <HistoryDonnor Identity={DataPerson?.CCCD} DefaultKey={"0"}></HistoryDonnor>
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
              dataDelay={dataDelay}
              loadingDelay={loadingDelay}
              GetDataDelay={GetDataDelay}
              qualified={qualified}
              Category={Category}
              setQualified={setQualified}
              setNoteQualify={setNoteQualify}
              lastDonor={lastDonor}
            />
          </Col>
        </Row>
      </Card>

      <Card>
        <Row>
          <Col sm={24}>
            {HienThiThongTinTua && (
              <ThongTinTuaLaymau
                funcReload={FuncReload}
                ID={IDPerson}
                dataPerson={DataPerson}
                lastDonor={lastDonor}
                setQualified={setQualified}
                setNoteQualify={setNoteQualify}
                qualified={qualified}
                Category={Category}
              />
            )}
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default Index;
