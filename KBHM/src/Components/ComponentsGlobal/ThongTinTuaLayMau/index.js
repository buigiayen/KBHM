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
} from "antd";
import LocationCombobox from "../Location.combobox";
import ElementCombobox from "../Element.combobox";
import { Config } from "../../../Data/Config/config.system";
import IconCombine from "../../Icon";
import DateTime from "../../ComponentsGlobal/DateTime";
import { PUT_PersonTrip, GET_DonorExCheck } from "../../../Data/Api/DangKyKham";
import { Warning } from "../../notification";
import "./index.css";
const Index = (props) => {
  const [Isload, SetIsLoad] = useState(false);
  const [IsDisable, SeIsDisable] = useState(false);

  const [PersonUpdate, SetPersonUpdate] = useState({
    RowID: null,
    NgayHien: dayjs().$d,
    LoaiHienThanhPhan: null,
    DiemLayMau: null,
    MaTuiMau: null,
    Sync: null,
  });
  useEffect(() => {
    if (props.dataPerson !== undefined) {
      SetPersonUpdate(props.dataPerson);
    }
  }, [props]);
  const Putperson = async () => {
    if (PersonUpdate?.MaTuiMau) {
      SeIsDisable(true);
      const ClonePersonUpdate = PersonUpdate;
      ClonePersonUpdate.RowID = props.ID;
      const DonorExCheck = await GET_DonorExCheck({ DonorExCode: PersonUpdate?.MaTuiMau });
      const { CheckDonnor } = DonorExCheck;
      if (CheckDonnor) {
        PUT_PersonTrip(PersonUpdate)
          .then(() => {
            SetIsLoad(false);
            SeIsDisable(false);
            props.SetDataPerson({
              ...props.dataPerson,
              ...PersonUpdate
            })
          })
          .catch(SetIsLoad(false));
      } else {
        Warning({ description: 'Đã tồn tại túi máu trong hê thống ngân hàng máu. Xin sử dụng túi khác', message: 'Cảnh báo' })
        SeIsDisable(false);
      }

    } else {
      Warning({ description: 'Yêu cầu cần có mã túi máu', message: 'Cảnh báo' })
      SeIsDisable(false);
    }

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
                Value={PersonUpdate?.NgayHien ?? dayjs()}
                onChange={(e) => {
                  SetPersonUpdate({ ...PersonUpdate, NgayHien: e });
                }}
              />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item label="Hiến loại thành phần">
              <ElementCombobox
                value={PersonUpdate?.LoaiHienThanhPhan}
                onChangeValue={(e) => {
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
                value={PersonUpdate?.DiemLayMau}
                onChangeValue={(e) => {
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
            <Form.Item label="Mã túi máu"
              required
              rules={[
                {
                  required: true,
                  message: 'Xin hãy nhập mã túi máu!',
                },
              ]}>
              <Input
                value={PersonUpdate?.MaTuiMau}
                onChange={(e) => {
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
          {PersonUpdate?.Sync === null && (
            <>
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
                  htmlType="submit"
                >
                  Lấy máu
                </Button>
              </Col>
            </>
          )}
        </Row>
      </Form>
    </>
  );
};
export default Index;
