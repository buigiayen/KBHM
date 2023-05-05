import { DatePicker, Input } from "antd";
import dayjs from "dayjs";

//1999-11-20T17:00:00.000Z

const App = (props) => {
  const onChange = (date, dateString) => {
    if (props?.onChange !== undefined) {
      props?.onChange(ConvertDate(dateString));
    }
  };
  const ConvertDate = (dateString) => {
    let strdate = dateString.split("/");
    let Fomart = `${strdate[2]}-${strdate[1]}-${strdate[0]}` + "T00:00:00.000Z";
    return Fomart;
  };
  return (
    <DatePicker
      allowClear={false}
      onChange={onChange}
      format="DD/MM/YYYY"
      value={dayjs(props?.Value)}
  
    />
  );
};
export default App;
