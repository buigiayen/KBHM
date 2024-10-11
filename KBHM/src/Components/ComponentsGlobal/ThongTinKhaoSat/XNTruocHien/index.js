import { Button, Col, Form, Input, Row, Space } from "antd";
import React from "react";
import { useState } from "react";
import { PUT_PersonABORH } from "../../../../Data/Api/DangKyKham";
import { ABO, RH } from "../../../../Data/UnitData/data";
import ComboboxIndex from "../../Combobox/Element.combobox";
const XnTruocHien = ({ Person }) => {
  const Confirm = async ({ ABO, RH, HST, HBV }) => {
    const { RowID } = Person;
    await PUT_PersonABORH({ RowID: RowID, ABO: ABO, RH: RH, HST: HST, HBV: HBV });
  };
  return (
    <>
      <Form
        layout="vertical"
        onFinish={(e) => {
          Confirm({ ABO: e.ABO, RH: e.RH, HST: e.HST, HBV: e.HBV });
        }}
      >
        <Row>
          <Col sm={12} xs={24}>
            <ComboboxIndex initialValues={Person?.ABO} dataSource={ABO} Name={"ABO"} Label={"ABO"} ruler={[{ required: true, message: "yêu cầu nhập ABO!" }]} />{" "}
          </Col>
          <Col sm={12} xs={24}>
            <ComboboxIndex initialValues={Person?.RH} dataSource={RH} Name={"RH"} Label={"RH"} ruler={[{ required: true, message: "yêu cầu nhập RH!" }]} />{" "}
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item initialValue={Person?.HST} name={"HST"} label={"HST"} rules={[{ required: true, message: "yêu cầu nhập HST!" }]}>
              <Input placeholder="HST" />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item initialValue={Person?.HBV} name={"HBV"} label={"HBV"} rules={[{ required: true, message: "yêu cầu nhập HBV!" }]}>
              <Input placeholder="HBV" />
            </Form.Item>
          </Col>

          {Person?.Sync == 1 ? (
            ""
          ) : (
            <Button htmlType="submit" type="primary" style={{ width: 100 + "%" }}>
              Xác nhận
            </Button>
          )}
        </Row>
      </Form>
    </>
  );
};
export default XnTruocHien;
