import React from "react";
import { Row, Col, Form, Input, Button, DatePicker, message } from "antd";
import ElementCombobox from "../../Combobox/Element.combobox";
import "../../index.css";
import { useState } from "react";
import { useEffect } from "react";
import { PUT_PersonDone, POST_SyncDonor } from "../../../../Data/Api/DangKyKham";
import { Get_Category } from "../../../../Data/Api/Category";
import dayjs from "dayjs";
import { DateTimeToLocaleDate } from "../TriHoanHienMau/helper";

const Index = ({ ID, dataPerson, FuncReload, qualified }) => {
  const [from] = Form.useForm();
  const [Category, SetCategory] = useState([]);
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current > dayjs().endOf("day");
  };
  useEffect(() => {
    from.setFieldsValue({
      ...dataPerson,
      PhanUng: dataPerson.PhanUng || "Không",
      XuTri: dataPerson.XuTri || "Không",
      ExtractTime: [dataPerson.NgayBatDau ? dayjs(dataPerson.NgayBatDau) : dayjs(), dataPerson.NgayKetThuc ? dayjs(dataPerson.NgayKetThuc) : dayjs()],
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
          if (
            startDate.toLocaleDateString().split("T")[0] != new Date(dayjs(dataPerson.DateRegister)).toLocaleDateString().split("T")[0] ||
            endDate.toLocaleDateString().split("T")[0] != new Date(dayjs(dataPerson.DateRegister)).toLocaleDateString().split("T")[0]
          ) {
            message.warning("Ngày lấy máu phải trùng với ngày hiến");
            return;
          }

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
              <DatePicker.RangePicker style={{ width: "100%" }} disabledDate={disabledDate} showTime format="HH:mm DD-MM-YYYY" />
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
            <Button style={{ width: 100 + "%" }} type="primary" onClick={onSubmit} disabled={!qualified}>
              Kết thúc lấy máu
            </Button>
          </Row>
        )}
      </Form>
    </React.Fragment>
  );
};
export default Index;
