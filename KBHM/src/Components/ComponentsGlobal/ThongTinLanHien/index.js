import React from "react";
import { Form, Input, Divider, DatePicker, Button, Checkbox } from "antd";
import { Row, Col } from "antd";
import dayjs from "dayjs";

import customParseFormat from "dayjs/plugin/customParseFormat";
import { useEffect, useState } from "react";
import SexCombobox from "../Sex.Combobox";
import RegionCombox from "../../Region.Combobox";
import { GET_PersonInfo, PUT_PersonInfo } from "../../../Data/Api/DangKyKham";
import "../index.css";
import DateTime from "../DateTime";
dayjs.extend(customParseFormat);
const { Search } = Input;

const Index = (props) => {
  const [readOnly, SetReadOnly] = useState(props?.NotreadOnly);
  const [VisiblePutState, SetVisiblePutState] = useState(false);
  const [DataPerson, SetDataPerson] = useState({
    Name: null,
    BirthDay: dayjs(),
    Sex: 1,
    CCCD: null,
    Phone: null,
    Email: null,
    personProperties: [],
    NoiCapCCCD: null,
    DiaChiThuongTru_ChiTiet: null,
    DiaChiThuongTru: null,
    DiaChiLienLac: null,
    DiaChiThuongLienLac_ChiTiet: null,
    Sync: null,
  });

  useEffect(() => {
    if (props?.dtPerson !== undefined) {
      SetDataPerson(props?.dtPerson);
    }
  }, [props?.dtPerson]);

  useEffect(() => {
    if (props?.ValuePerson !== undefined) {
      props?.ValuePerson(DataPerson);
    }
  }, [DataPerson]);

  const FetchPeron = async (value) => {
    const pra = {
      text: value,
      row: 1,
    };

    await GET_PersonInfo(pra).then((rs) => {
      SetDataPerson(rs[0]);
      return rs[0];
    });
  };
  return (
    <>
      <Divider orientation="left">
        <span style={{ color: "blue", fontStyle: "italic" }}>
          Thông tin người hiến
        </span>
      </Divider>

      <>
        <Form
          name="complex-form"
          labelCol={{
            span: 8,
          }}
          style={{
            maxWidth: 7000,
          }}
        >
          <Form.Item>
            <Row gutter={[16, 8]}>
              <Col span={24}>
                <Form.Item label={<b>Họ và tên</b>} required>
                  {readOnly ? (
                    <Input
                      placeholder="NGUYEN VAN A"
                      value={DataPerson?.Name}
                      onChange={(e) => {
                        SetDataPerson({ ...DataPerson, Name: e.target.value });
                      }}
                    />
                  ) : (
                    <>{DataPerson?.Name}</>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item label={<b>Ngày sinh</b>} required>
                  {readOnly ? (
                    <DateTime
                      Value={DataPerson?.BirthDay}
                      onChange={(onChange) => {
                        SetDataPerson({ ...DataPerson, BirthDay: onChange });
                      }}
                    />
                  ) : (
                    <>
                      {DataPerson?.BirthDay
                        ? dayjs(DataPerson?.BirthDay).format("DD/MM/YYYY")
                        : dayjs().date}
                    </>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={<b>Giới tính</b>} required>
                  {readOnly ? (
                    <SexCombobox
                      defaultValue={DataPerson?.Sex}
                      Value={(Value) => {
                        SetDataPerson({ ...DataPerson, Sex: Value });
                      }}
                    ></SexCombobox>
                  ) : (
                    <>{DataPerson?.Sex == 1 ? "Nam" : "Nữ"}</>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item label={<b>Số CCCD</b>} required>
                  {readOnly ? (
                    <Search
                      placeholder="Số căn cước"
                      value={DataPerson?.CCCD}
                      onChange={(e) => {
                        SetDataPerson({ ...DataPerson, CCCD: e.target.value });
                      }}
                      onSearch={FetchPeron}
                      enterButton
                    />
                  ) : (
                    <>{DataPerson?.CCCD}</>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={<b>Nơi cấp</b>}>
                  {readOnly ? (
                    <Input
                      placeholder="Địa chỉ cấp"
                      value={DataPerson?.NoiCapCCCD}
                      onChange={(e) => {
                        SetDataPerson({
                          ...DataPerson,
                          NoiCapCCCD: e.target.value,
                        });
                      }}
                    ></Input>
                  ) : (
                    <>{DataPerson?.NoiCapCCCD}</>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item label={<b>Số điện thoại</b>} required>
                  {readOnly ? (
                    <Input
                      placeholder="0123456789"
                      value={DataPerson?.Phone}
                      onChange={(e) => {
                        SetDataPerson({ ...DataPerson, Phone: e.target.value });
                      }}
                    />
                  ) : (
                    <>{DataPerson?.Phone}</>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={<b>Email</b>}>
                  {readOnly ? (
                    <Input
                      type="email"
                      value={DataPerson?.Email}
                      placeholder="@gmail.com,..."
                      onChange={(e) => {
                        SetDataPerson({ ...DataPerson, Email: e.target.value });
                      }}
                    ></Input>
                  ) : (
                    <>{DataPerson?.Email}</>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <Row gutter={[16, 8]}>
              <Col span={24}>
                <Form.Item
                  label={<b>Địa chỉ thường trú (ghi trên CCCD)</b>}
                  required
                >
                  {readOnly ? (
                    <Input
                      placeholder="Số nhà A"
                      value={DataPerson?.DiaChiThuongTru}
                      onChange={(e) => {
                        SetDataPerson({
                          ...DataPerson,
                          DiaChiThuongTru: e.target.value,
                        });
                      }}
                    />
                  ) : (
                    <>{DataPerson?.DiaChiThuongTru}</>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <Row gutter={[16, 8]}>
              <Col span={24}>
                <Form.Item label={<b>Xã/Phường/Huyện/Tỉnh</b>} required>
                  {readOnly ? (
                    <RegionCombox
                      Region={DataPerson?.DiaChiThuongTru_ChiTiet}
                      valueChange={(valueChange) => {
                        SetDataPerson({
                          ...DataPerson,
                          DiaChiThuongTru_ChiTiet: valueChange,
                        });
                      }}
                    ></RegionCombox>
                  ) : (
                    <>{DataPerson?.DiaChiThuongTru_ChiTiet}</>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <Row gutter={[16, 8]}>
              <Col span={18}>
                <Form.Item label={<b>Địa chỉ liên lạc</b>} required>
                  {readOnly ? (
                    <Input
                      value={DataPerson?.DiaChiLienLac}
                      onChange={(e) => {
                        SetDataPerson({
                          ...DataPerson,
                          DiaChiLienLac: e.target.value,
                        });
                      }}
                    />
                  ) : (
                    <>{DataPerson?.DiaChiLienLac}</>
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                {readOnly ? (
                  <Form.Item label={<b>Như địa chỉ thường trú </b>}>
                    <Checkbox
                      onChange={(e) => {
                        if (e.target.checked) {
                          SetDataPerson({
                            ...DataPerson,
                            DiaChiLienLac: DataPerson.DiaChiThuongTru,
                            DiaChiThuongLienLac_ChiTiet:
                              DataPerson.DiaChiThuongTru_ChiTiet,
                          });
                        }
                      }}
                    />
                  </Form.Item>
                ) : (
                  <></>
                )}
              </Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <Row gutter={[16, 8]}>
              <Col span={24}>
                <Form.Item label={<b>Xã/Phường/Huyện/Tỉnh</b>} required>
                  {readOnly ? (
                    <RegionCombox
                      Region={DataPerson?.DiaChiThuongLienLac_ChiTiet}
                      valueChange={(valueChange) => {
                        SetDataPerson({
                          ...DataPerson,
                          DiaChiThuongLienLac_ChiTiet: valueChange,
                        });
                      }}
                    ></RegionCombox>
                  ) : (
                    <>{DataPerson?.DiaChiThuongLienLac_ChiTiet}</>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          {DataPerson?.Sync === null && (
            <Form.Item>
              <Row gutter={[16, 8]}>
                <Col span={24}>
                  {readOnly ? null : (
                    <Button
                      className="btnFull"
                      onClick={() => {
                        SetReadOnly(!readOnly);
                        SetVisiblePutState(!VisiblePutState);
                      }}
                    >
                      Sửa thông tin
                    </Button>
                  )}
                  {VisiblePutState ? (
                    <Button
                      className="btnFull"
                      onClick={() => {
                        SetReadOnly(!readOnly);
                        SetVisiblePutState(!VisiblePutState);
                        PUT_PersonInfo(DataPerson);
                      }}
                    >
                      Xác nhận thông tin
                    </Button>
                  ) : null}
                </Col>
              </Row>
            </Form.Item>
          )}
        </Form>
      </>
    </>
  );
};
export default Index;
