import React from "react";
import { Row, Col, Form, Input, DatePicker, Button } from "antd";
import Ml from "../../ml.combobox";
import ElementCombobox from "../../Element.combobox";
import "../../index.css";
import { PUT_PersonDone } from "../../../../Data/Api/DangKyKham";
import { useState } from "react";
import IconCombine from "../../../Icon";
import { useEffect } from "react";
const Index = (props) => {
  const [PropertiesButton, SetPropertiesButton] = useState({
    Name: "Kết thúc lấy máu -> Đồng bộ!",
    type: "primary",
    icon: <IconCombine.CheckOutlined></IconCombine.CheckOutlined>,
    disabled: false,
    danger: false,
  });
  const [PersonUpdate, SetPersonUpdate] = useState({
    RowID: props.ID,
    PhanUng: null,
    XuTri: null,
    LuongHien: null,
    MaTuiMau: null,
    LoaiHienThanhPhan: null,
    Sync: null,
  });

  useEffect(() => {
    SetPersonUpdate(props?.dataPerson);
    TitleButton(props?.dataPerson?.Sync);
  }, [props]);

  const TitleButton = (value) => {
    switch (value) {
      case "1":
        SetPropertiesButton({
          ...PropertiesButton,
          Name: "Hàng đợi đồng bộ -> Đợi duyệt",
          icon: <IconCombine.ClockCircleOutlined />,
          disabled: true,
          type: "dashed",
          danger: false,
        });
        break;
      case "2":
        SetPropertiesButton({
          ...PropertiesButton,
          Name: "Thông tin đợi duyệt",
          icon: <IconCombine.ClockCircleOutlined />,
          disabled: true,
          type: "dashed",
          danger: false,
        });
        break;
      case "3":
        SetPropertiesButton({
          ...PropertiesButton,
          Name: "Lỗi đồng bộ xin kiểm tra thông tin. ",
          icon: <IconCombine.CloseCircleOutlined />,
          disabled: false,
          type: "dashed",
          danger: true,
        });
        break;
      case "4":
        SetPropertiesButton({
          ...PropertiesButton,
          Name: "Đã đồng bộ",
          icon: <IconCombine.CheckCircleTwoTone />,
          disabled: true,
          type: "primary",
          danger: false,
        });
        break;
      default:
        SetPropertiesButton({
          ...PropertiesButton,
          Name: "Kết thúc lấy máu -> Đồng bộ!",
          type: "primary",
          icon: <IconCombine.CheckOutlined></IconCombine.CheckOutlined>,
          disabled: false,
          danger: false,
        });
        break;
    }
  };
  const PushState = () => {
    const ClonePeronUpdate = PersonUpdate;
    ClonePeronUpdate.SyncData = 1;
    PUT_PersonDone(ClonePeronUpdate)
      .then(() => {
        TitleButton("1");
      })
      .catch(() => TitleButton("3"));
  };
  return (
    <React.Fragment>
      <Form labelCol={{ span: 8 }}>
        <Row gutter={[12]}>
          <Col md={12} xs={24}>
            <Form.Item label="Mã túi máu">
              <Input readOnly value={PersonUpdate?.MaTuiMau} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[12]}>
          <Col md={12} xs={24}>
            <Form.Item label="Lượng hiến">
              <Ml
                value={PersonUpdate?.LuongHien ?? ""}
                onChangeValue={(e) => {
                  SetPersonUpdate({ ...PersonUpdate, LuongHien: e });
                }}
              />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item label="Hiến loại thành phần máu">
              <ElementCombobox value={PersonUpdate?.LoaiHienThanhPhan} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[12]}>
          <Col md={12} xs={24}>
            <Form.Item label="Phản ứng">
              <Input
                value={PersonUpdate?.PhanUng}
                onChange={(e) => {
                  SetPersonUpdate({ ...PersonUpdate, PhanUng: e.target.value });
                }}
              />
            </Form.Item>
          </Col>
          <Col md={12} xs={24}>
            <Form.Item label="Xử trí">
              <Input
                value={PersonUpdate?.XuTri}
                onChange={(e) => {
                  SetPersonUpdate({ ...PersonUpdate, XuTri: e.target.value });
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[12]}>
          <Col md={4} xs={24}></Col>
          <Col md={4} xs={24}></Col>
          <Col md={6} xs={24}>
            <Button
              {...PropertiesButton}
              className="btnFull"
              onClick={PushState}
            >
              {PropertiesButton.Name}
            </Button>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
};
export default Index;
