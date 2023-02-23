import { useEffect, useMemo, useState } from "react";
import { GET_Element } from "../../Data/Api/Category";
import { Select } from "antd";

const ElementCombobox = (props) => {
  const [isLoading, SetisLoading] = useState();
  const [ChosseData , SetChooseData] = useState();
  const [Data, setData] = useState([]);
  useEffect(() => {
    SetisLoading(true);
    async function get() {
      await GET_Element().then((rs) => {
        setData(rs);
      });
    }
    setTimeout(() => {
      get();
      SetisLoading(false);
  }, 4000);
  
  }, []);

  const ReturnValue = (value) => {
    console.log(value);
    if (props.onChangeValue !== undefined) {
      props.onChangeValue(value);
      SetChooseData(value);
    }

  };

  return (
    <Select
      className={`${Math.random()}`}
      value= {props?.valueDefault ?? ChosseData}
      onChange={ReturnValue}
      style={{ width: 100 + "%" }}
      {...props}
      loading={isLoading}
      options={Data ?? []}
      
    />
  );
}
export default ElementCombobox;

