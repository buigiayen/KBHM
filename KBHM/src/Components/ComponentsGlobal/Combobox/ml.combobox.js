import { useEffect, useMemo, useState } from "react";
import { Get_Category } from "../../Data/Api/Category";
import { Select } from "antd";

const MLCombobox = (props) => {
  const [ChosseData, SetChooseData] = useState();
  const [Data, setData] = useState([]);
  useEffect(() => {
    async function get() {
     const {ml} =  await Get_Category();
        setData(ml);
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
      className={`${Math.random()}`}
      onChange={ReturnValue}
      style={{ width: 100 + "%" }}
      {...props}
      options={Data ?? []}
    />
  );
};
export default MLCombobox;


