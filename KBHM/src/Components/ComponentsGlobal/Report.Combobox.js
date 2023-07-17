import { LISTREPORT } from "../../Data/UnitData/Report";
import { Col, Row } from "reactstrap";
import { Select, Form, Button } from "antd";
import IconCombine from "../Icon";
const GetDefault = () => {
  let Report = "";
  if (process.env.REACT_APP_DEFAULT_REPORT) {
    Report = process.env.REACT_APP_DEFAULT_REPORT ?? "";
  }
  if (global.localStorage.getItem("Report")) {
    Report = global.localStorage.getItem("Report") ?? "";
  }
  return Report;
};
const ReportCombobox = ({ Properties, OnChange, OnClick, from }) => {
  const DataReport = () => {
    const Data = [];
    LISTREPORT.map((rs) => {
      Data.push({ value: rs.value, label: rs.name });
    });
    return Data;
  };
  const CustomerOnchange = (e) => {
    global.localStorage.setItem("Report", e);
    OnChange(e);
  };
  const customerOnClick = () => {
    from?.validateFields().then((e) => {
      OnClick(e?.reportID);
    });
  };
  return (
    <>
      <Col md={4} xs={12}>
        <Form.Item name={"reportID"} initialValue={GetDefault()}>
          <Select
            className={`${Math.random()}`}
            placeholder="Lựa chọn trang in"
            onChange={CustomerOnchange}
            style={{ width: 100 + "%" }}
            {...Properties}
            options={DataReport() ?? []}
          />
        </Form.Item>
      </Col>
      <Col md={4} xs={12}>
        <Button
          icon={<IconCombine.PrinterOutlined />}
          onClick={customerOnClick}>
          In phiếu
        </Button>
      </Col>
    </>
  );
};
export { ReportCombobox };
