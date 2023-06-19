import { DatePicker, Form } from "antd";
import dayjs from "dayjs";


//1999-11-20T17:00:00.000Z

const App = ({ onChange, value, Name, PropsFormItem }) => {
  const onChangeDatetime = (date, dateString) => {
    if (onChange !== undefined) {
      onChange(ConvertDate(dateString));
    }
  };
  const ConvertDate = (dateString) => {
    let strdate = dateString.split("/");
    let Fomart = `${strdate[2]}-${strdate[1]}-${strdate[0]}` + "T00:00:00.000Z";
    return Fomart;
  };
  return (
    <Form.Item name={Name} {...PropsFormItem} >
      <DatePicker
        allowClear={false}
        onChange={onChangeDatetime}
        defaultValue={dayjs()}
        format="DD/MM/YYYY"
        style={{ width: 100 + '%' }}
        views={["year", "month", "day"]}
      />
    </Form.Item>

  );
};
export default App;
