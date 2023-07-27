import React from "react";
import { Row, Col, Form, Input, Button } from "antd";
import ElementCombobox from "../../Combobox/Element.combobox";
import "../../index.css";
import { useState } from "react";
import { useEffect } from "react";
import {
  PUT_PersonDone,
  POST_SyncDonor,
} from "../../../../Data/Api/DangKyKham";
import { Get_Category } from "../../../../Data/Api/Category";
const Index = ({ ID, dataPerson, FuncReload }) => {
  const [from] = Form.useForm();
  const [Category, SetCategory] = useState([]);
  
  useEffect(() => {
    from.setFieldsValue(dataPerson);
  }, [dataPerson]);
  useEffect(() => {
    Ml();
  }, []);
  const Ml = async () => {
    SetCategory(await Get_Category());
  };
  const onSubmit = () => {
    from.validateFields().then(async (rs) => {
      rs = { ...rs, RowID: ID, SyncData: 1 };
      const log = await PUT_PersonDone(rs);
      if (log === 1) {
        await POST_SyncDonor(ID);
      }
      FuncReload();
    });
  };
  return (
    <React.Fragment>
      <Form labelCol={{ span: 8 }} form={from}>
        <Row gutter={[12]}>
          <Col md={12} xs={24}>
            <ElementCombobox
              Name={"LuongHien"}
              Label="Lượng hiến"
              dataSource={Category.ml}
              ruler={[
                {
                  required: true,
                  message: "Yêu cầu",
                },
              ]}
            />
          </Col>
        </Row>
        <Row gutter={[12]}>
          <Col md={12} xs={24}>
            <Form.Item label="Phản ứng" name={"PhanUng"}>
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item label="Xử trí" name={"XuTri"}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        {dataPerson?.Sync !== '1' && dataPerson?.Sync === '2' && (
          <Row gutter={[12]}>
            <Button
              style={{ width: 100 + "%" }}
              type="primary"
              onClick={onSubmit}>
              Kết thúc lấy máu
            </Button>
          </Row>
        )}
      </Form>
    </React.Fragment>
  );
};
export default Index;
