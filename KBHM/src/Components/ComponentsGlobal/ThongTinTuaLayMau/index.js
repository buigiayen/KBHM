import React, { useEffect, useState } from "react";
import IconCombine from "../../Icon";
import DateTime from "../../ComponentsGlobal/DateTime";
import { ExportDocumentFile } from "../PreviewDonnor/PDF.Viewer";
import ElementCombobox from "../Combobox/Element.combobox";
import TripCombobox from "../Combobox/Trip.combobox";
import BloodSourceCombobox from "../Combobox/BloodSource.combobox";
import { Divider, Form, Input, Row, Col, Checkbox, Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { Warning } from "../../notification";
import { Config } from "../../../Data/Config/config.system";
import { Get_Category } from "../../../Data/Api/Category";
import { PUT_PersonTrip, GET_DonorExCheck } from "../../../Data/Api/DangKyKham";
import "./index.css";
import { DateToStringDate } from "../../../pages/QuanLyThongTin/helper";

const Index = ({ funcReload, ID, dataPerson, lastDonor, setQualified, setNoteQualify, qualified, Category }) => {
  const navigator = useNavigate();
  const [form] = Form.useForm();
  const [Isload, SetIsLoad] = useState(false);
  const [IsDisable, SeIsDisable] = useState(false);
  const [isShowPDFViewer, SetisShowPDFViewer] = useState(false);
  const [DataReport, SetDataReport] = useState();
  const [ReportID, SetReportID] = useState(process.env.REACT_APP_DEFAULT_REPORT);

  useEffect(() => {
    form.setFieldsValue({ ...dataPerson, Tua: dataPerson.Tua || 1 });
  }, [dataPerson]);

  const Putperson = async ({ Sync }) => {
    form
      .validateFields()
      .then(async (rs) => {
        const { CheckDonnor } = await GET_DonorExCheck({
          DonorExCode: rs.MaTuiMau,
        });
        if (!CheckDonnor) {
          Warning({
            description: "Đã tồn tại túi máu trong hê thống ngân hàng máu. Xin sử dụng túi khác",
            message: "Cảnh báo",
          });
        } else {
          rs = {
            ...rs,
            RowID: ID,
            SyncData: Sync,
            NguoiLayMau: localStorage.getItem("UserID"),
          };
          await PUT_PersonTrip(rs);
          if (Sync === 3) {
            navigator("/DanhSachDangKyHienMau");
          } else {
            funcReload();
          }
        }
      })
      .catch((rs) => {
        console.log(rs);
      });
  };
  const GetdataReport = async () => {
    const data = await ExportDocumentFile({
      IDPerson: ID,
      Reportname: ReportID,
    });
  };

  return (
    <>
      <Divider orientation="left">
        <span style={{ color: "blue", fontStyle: "italic" }}>Thông tin tua lấy máu</span>
      </Divider>
      <Form labelCol={8} form={form}>
        <Row gutter={[12]}>
          <Col md={12} xs={24}>
            <DateTime Name={"DateRegister"} labelFrom="Ngày hiến" />
          </Col>
        </Row>
        <Row gutter={[12]}>
          <Col md={12} xs={24}>
            <ElementCombobox
              ruler={[
                {
                  required: true,
                  message: "Yêu cầu",
                },
              ]}
              dataSource={Category?.location}
              Name={"DiemLayMau"}
              Label="Điểm lấy máu"
            />
          </Col>
          <Col md={12} xs={24}>
            <Form.Item label="Địa chỉ">{Config.Region}</Form.Item>
          </Col>
        </Row>
        <Row gutter={[12]}>
          <Col md={12} xs={24}>
            <BloodSourceCombobox
              ruler={[
                {
                  required: true,
                  message: "Yêu cầu",
                },
              ]}
              dataSource={Category?.bloodSource}
              Name={"NguonHien"}
              Label="Nguồn hiến"
            />
          </Col>
          <Col md={12} xs={24}>
            <TripCombobox
              ruler={[
                {
                  required: true,
                  message: "Yêu cầu",
                },
              ]}
              dataSource={Category?.trip}
              Name={"Tua"}
              Label="Tua"
            />
          </Col>
        </Row>
        <Row gutter={[12]}>
          <Col md={12} xs={24}>
            <Form.Item
              label="Mã túi máu"
              name={"MaTuiMau"}
              rules={[
                {
                  required: true,
                  message: "Xin hãy nhập mã túi máu!",
                },
              ]}
            >
              <Input maxLength={10} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[8]}>
          {dataPerson?.Sync !== "3" && (
            <Button
              disabled={!qualified}
              icon={<IconCombine.PrinterOutlined></IconCombine.PrinterOutlined>}
              onClick={() => {
                GetdataReport();
              }}
            >
              In phiếu
            </Button>
          )}

          {dataPerson?.Sync !== "1" && dataPerson?.ChoPhepHienMau && qualified && (
            <>
              {dataPerson?.Sync !== "3" && (
                <Col sm={24} md={6}>
                  <Button
                    style={{ width: 100 + "%" }}
                    className="btnFull"
                    type="dashed"
                    onClick={() => Putperson({ Sync: 3 })}
                    danger
                    icon={<IconCombine.CloseCircleOutlined></IconCombine.CloseCircleOutlined>}
                  >
                    Hủy lấy máu
                  </Button>
                </Col>
              )}
              {dataPerson?.Sync !== "2" && qualified && (
                <Col sm={24} md={6}>
                  <Button
                    style={{ width: 100 + "%" }}
                    className="btnFull"
                    type="primary"
                    icon={<IconCombine.CheckOutlined></IconCombine.CheckOutlined>}
                    onClick={() => Putperson({ Sync: 2 })}
                    loading={Isload}
                    disabled={IsDisable}
                    htmlType="submit"
                  >
                    Lấy máu
                  </Button>
                </Col>
              )}
            </>
          )}
        </Row>
      </Form>
    </>
  );
};
export default Index;
