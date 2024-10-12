import { Checkbox, Col, Divider, Form, Input, Row } from "antd";
import { disease, NotDetermined, PositiveAgain, risk, Standard } from "../../../../Data/UnitData/data";
import { showDiseaseCheckbox, showPositiveCheckbox, showRiskCheckbox, showStandardCheckbox, showUndeterminedCheckbox } from "./helper";

const ThongTinTriHoan = ({}) => {
  return (
    <>
      <Divider orientation="left">Không đạt</Divider>
      <Form.Item label="1. Người hiến máu có các triệu chứng/ tiền căn mắc các bệnh lây nhiễm">
        <Row>{showDiseaseCheckbox()}</Row>
      </Form.Item>
      <Form.Item label="2. Người hiến máu thuộc nhóm người có nguy cơ">
        <Row>{showRiskCheckbox()}</Row>
      </Form.Item>
      <Form.Item label="3. Người hiến máu có hình xăm, xỏ khuyên,..." name="Tattoo" valuePropName="checked">
        <Checkbox />
      </Form.Item>
      <Form.Item label="4. Người hiến máu có các dấu hiệu và triệu chứng của bệnh CJD/ biến thể CJD/ đã chết vì căn bệnh này" name="CJD" valuePropName="checked">
        <Checkbox />
      </Form.Item>
      <Form.Item label="5. Người hiến máu sử dụng hormon kích thích tăng trưởng tuyến yên" name="Hormon" valuePropName="checked">
        <Checkbox />
      </Form.Item>
      <Form.Item labelCol={{ span: 24 }} label="6. Người hiến máu không đủ các tiêu chuẩn sức khỏe và tiêu chuẩn lựa chọn theo quy định tại thời điểm hiến máu">
        <Row>{showStandardCheckbox()}</Row>
      </Form.Item>
      <Form.Item label="Khác" name="Other">
        <Input />
      </Form.Item>
      <Form.Item label="7. Người hiến máu có kết quả XN thử lại dương tính/ nghi nghờ với">
        <Row>{showPositiveCheckbox()}</Row>
      </Form.Item>
      <Form.Item label="8. Người hiến máu có kết quả nhóm máu không xác định">
        <Row>{showUndeterminedCheckbox()}</Row>
      </Form.Item>
    </>
  );
};

export default ThongTinTriHoan;
