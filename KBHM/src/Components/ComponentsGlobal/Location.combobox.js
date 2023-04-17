import { useEffect, useMemo, useState } from "react";
import { GET_Location } from "../../Data/Api/Category";
import { Select } from "antd";

const LocationCombobox = (props) => {
  const [isLoading, SetisLoading] = useState();
  const [ChosseData, SetChooseData] = useState();
  const [Data, setData] = useState([]);
  useEffect(() => {
    SetisLoading(true);
    function get() {

      GET_Location().then((rs) => {
        setData(rs);
      });
    }
    setTimeout(() => {
      get();
      SetisLoading(false);
    }, 5000);
  }, []);

  const ReturnValue = (value) => {
    if (props.onChangeValue !== undefined) {
      props.onChangeValue(value);
    }
    SetChooseData(value);
  };
  return (
    <Select
      showSearch
      filterOption={(input, option) => (option?.label ?? '').includes(input)}
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
      }
      className={`${Math.random()}`}
      onChange={ReturnValue}
      style={{ width: 100 + "%" }}
      {...props}
      loading={isLoading}
      options={Data ?? []}
    />
  );
};
export default LocationCombobox;
