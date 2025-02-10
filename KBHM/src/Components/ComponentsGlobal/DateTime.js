import { DatePicker, Form } from "antd";
import dayjs from "dayjs";

//1999-08-20T17:00:00.000Z

const App = ({ labelFrom, Name, valueChange, disabled }) => {
  const onChange = (value, datestring) => {
    //Tách chuỗi ngày thành ngày, tháng và năm
    const [day, month, year] = datestring.split("/");
    // Tạo đối tượng Date với thời gian mặc định là 00:00:00
    const date = `${year}-${month}-${day}:00:00.000Z`;
    if (valueChange) {
      valueChange(date);
    }
    const dateObject = new Date(year, month - 1, day);
    return dayjs(dateObject);
  };

  return (
    <Form.Item name={Name} label={labelFrom} style={{ fontWeight: "bold" }}>
      <DatePicker
        defaultValue={dayjs()}
        allowClear={false}
        format={"DD/MM/YYYY"}
        onChange={onChange}
        style={{ width: 100 + "%" }}
        views={["year", "month", "day"]}
        onBlur={(e) => {
          onChange(null, e.target.value);
        }}
        disabled={disabled || false}
      />
    </Form.Item>
  );
};
export default App;
