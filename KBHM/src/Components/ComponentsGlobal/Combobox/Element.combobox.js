import { useEffect, useMemo, useState } from "react";
import { Get_Category } from "../../../Data/Api/Category";
import { Select, Form } from "antd";

const ComboboxIndex = ({ Name, Label, onChange, dataSource, ruler, initialValues, autoClear = false }) => {
  return (
    <Form.Item label={Label} name={Name} rules={ruler} initialValue={initialValues} style={{ marginTop: Name == "LoaiHienThanhPhan" ? 20 : 0 }}>
      <Select
        placeholder={Label}
        defaultValue={initialValues}
        allowClear={autoClear}
        showSearch
        filterOption={(input, option) => (option?.label.toLocaleLowerCase() ?? "").includes(input.toLocaleLowerCase())}
        filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())}
        className={`${Math.random()}`}
        onChange={onChange}
        style={{ width: Name == "LoaiHienThanhPhan" ? "80%" : "100%" }}
        options={dataSource ?? []}
      />
    </Form.Item>
  );
};
export default ComboboxIndex;
