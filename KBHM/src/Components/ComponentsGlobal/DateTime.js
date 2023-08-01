import { DatePicker, Form } from "antd";
import dayjs from "dayjs";


const App = ({ labelFrom, Name }) => {
  return (
    <Form.Item name={Name} label={labelFrom}  style={{ fontWeight: "bold" }}>
      <DatePicker
        allowClear={false}
        defaultValue={dayjs()}
        format="DD/MM/YYYY"
        style={{ width: 100 + "%" }}
        views={["year", "month", "day"]}
      />
    </Form.Item>
  );
};
export default App;
