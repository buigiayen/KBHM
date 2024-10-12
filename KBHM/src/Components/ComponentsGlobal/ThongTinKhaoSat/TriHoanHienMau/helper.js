import { Checkbox, Col, Form, Input } from "antd";
import { disease, NotDetermined, PositiveAgain, risk, Standard } from "../../../../Data/UnitData/data";

export const showStandardCheckbox = () => {
  return Standard.map((item, index) => (
    <Col span={index % 3 == 2 ? 12 : 6} style={{ display: "flex" }}>
      <Form.Item name={item.name} style={{ marginBottom: 0 }} valuePropName="checked">
        <Checkbox style={{ alignItems: "center" }}>{item.label}</Checkbox>
      </Form.Item>
      {item.hasInput && (
        <Form.Item name={item.inputName} style={{ width: "70%", marginBottom: 0 }}>
          <Input size="small" />
        </Form.Item>
      )}
    </Col>
  ));
};

export const showDiseaseCheckbox = () => {
  return disease.map((item) => (
    <Form.Item name={item.name} style={{ marginBottom: 0, marginLeft: 4 }} valuePropName="checked">
      <Checkbox>{item.label}</Checkbox>
    </Form.Item>
  ));
};

export const showRiskCheckbox = () => {
  return risk.map((item) => (
    <Form.Item name={item.name} style={{ marginBottom: 0, marginLeft: 4 }} valuePropName="checked">
      <Checkbox>{item.label}</Checkbox>
    </Form.Item>
  ));
};

export const showPositiveCheckbox = () => {
  return PositiveAgain.map((item) => (
    <Form.Item name={item.name} style={{ marginBottom: 0, marginLeft: 4 }} valuePropName="checked">
      <Checkbox>{item.label}</Checkbox>
    </Form.Item>
  ));
};

export const showUndeterminedCheckbox = () => {
  return NotDetermined.map((item) => (
    <Form.Item name={item.name} style={{ marginBottom: 0, marginLeft: 4 }} valuePropName="checked">
      <Checkbox>{item.label}</Checkbox>
    </Form.Item>
  ));
};

export const DateTimeToLocaleDate = (date) => {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
};
