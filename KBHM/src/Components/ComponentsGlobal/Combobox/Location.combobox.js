import { useEffect, useMemo, useState } from "react";
import { Get_Category } from "../../Data/Api/Category";
import { Select } from "antd";

const LocationCombobox = (props) => {
  const [ChosseData, SetChooseData] = useState();
  const [Data, setData] = useState([]);
  useEffect(() => {
    async function get() {
     const {location} =  await Get_Category();
        setData(location);
    }
    get();
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
      options={Data ?? []}
    />
  );
};
export default LocationCombobox;
