import React from "react";
import { Checkbox, DatePicker, Form, Input, InputNumber } from "antd";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;
const SearchAble = ({
  dataIndex,
  typeData,
  title,
  onKeyPress,
  initialValue,
}) => {
  const KeyUpDown = ({ key }) => {
    if (key === "Enter") {
      onKeyPress();
    }
  };
  const ExportComponent = ({ typeData, style }) => {
    if (typeData !== undefined) {
      if (typeData.toLowerCase() === "searchdate") {
        return (
          <Form.Item name={dataIndex} label={title} initialValue={initialValue}>
            <RangePicker
              defaultValue={[
                dayjs(),
                dayjs(),
              ]}
              format={'DD/MM/YYYY'}
            />
          </Form.Item>
        );
      }
      if (
        typeData.toLowerCase() === "datetime" ||
        typeData.toLowerCase() === "date"
      ) {
        return (
          <Form.Item name={dataIndex} label={title} initialValue={initialValue}>
            <DatePicker
              style={style}
              onKeyDown={(e) => KeyUpDown({ key: e.key })}
              format={"DD/MM/YYYY 00:00"}
            />
          </Form.Item>
        );
      }
      if (typeData.toLowerCase() === "check") {
        return (
          <Form.Item valuePropName="checked" name={dataIndex}>
            <Checkbox>{title}</Checkbox>
          </Form.Item>
        );
      }
      if (typeData.toLowerCase() === "int") {
        return (
          <Form.Item name={dataIndex} label={title}>
            <InputNumber style={style}></InputNumber>
          </Form.Item>
        );
      }
      return typeData;
    }
    return (
      <Form.Item name={dataIndex} label={title} initialValue={initialValue}>
        <Input style={style} onKeyDown={(e) => KeyUpDown({ key: e.key })} />
      </Form.Item>
    );
  };
  return <ExportComponent typeData={typeData} style={{ width: 100 + "%" }} />;
};
export default SearchAble;
