import { LISTREPORT } from "../../../Data/UnitData/Report";
import { Col, Row } from "reactstrap";
import { Select, Form, Button } from "antd";
import IconCombine from "../../Icon";
import { useState } from "react";
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
  const [ReportID, SetReportID] = useState(process.env.REACT_APP_DEFAULT_REPORT)
  const DataReport = () => {
    const Data = [];
    LISTREPORT.map((rs) => {
      Data.push({ value: rs.value, label: rs.name });
    });
    return Data;
  };
  const CustomerOnchange = (e) => {
   
    SetReportID(e)
    OnChange(e);
  };
  const customerOnClick = () => {
      OnClick(ReportID);
  };
  return (
    <>
      {/* <Col sm={24} md={4} xs={12}>
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
      </Col> */}
      <Col sm={24} md={4} xs={12}>
        <Button
        style={{width:100+'%'}}
          icon={<IconCombine.PrinterOutlined />}
          onClick={customerOnClick}>
          In phiếu
        </Button>
      </Col>
    </>
  );
};
export { ReportCombobox };
