import { DatePicker } from "antd";
import locale from "antd/es/date-picker/locale/vi_VN";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/vi";

const Datetime = ({ onChange, value, props }) => {
  const DatePase = (date) => {
    return dayjs(date).isValid() ? dayjs(date) : undefined;
  };

  return (
    <DatePicker
      allowClear={false}
      locale={locale}
      style={{ width: "90%" }}
      format={"DD-MM-YYYY"}
      value={DatePase(value)}
      onChange={(e) => {
        onChange(e.format("YYYY-MM-DD[T]HH:mm:ss"));
      }}
      {...props}
    />
  );
};

export default Datetime;
