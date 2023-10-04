import React, {  useState } from "react";
import { Form, Input, Divider, Checkbox } from "antd";
import { Row, Col } from "reactstrap";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import SexCombobox from "../Combobox/Sex.Combobox";
import RegionCombox from "../../Region.Combobox";
import Job from "../Combobox/Job.Combobox";
import UploadMinio from "../../upload.minio";
import DateTime from "../DateTime";
import {Get_Job} from '../../../Data/Api/Category'
import "../index.css";
import { useEffect } from "react";

dayjs.extend(customParseFormat);

const { Search } = Input;

const Index = ({ form, FetchPerson }) => {
  const [isVisibleComponent, setIsVisibleComponet] = useState(false);
  const [ListJob, SetListJob] = useState([]);

  useEffect(()=>{
    LoadCategory();
  }, [])
  const LoadCategory = async() => {
    const Data = await Get_Job();
    SetListJob(Data)
  }
  const Ruler = [
    {
      message: "Bắt buộc",
      required: true,
    },
  ];

  const setImageForm = ({ value }) => {
    form?.setFieldValue(value);
  };
  const setTimeBirtday = ({ value }) => {
   
    form?.setFieldValue(value);
  };
  return (
    <>
      <Divider orientation="left">
        <span style={{ color: "blue", fontStyle: "bold", fontWeight: "bold" }}>
          THÔNG TIN NGƯỜI HIẾN
        </span>
      </Divider>

      <Row>
        <Col lg={2}>
          <Form.Item
            name={"UrlImage"}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
            label={"ẢNH CHÂN DUNG"}>
            <UploadMinio
              Value={form?.getFieldValue("UrlImage")}
              onChange={setImageForm}
            />
          </Form.Item>
        </Col>

        <Col lg={10}>
          <Row>
            <Form.Item
              name={"Name"}
              label={"HỌ VÀ TÊN"}
              style={{ fontWeight: "bold" }}
              rules={Ruler}>
              <Input placeholder="NGUYỄN VĂN A" onInput={e => e.target.value = e.target.value.toUpperCase()}/>
            </Form.Item>
          </Row>
          <Row>
            <Col lg={12}>
              <Row>
                <Col lg={6}>
                  <DateTime
                    labelFrom={"NGÀY SINH"}
                    Name={"BirthDay"}
                    valueChange={(e) => {setTimeBirtday({value :e } ) } }
                  />
               
                </Col>
                <Col lg={6}>
                  <SexCombobox
                    initialValue={1}
                    Name={"Sex"}
                    PropsFormItem={{
                      label: "GIỚI TÍNH",
                      style: { fontWeight: "bold" },
                    }}></SexCombobox>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <Form.Item
            name={"CCCD"}
            label={"SỐ CCCD"}
            style={{ fontWeight: "bold" }}
            rules={[
              Ruler[0],
              {
                max: 16,
                min: 9,
                message: "CCCD không hợp lệ",
              },
            ]}>
            {FetchPerson !== undefined ? (
              <Search
                placeholder="Số căn cước"
                onSearch={FetchPerson}
                enterButton
              />
            ) : (
              <Input></Input>
            )}
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name={"NoiCapCCCD"}
            label={"NƠI CẤP CCCD"}
            rules={Ruler}
            style={{ fontWeight: "bold" }}>
            <Input></Input>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name={"Phone"}
            label={"SỐ ĐIỆN THOẠI"}
            style={{ fontWeight: "bold" }}
            rules={Ruler}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={"EMAIL"}
            name={"Email"}
            rules={[
              {
                type: "email",
                message: "Email không hợp lệ!",
              },
            ]}
            style={{ fontWeight: "bold" }}>
            <Input></Input>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
            <Job label={"NGHỀ NGHIỆP"} Name={"NgheNghiep"}  DataSource={ListJob}/>
        </Col>
        <Col span={12}>
          <Form.Item label={"ĐỊA CHỈ CƠ QUAN"} name={"DiaChiCoQuan"} style={{ fontWeight: "bold" }}>
            <Input></Input>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 8]}>
        <Col span={24}>
          <Form.Item
            name={"DiaChiThuongTru"}
            label={"ĐỊA CHỈ THƯỜNG TRÚ (GHI TRÊN CCCD)"}
            style={{ fontWeight: "bold" }}
            rules={Ruler}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 8]}>
        <Col span={24}>
          <RegionCombox
            name={"DiaChiThuongTru_ChiTiet"}
            label={"XÃ/PHƯỜNG/HUYỆN/TỈNH"}
            propsFormItem={{
              rules: [
                {
                  required: true,
                  message: `Yêu cầu`,
                },
              ],
              style: { fontWeight: "bold" },
            }}
          />
        </Col>
      </Row>

      <Row gutter={[16, 8]}>
        <Col span={18}>
          <Form.Item
            name={"DiaChiLienLac"}
            label={"ĐỊA CHỈ LIÊN HỆ"}
            style={{ fontWeight: "bold" }}>
            <Input disabled={isVisibleComponent} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label={" "}
            name={"CheckNhuDiaChiThuongTru"}
            valuePropName="checked"
            style={{ fontWeight: "bold" }}>
            <Checkbox
              onChange={(e) => {
                setIsVisibleComponet(e.target.checked);
              }}>
              NHƯ ĐỊA CHỈ THƯỜNG TRÚ
            </Checkbox>
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <RegionCombox
            disabled={isVisibleComponent}
            name={"DiaChiThuongLienLac_ChiTiet"}
            propsFormItem={{ style: { fontWeight: "bold" } }}
            label={"ĐỊA CHỈ LIÊN LẠC"}></RegionCombox>
        </Col>
      </Row>
    </>
  );
};

export default Index;
