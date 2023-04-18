import { useEffect, useMemo, useState } from "react";
import { GET_Element } from "../../Data/Api/Category";
import { Select } from "antd";

const ElementCombobox = (props) => {
  const [isLoading, SetisLoading] = useState();
  const [ChosseData, SetChooseData] = useState();
  const [Data, setData] = useState([]);
  useEffect(() => {
    SetisLoading(true);
    async function get() {
      await GET_Element().then((rs) => {
        let data = [];
        if(rs !== undefined){
          rs.forEach(element => {
            const Result = {
              value : element.value + "",
              label: element.label + "",
            }
            data.push(Result);
          });
        }
        console.log(data)
        setData(data);
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
}
export default ElementCombobox;

