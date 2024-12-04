import { Button, Col, Form, Input, Row, Space } from "antd";
import React from "react";
import { useState } from "react";
import { PUT_PersonABORH } from "../../../../Data/Api/DangKyKham";
import { ABO, HbsAg, HST, RH } from "../../../../Data/UnitData/data";
import ComboboxIndex from "../../Combobox/Element.combobox";
const XnTruocHien = ({ Person, qualified, Category }) => {
  console.log(Category);
  const Confirm = async ({ ABO, RH, HST, HBV, NguoiThAboRh, NguoiThHBsAg }) => {
    const { RowID } = Person;
    await PUT_PersonABORH({ RowID: RowID, ABO: ABO, RH: RH, HST: HST, HBV: HBV, NguoiThAboRh: NguoiThAboRh, NguoiThHBsAg: NguoiThHBsAg });
  };
  return (
    <>
      <Form
        layout="vertical"
        onFinish={(e) => {
          Confirm({ ABO: e.ABO, RH: e.RH, HST: e.HST, HBV: e.HBV, NguoiThAboRh: e.NguoiThAboRh, NguoiThHBsAg: e.NguoiThHBsAg });
        }}
      >
        <Row>
          <Col sm={8} xs={24}>
            <ComboboxIndex initialValues={Person?.ABO} dataSource={ABO} Name={"ABO"} Label={"ABO"} />
          </Col>
          <Col sm={8} xs={24}>
            <ComboboxIndex initialValues={Person?.RH} dataSource={RH} Name={"RH"} Label={"RH"} />
          </Col>
          <Col sm={8} xs={24}>
            <ComboboxIndex initialValues={Person?.NguoiThAboRh} dataSource={Category?.user} Name={"NguoiThAboRh"} Label={"Người thực hiện"} />
          </Col>
          <Col sm={8} xs={24}>
            <ComboboxIndex initialValues={Person?.HST} dataSource={HST} Name={"HST"} Label={"HST"} ruler={[{ required: true, message: "yêu cầu nhập HST!" }]} />
          </Col>
          <Col sm={8} xs={24}>
            <ComboboxIndex initialValues={Person?.HBV} dataSource={HbsAg} Name={"HBV"} Label={"HBsAg"} ruler={[{ required: true, message: "yêu cầu nhập HBsAg!" }]} />
          </Col>
          <Col sm={8} xs={24}>
            <ComboboxIndex initialValues={Person?.NguoiThHBsAg} dataSource={Category?.user} Name={"NguoiThHBsAg"} Label={"Người thực hiện"} />
          </Col>
          {Person?.Sync == 1 ? (
            ""
          ) : (
            <Button htmlType="submit" type="primary" style={{ width: 100 + "%" }} disabled={!qualified}>
              Xác nhận
            </Button>
          )}
        </Row>
      </Form>
    </>
  );
};
export default XnTruocHien;
