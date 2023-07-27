import { Select, Form } from "antd";

const Job = ({ DataSource, Name, label,  rules }) => {
  return (
    <Form.Item name={Name} rules={rules} label={label} style={{ fontWeight: "bold" }}>
      <Select
      showSearch
      filterOption={(input, option) => (option?.label ?? "").toLocaleLowerCase().includes(input.toLocaleLowerCase())}
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? "")
          .toLowerCase()
          .localeCompare((optionB?.label ?? "").toLowerCase())
      }
        className={`${Math.random()}`}
        style={{ width: 100 + "%" }}
        options={DataSource ?? []}
      />
    </Form.Item>
  );
};
export default Job;
