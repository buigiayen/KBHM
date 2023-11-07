import { Button, Col, Form, Row, Space } from "antd";
import React from "react";
import { useState } from "react";
import { PUT_PersonABORH } from '../../../../Data/Api/DangKyKham'
import { ABO, RH } from "../../../../Data/UnitData/data";
import ComboboxIndex from "../../Combobox/Element.combobox";
const XnTruocHien = ({ Person }) => {
  console.log(Person?.ABO);
  const Confirm = async ({ ABO, RH }) => {
    const { RowID } = Person;
    await PUT_PersonABORH({ RowID: RowID, ABO: ABO, RH: RH })
  }
  return (
    <>
      <Form layout='vertical' onFinish={(e) => {
        Confirm({ ABO: e.ABO, RH: e.RH });
      }}>
        <Row>
          <Col sm={12} xs={24} >   <ComboboxIndex initialValues={Person?.ABO} dataSource={ABO} Name={"ABO"} Label={"ABO"} ruler={[{ required: true, message: 'yêu cầu nhập ABO!' }]} /> </Col>
          <Col sm={12} xs={24}>   <ComboboxIndex initialValues={Person?.RH} dataSource={RH} Name={"RH"} Label={"RH"} ruler={[{ required: true, message: 'yêu cầu nhập RH!' }]} /> </Col>

          {Person?.Sync == 1 ? "" : <Button htmlType='submit' type='primary' style={{ width: 100 + '%' }} >Xác nhận</Button>}
        </Row>



      </Form>
    </>
  );
};
export default XnTruocHien;
