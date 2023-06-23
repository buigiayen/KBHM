import { useEffect, useMemo, useState } from "react";
import { Get_Category } from "../../Data/Api/Category";
import { Select, Form } from "antd";

const ComboboxIndex = ({ Name, Label, onChange, dataSource, ruler }) => {
  return (
    <Form.Item label={Label} name={Name} rules={ruler}>
      <Select
        showSearch
        filterOption={(input, option) => (option?.label ?? "").includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        className={`${Math.random()}`}
        onChange={onChange}
        style={{ width: 100 + "%" }}
        options={dataSource ?? []}
      />
    </Form.Item>
  );
};
export default ComboboxIndex;
