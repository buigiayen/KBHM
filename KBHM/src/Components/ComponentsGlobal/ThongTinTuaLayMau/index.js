import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Divider, Form, Input, Row, Col, Checkbox, Button } from "antd";
import { Warning } from "../../notification";
import { Await, useNavigate } from "react-router-dom";
import btoa from "btoa";
import ElementCombobox from "../Element.combobox";
import IconCombine from "../../Icon";
import DateTime from "../../ComponentsGlobal/DateTime";
import PDfViewer from '../../Modal.pdf'
import { Config } from "../../../Data/Config/config.system";
import { PUT_PersonTrip, GET_DonorExCheck, GET_PropertiesPerson, GET_Person } from "../../../Data/Api/DangKyKham";
import { Get_Category } from "../../../Data/Api/Category";
import { Post_CreateReport } from "../../../Data/Api/Report";

import "./index.css";

const Index = ({ funcReload, ID, dataPerson }) => {
  const navigator = useNavigate();
  const [form] = Form.useForm();
  const [Isload, SetIsLoad] = useState(false);
  const [IsDisable, SeIsDisable] = useState(false);
  const [Category, setCategory] = useState([]);
  const [DataPDf, SetDataPDF] = useState(null);
  const [isShowPDFViewer, SetisShowPDFViewer] = useState(false)
  useEffect(() => {
    form.setFieldsValue(dataPerson);
    GetCategory();
  }, [dataPerson]);
  const GetCategory = async () => {
    setCategory(await Get_Category());
  };
  const Putperson = async ({ Sync }) => {
    form
      .validateFields()
      .then(async (rs) => {
        const { CheckDonnor } = await GET_DonorExCheck({
          DonorExCode: rs.MaTuiMau,
        });
        if (!CheckDonnor) {
          Warning({
            description:
              "Đã tồn tại túi máu trong hê thống ngân hàng máu. Xin sử dụng túi khác",
            message: "Cảnh báo",
          });
        } else {
          rs = { ...rs, RowID: ID, SyncData: Sync };
          await PUT_PersonTrip(rs);
          if (Sync === 3) {
            navigator('/DanhSachDangKyHienMau')
          } else {
            funcReload();
          }

        }
      })
      .catch((rs) => {
        console.log(rs);
      });
  };

  const ExportDocumentFile = async () => {
    const PersonInfo = await GET_Person(ID);
    const PersonProperties = await GET_PropertiesPerson(ID)
    const resultProperties = PersonProperties.reduce((acc, rs) => {
      acc[rs.Key] = rs.value;
      return acc;
    }, {});

    const combinedObject = []
    combinedObject.push({ ...PersonInfo[0], ...resultProperties });
    let objJsonStr = JSON.stringify(combinedObject);

    var data = await Post_CreateReport({ reportName: 'Rp_dkhienmau', dataReport: objJsonStr })
   
    base64toBlob({DataPDF : data?.data});
    SetisShowPDFViewer(true)
  }

  const base64toBlob = ({DataPDF}) => {
    console.log(DataPDF);
    if (DataPDF) {
      const base64WithoutPrefix = DataPDF;
      const bytes = atob(base64WithoutPrefix);
      let length = bytes.length;
      let out = new Uint8Array(length);

      while (length--) {
        out[length] = bytes.charCodeAt(length);
      }

      const blob = new Blob([out], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      SetDataPDF(url)
    } else {
      return "";
    }
  };
  return (
    <>
      <Divider orientation="left">
        <span style={{ color: "blue", fontStyle: "italic" }}>
          Thông tin tua lấy máu
        </span>
      </Divider>
      <Form labelCol={8} form={form}>
        <Row gutter={[12]}>
          <Col md={12} xs={24}>
            <Form.Item
              name={"NgayHien"}
              initialValue={dayjs()}
              label="Ngày hiến">
              <DateTime />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <ElementCombobox
              ruler={[
                {
                  required: true,
                  message: "Yêu cầu",
                },
              ]}
              dataSource={Category?.element}
              Name={"LoaiHienThanhPhan"}
              Label="Hiến loại thành phần"
            />
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
            <Form.Item label="In phiếu ĐKHM khi cấp mã túi máu">
              <Checkbox value={true} />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item
              label="Mã túi máu"
              name={"MaTuiMau"}
              rules={[
                {
                  required: true,
                  message: "Xin hãy nhập mã túi máu!",
                },
              ]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[8]}>
          <Col md={6} xs={24}>
            {
              dataPerson?.Sync === "1" && <Button
                onClick={ExportDocumentFile}
                className="btnFull"
                icon={<IconCombine.FileOutlined></IconCombine.FileOutlined>}>
                In phiếu ĐKHM
              </Button>
            }

          </Col>
          <Col md={6} xs={24}></Col>
          {dataPerson?.Sync !== "1" && dataPerson?.ChoPhepHienMau && (
            <>
              {dataPerson?.Sync !== "3" && (
                <Col md={6} xs={24}>
                  <Button
                    className="btnFull"
                    type="dashed"
                    onClick={() => Putperson({ Sync: 3 })}
                    danger
                    icon={
                      <IconCombine.CloseCircleOutlined></IconCombine.CloseCircleOutlined>
                    }>
                    Hủy lấy máu
                  </Button>
                </Col>
              )}
              {dataPerson?.Sync !== "2" && (
                <Col md={6} xs={24}>
                  <Button
                    className="btnFull"
                    type="primary"
                    icon={<IconCombine.CheckOutlined></IconCombine.CheckOutlined>}
                    onClick={() => Putperson({ Sync: 2 })}
                    loading={Isload}
                    disabled={IsDisable}
                    htmlType="submit">
                    Lấy máu
                  </Button>
                </Col>
              )}

            </>
          )}
        </Row>
      </Form>

      <PDfViewer Open={isShowPDFViewer} onCancel={() => { SetisShowPDFViewer(false) }} urlPDF={DataPDf} />
    </>
  );
};
export default Index;
