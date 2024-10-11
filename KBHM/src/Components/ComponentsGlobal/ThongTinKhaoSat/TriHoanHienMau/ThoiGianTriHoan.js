import { Col, Divider, Form, InputNumber, Radio, Row } from "antd";
import { TimeTriHoan } from "../../../../Data/UnitData/data";

const ThoiGianTriHoan = ({ onChangeTimeTriHoan, loaiTriHoan }) => {
  return (
    <>
      <Divider orientation="left">Trì hoãn</Divider>
      <Form.Item>
        <Radio.Group onChange={onChangeTimeTriHoan} value={loaiTriHoan}>
          <Row>
            <Col style={{ display: "flex", alignItems: "center" }}>
              <Radio value={TimeTriHoan.Day}>Ngày</Radio>
              <Form.Item style={{ marginBottom: 0 }} name={loaiTriHoan == TimeTriHoan.Day ? "DelayTime" : ""} rules={[{ required: loaiTriHoan == TimeTriHoan.Day, message: "Yêu cầu" }]}>
                <InputNumber min={1} style={{ width: 100 }} disabled={loaiTriHoan != TimeTriHoan.Day} />
              </Form.Item>
            </Col>
            <Col style={{ marginLeft: 10, display: "flex", alignItems: "center" }}>
              <Radio value={TimeTriHoan.Week}>Tuần</Radio>
              <Form.Item style={{ marginBottom: 0 }} name={loaiTriHoan == TimeTriHoan.Week ? "DelayTime" : ""} rules={[{ required: loaiTriHoan == TimeTriHoan.Week, message: "Yêu cầu" }]}>
                <InputNumber min={1} style={{ width: 100 }} disabled={loaiTriHoan != TimeTriHoan.Week} />
              </Form.Item>
            </Col>
            <Col style={{ marginLeft: 10, display: "flex", alignItems: "center" }}>
              <Radio value={TimeTriHoan.Month}>Tháng</Radio>
              <Form.Item style={{ marginBottom: 0 }} name={loaiTriHoan == TimeTriHoan.Month ? "DelayTime" : ""} rules={[{ required: loaiTriHoan == TimeTriHoan.Month, message: "Yêu cầu" }]}>
                <InputNumber min={1} style={{ width: 100 }} disabled={loaiTriHoan != TimeTriHoan.Month} />
              </Form.Item>
            </Col>
            <Col style={{ marginLeft: 10, display: "flex", alignItems: "center" }}>
              <Radio value={TimeTriHoan.Year}>Năm</Radio>
              <Form.Item style={{ marginBottom: 0 }} name={loaiTriHoan == TimeTriHoan.Year ? "DelayTime" : ""} rules={[{ required: loaiTriHoan == TimeTriHoan.Year, message: "Yêu cầu" }]}>
                <InputNumber min={1} style={{ width: 100 }} disabled={loaiTriHoan != TimeTriHoan.Year} />
              </Form.Item>
            </Col>
            <Col style={{ marginLeft: 10, display: "flex", alignItems: "center" }}>
              <Radio value={TimeTriHoan.Forever}>Vĩnh viễn</Radio>
            </Col>
            <Col style={{ marginLeft: 10, display: "flex", alignItems: "center" }}>
              <Radio value={TimeTriHoan.Temporary}>Trì hoãn tạm thời</Radio>
            </Col>
          </Row>
        </Radio.Group>
      </Form.Item>
    </>
  );
};

export default ThoiGianTriHoan;
