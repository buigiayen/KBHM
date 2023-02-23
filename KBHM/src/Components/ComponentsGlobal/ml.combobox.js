import { useEffect, useMemo, useState } from "react";
import { GET_Ml } from "../../Data/Api/Category";
import { Select } from "antd";

const MLCombobox = (props) => {
  const [isLoading, SetisLoading] = useState();
  const [ChosseData, SetChooseData] = useState();
  const [Data, setData] = useState([]);
  useEffect(() => {
    SetisLoading(true);
    function get() {
     
        GET_Ml().then((rs) => {
        setData(rs);
      });
    }
    setTimeout(() => {
      get();
      SetisLoading(false);
    }, 4000);
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
      loading={isLoading}
      options={Data ?? []}
    />
  );
};
export default MLCombobox;


