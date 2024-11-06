import React, { useState, useEffect } from "react";
import { Row, Col, Form, Input, Radio, Space, Button, InputNumber, Select } from "antd";
import IconCombine from "../../../Icon";
import "../../index.css";
import { PUT_PersonInfo_healthy } from "../../../../Data/Api/DangKyKham";
import { Get_Doctor } from "../../../../Data/Api/Category";

const Index = ({ ID, dataPerson, IsDone, HienMau, funcReload, dataDelay, qualified }) => {
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
                  <Radio value={true}>Cho phép hiến máu</Radio>
                  {dataPerson?.Sync !== "1" && <Radio value={false}>Không cho phép hiến máu</Radio>}
                </Space>
              </Radio.Group>
            </Form.Item>
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
