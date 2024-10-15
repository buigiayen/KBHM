import { useEffect, useMemo, useState } from "react";
import { Get_Category } from "../../../Data/Api/Category";
import { Select, Form } from "antd";

const ComboboxIndex = ({ Name, Label, onChange, dataSource, ruler, initialValues, autoClear = false }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (dataSource?.length > 0) {
      const newDataSource = dataSource.map((item) => ({
        ...item,
        value: parseInt(item.value),
      }));
      setData(newDataSource);
    } else {
      setData([]);
    }
  }, [dataSource]);

  return (
    <Form.Item label={Label} name={Name} rules={ruler} initialValue={initialValues}>
      <Select
        placeholder={Label}
        defaultValue={initialValues}
        allowClear={autoClear}
        showSearch
        filterOption={(input, option) => (option?.label.toLocaleLowerCase() ?? "").includes(input.toLocaleLowerCase())}
        className={`${Math.random()}`}
        onChange={onChange}
        style={{ width: 100 + "%" }}
        options={data ?? []}
      />
    </Form.Item>
  );
};
export default ComboboxIndex;
