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
  }, 3000);
  
  }, []);

  const ReturnValue = (value) => {
    if (props.onChangeValue !== undefined) {
      props.onChangeValue(value);
      SetChooseData(value);
    }

  };

  return (
    <Select
      className={`${Math.random()}`}
      onChange={ReturnValue}
      style={{ width: 100 + "%" }}
    
      loading={isLoading}
      options={Data ?? []}
      {...props}
    />
  );
}
export default ElementCombobox;

