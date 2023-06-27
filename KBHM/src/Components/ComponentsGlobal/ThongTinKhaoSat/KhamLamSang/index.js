import React, { useState, useEffect } from "react";
import { Row, Col, Form, Input, Radio, Space, Button, InputNumber } from "antd";
import IconCombine from "../../../Icon";
import "../../index.css";
import { PUT_PersonInfo_healthy } from "../../../../Data/Api/DangKyKham";

const Index = ({ ID, dataPerson, IsDone, HienMau, funcReload }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(dataPerson);
  }, [dataPerson]);
  const Ruler = [
    {
      required: true,
      message: "Yêu cầu",
    },
  ];
  const [IsLoadding, SetIsloading] = useState(false);
  const PutPerson = async () => {
    SetIsloading(true);
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
            <Form.Item label="Cân nặng(KG)" name={"CanNang"} rules={Ruler}>
              <InputNumber
                placeholder="KG"
                style={{ width: 100 + "%" }}></InputNumber>
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item label="Chiều cao (Cm)" name={"ChieuCao"} rules={Ruler}>
              <InputNumber
                placeholder="Cm"
                style={{ width: 100 + "%" }}></InputNumber>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[12]}>
          <Col md={12} xs={24}>
            <Form.Item label="Mạch (Lần/Phút)" name={"Mach"} rules={Ruler}>
              <InputNumber
                placeholder="Lần/1 Phút"
                style={{ width: 100 + "%" }}></InputNumber>
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item label="Huyết áp(mmHg)" name={"HuyetAp"} rules={Ruler}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[12]}>
          <Col md={24} xs={24}>
            <Form.Item
              label="Tình trạng lâm sàng"
              name={"TinhTrangLamSang"}
              rules={Ruler}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <h2>KẾT LUẬN:</h2>
        <Row>
          <Col md={12} xs={24}>
            <Form.Item name={"ChoPhepHienMau"} rules={Ruler}>
              <Radio.Group
                onChange={(e) => {
                  form.setFieldValue("ChoPhepHienMau", e.target.value);
                  HienMau(e.target.value);
                }}>
                <Space direction="vertical">
                  <Radio value={true}>Cho phép hiến máu</Radio>
                  {dataPerson?.Sync !== '1' && <Radio value={false}>Không cho phép hiến máu</Radio>}
                </Space>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item
              rules={Ruler}
              label="Lượng máu có thể hiến "
              name={"LuongMauCoTheHien"}>
              <InputNumber placeholder="(ml)" style={{ width: 100 + "%" }} />
            </Form.Item>
            <Form.Item label="Tạm hoãn " name={"TamHoan"}>
              <InputNumber rules={Ruler} placeholder="Tuần" style={{ width: 100 + "%" }} />
            </Form.Item>
          </Col>
        </Row>

        {IsDone !== null && ID && dataPerson?.Sync !== '1' ? (
          <Button
            type="primary"
            style={{ width: 100 + "%" }}
            loading={IsLoadding}
            onClick={PutPerson}
            className="btnFull"
            icon={<IconCombine.CheckOutlined />}>
            Xác nhận thông tin khám lâm sàng
          </Button>
        ) : (
          <> </>
        )}
      </Form>
    </React.Fragment>
  );
};
export default Index;
