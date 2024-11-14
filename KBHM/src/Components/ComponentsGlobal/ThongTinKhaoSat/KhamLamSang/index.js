import React, { useState, useEffect } from "react";
import { Row, Col, Form, Input, Radio, Space, Button, InputNumber, Select, Modal } from "antd";
import IconCombine from "../../../Icon";
import "../../index.css";
import { PUT_PersonInfo_healthy } from "../../../../Data/Api/DangKyKham";
import { Get_Doctor } from "../../../../Data/Api/Category";
import ElementCombobox from "../../Combobox/Element.combobox";
import { DateToStringDate } from "../../../../pages/QuanLyThongTin/helper";

const Index = ({ ID, dataPerson, IsDone, HienMau, funcReload, dataDelay, qualified, Category, setQualified, setNoteQualify, lastDonor }) => {
  const [doctors, setDoctors] = useState([]);
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(dataPerson);
  }, [dataPerson]);

  useEffect(() => {
    LoadCategory();
  }, []);
  const LoadCategory = async () => {
    const Data = await Get_Doctor();
    setDoctors(Data);
  };

  const Ruler = [
    {
      required: true,
      message: "Yêu cầu",
    },
  ];
  const [IsLoadding, SetIsloading] = useState(false);
  const PutPerson = async () => {
    form
      .validateFields()
      .then(async (rs) => {
        rs = { ...rs, RowID: ID };
        await PUT_PersonInfo_healthy(rs);
        SetIsloading(false);
        funcReload();
      })
      .catch((rs) => SetIsloading(false));
  };

  const CheckLastDonor = async (value) => {
    if (lastDonor) {
      const LastLoaiThanhPhan = lastDonor.LoaiHienThanhPhan;
      if (value != "141" && value != "142" && value != "6") {
        setQualified(true);
        setNoteQualify("");
      }
      if (LastLoaiThanhPhan == "141" || LastLoaiThanhPhan == "142") {
        if (value == "141" || value == "142" || value == "6") {
          if (!dataPerson.Sync) {
            const timeDifference = Math.abs(new Date() - new Date(lastDonor.NgayLayMau));
            const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
            if (dayDifference <= 14) {
              setQualified(false);
              setNoteQualify(`Người hiến đã hiến Tiểu cẩu máy vào ngày ${DateToStringDate(new Date(lastDonor.NgayLayMau))}, chưa đến ngày được phép hiến lại`);
              Modal.warning({
                title: "Cảnh báo",
                content: `Người hiến đã hiến Tiểu cẩu máy vào ngày ${DateToStringDate(new Date(lastDonor.NgayLayMau))}, chưa đến ngày được phép hiến lại`,
              });
            } else {
              setQualified(true);
              setNoteQualify("");
            }
          }
        } else {
          setQualified(true);
          setNoteQualify("");
        }
      }
      if (LastLoaiThanhPhan == "6") {
        if (value == "141" || value == "142" || value == "6") {
          if (!dataPerson.Sync) {
            const timeDifference = Math.abs(new Date() - new Date(lastDonor.NgayLayMau));
            const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
            if (dayDifference <= 84) {
              setQualified(false);
              setNoteQualify(`Người hiến đã hiến Máu toàn phần vào ngày ${DateToStringDate(new Date(lastDonor.NgayLayMau))}, chưa đến ngày được phép hiến lại`);
              Modal.warning({
                width: 870,
                title: "Cảnh báo",
                content: <p style={{ fontSize: 18 }}> Người hiến đã hiến Máu toàn phần vào ngày {DateToStringDate(new Date(lastDonor.NgayLayMau))}, chưa đến ngày được phép hiến lại</p>,
              });
            } else {
              setQualified(true);
              setNoteQualify("");
            }
          }
        } else {
          setQualified(true);
          setNoteQualify("");
        }
      }
    }
  };

  return (
    <React.Fragment>
      <Form labelCol={8} form={form} layout="vertical">
        <Row gutter={[12]}>
          <Col md={12} xs={24}>
            <Form.Item label="Cân nặng(KG)" name={"CanNang"}>
              <InputNumber placeholder="KG" style={{ width: 100 + "%" }} disabled={dataDelay}></InputNumber>
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item label="Chiều cao (Cm)" name={"ChieuCao"}>
              <InputNumber placeholder="Cm" style={{ width: 100 + "%" }} disabled={dataDelay}></InputNumber>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[12]}>
          <Col md={12} xs={24}>
            <Form.Item label="Mạch (Lần/Phút)" name={"Mach"}>
              <Input autoComplete="on" placeholder="Lần/1 Phút" style={{ width: 100 + "%" }} disabled={dataDelay}></Input>
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item label="Huyết áp(mmHg)" name={"HuyetAp"}>
              <Input disabled={dataDelay} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[12]}>
          <Col md={12} xs={24}>
            <Form.Item label="Tình trạng lâm sàng" name={"TinhTrangLamSang"}>
              <Input disabled={dataDelay} />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item label="Bác sĩ khám" name={"BacSiKham"} rules={Ruler}>
              <Select options={doctors} optionFilterProp="label" allowClear showSearch disabled={dataDelay} />
            </Form.Item>
          </Col>
        </Row>

        <h2>KẾT LUẬN:</h2>
        <Row>
          <Col md={12} xs={24}>
            <Form.Item name={"ChoPhepHienMau"} rules={Ruler}>
              <Radio.Group
                disabled={dataDelay}
                onChange={(e) => {
                  form.setFieldValue("ChoPhepHienMau", e.target.value);
                  HienMau(e.target.value);
                }}
              >
                <Space direction="vertical">
                  <Radio value={true}>Cho phép hiến</Radio>
                  {dataPerson?.Sync !== "1" && <Radio value={false}>Không cho phép hiến</Radio>}
                </Space>
              </Radio.Group>
            </Form.Item>
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
              onChange={(value) => {
                CheckLastDonor(value);
              }}
            />
          </Col>
          <Col md={12} xs={24}>
            <Form.Item label="Lượng máu có thể hiến " name={"LuongMauCoTheHien"}>
              <InputNumber placeholder="(ml)" style={{ width: 100 + "%" }} disabled={dataDelay} />
            </Form.Item>
            <Form.Item label="Tạm hoãn " name={"TamHoan"}>
              <InputNumber placeholder="Tuần" style={{ width: 100 + "%" }} disabled={dataDelay} />
            </Form.Item>
          </Col>
        </Row>

        {IsDone !== null && ID && dataPerson?.Sync !== "1" ? (
          <Button
            type="primary"
            style={{ width: 100 + "%", border: dataDelay ? "1px solid red" : "", color: dataDelay ? "red" : "white" }}
            loading={IsLoadding}
            onClick={PutPerson}
            className="btnFull"
            icon={dataDelay ? <IconCombine.CloseCircleOutlined /> : <IconCombine.CheckOutlined />}
            disabled={dataDelay || !qualified}
          >
            {dataDelay ? "Trì hoãn hiến máu" : "Xác nhận thông tin khám lâm sàng"}
          </Button>
        ) : (
          <> </>
        )}
      </Form>
    </React.Fragment>
  );
};
export default Index;
