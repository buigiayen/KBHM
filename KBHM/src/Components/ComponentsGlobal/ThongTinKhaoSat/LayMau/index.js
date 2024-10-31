import React from "react";
import { Row, Col, Form, Input, Button, DatePicker } from "antd";
import ElementCombobox from "../../Combobox/Element.combobox";
import "../../index.css";
import { useState } from "react";
import { useEffect } from "react";
import { PUT_PersonDone, POST_SyncDonor } from "../../../../Data/Api/DangKyKham";
import { Get_Category } from "../../../../Data/Api/Category";
import dayjs from "dayjs";
import { DateTimeToLocaleDate } from "../TriHoanHienMau/helper";

const Index = ({ ID, dataPerson, FuncReload }) => {
  const [from] = Form.useForm();
  const [Category, SetCategory] = useState([]);

  useEffect(() => {
    from.setFieldsValue({
      ...dataPerson,
      PhanUng: dataPerson.PhanUng || "Không",
      XuTri: dataPerson.XuTri || "Không",
      ExtractTime: [dataPerson.NgayBatDau ? dayjs(dataPerson.NgayBatDau) : dayjs().startOf("day"), dataPerson.NgayKetThuc ? dayjs(dataPerson.NgayKetThuc) : dayjs().endOf("day")],
    });
  }, [dataPerson]);
  useEffect(() => {
    Ml();
  }, []);
  const Ml = async () => {
    SetCategory(await Get_Category());
  };
  const onSubmit = () => {
    from
      .validateFields()
      .then(async (rs) => {
        if (rs.ExtractTime) {
          let startDate = new Date(dayjs(rs.ExtractTime[0]));
          let endDate = new Date(dayjs(rs.ExtractTime[1]));
          startDate.setSeconds(0);
          endDate.setSeconds(0);
          rs.NgayBatDau = DateTimeToLocaleDate(startDate);
          rs.NgayKetThuc = DateTimeToLocaleDate(endDate);
        }
        rs = { ...rs, RowID: ID, SyncData: 1, NguoiDongBo: localStorage.getItem("userID") };
        const log = await PUT_PersonDone(rs);
        if (log === 1) {
          await POST_SyncDonor(ID);
        }
        FuncReload();
      })
      .catch((err) => console.log(err));
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
          <Col md={12} xs={24}>
            <Form.Item
              label={"Thời gian lấy máu"}
              name={"ExtractTime"}
              rules={[
                {
                  required: true,
                  message: "Yêu cầu",
                },
              ]}
            >
              <DatePicker.RangePicker style={{ width: "100%" }} showTime format="DD-MM-YYYY HH:mm" />
            </Form.Item>
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
        {dataPerson?.Sync !== "1" && dataPerson?.Sync === "2" && (
          <Row gutter={[12]}>
            <Button style={{ width: 100 + "%" }} type="primary" onClick={onSubmit}>
              Kết thúc lấy máu
            </Button>
          </Row>
        )}
      </Form>
    </React.Fragment>
  );
};
export default Index;
