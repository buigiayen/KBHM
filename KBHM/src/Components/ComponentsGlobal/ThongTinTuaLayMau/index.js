import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Divider,
  Form,
  Input,
  Row,
  Col,
  Checkbox,
  Button,
  DatePicker,
} from "antd";
import LocationCombobox from "../Location.combobox";
import ElementCombobox from "../Element.combobox";
import { Config } from "../../../Data/Config/config.system";
import IconCombine from "../../Icon";
import DateTime from "../../ComponentsGlobal/DateTime";
import { PUT_PersonTrip } from "../../../Data/Api/DangKyKham";
import "./index.css";
const Index = (props) => {
  const [Isload, SetIsLoad] = useState(false);
  const [IsDisable, SeIsDisable] = useState(false);

  const [PersonUpdate, SetPersonUpdate] = useState({
    RowID: null,
    NgayHien: dayjs().$d,
    LoaiHienThanhPhan: Config?.LoaiThanhPhan?.value,
    DiemLayMau: null,
    MaTuiMau: null,
  });
  useEffect(() => {
    console.log(props.dataPerson)
    if (props.dataPerson !== undefined) {
      SetPersonUpdate(props.dataPerson);
    }
  }, [props]);
  const Putperson = () => {
    SeIsDisable(true);
    const ClonePersonUpdate = PersonUpdate;
    ClonePersonUpdate.RowID = props.ID;
    PUT_PersonTrip(PersonUpdate)
      .then(() => {
        SetIsLoad(false);
        SeIsDisable(false);
      })
      .catch(SetIsLoad(false));
  };
  return (
    <>
      <Divider orientation="left">
        <span style={{ color: "blue", fontStyle: "italic" }}>
          Thông tin tua lấy máu
        </span>
      </Divider>
      <Form labelCol={8}>
        <Row gutter={[12]}>
          <Col md={12} xs={24}>
            <Form.Item label="Ngày hiến">
              <DateTime
                Value={PersonUpdate?.NgayHien}
                onChange={(e) => {
                  SetPersonUpdate({ ...PersonUpdate, NgayHien: e });
                }}
              />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item label="Hiến loại thành phần">
              <ElementCombobox
                defaultValue={
                  PersonUpdate?.LoaiHienThanhPhan
                    ? PersonUpdate?.LoaiHienThanhPhan
                    : Config.LoaiThanhPhan
                }
                Value={(e) => {
                  SetPersonUpdate({ ...PersonUpdate, LoaiHienThanhPhan: e });
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[12]}>
          <Col md={12} xs={24}>
            <Form.Item label="Điểm lấy máu">
              <LocationCombobox
                defaultValue={PersonUpdate?.DiemLayMau}
                Value={(e) => {
                  SetPersonUpdate({ ...PersonUpdate, DiemLayMau: e });
                }}
              />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item label="Địa chỉ">{Config.Region}</Form.Item>
          </Col>
        </Row>
        <Row gutter={[12]}>
          <Col md={12} xs={24}>
            <Form.Item label="In phiếu ĐKHM khi cấp mã túi máu">
              <Checkbox value={true} />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item label="Mã túi máu">
              <Input
                value={PersonUpdate?.MaTuiMau}
                onChange={(e) => {
                  console.log(e.target.value);
                  SetPersonUpdate({
                    ...PersonUpdate,
                    MaTuiMau: e.target.value,
                  });
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[8]}>
          <Col md={6} xs={24}>
            <Button
              className="btnFull"
              icon={<IconCombine.FileOutlined></IconCombine.FileOutlined>}
            >
              In phiếu ĐKHM
            </Button>
          </Col>
          <Col md={6} xs={24}></Col>
          <Col md={6} xs={24}>
            <Button
              className="btnFull"
              type="dashed"
              danger
              icon={
                <IconCombine.CloseCircleOutlined></IconCombine.CloseCircleOutlined>
              }
            >
              Hủy lấy máu
            </Button>
          </Col>
          <Col md={6} xs={24}>
            <Button
              className="btnFull"
              type="primary"
              icon={<IconCombine.CheckOutlined></IconCombine.CheckOutlined>}
              onClick={Putperson}
              loading={Isload}
              disabled={IsDisable}
            >
              Cấp mã túi máu
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default Index;
