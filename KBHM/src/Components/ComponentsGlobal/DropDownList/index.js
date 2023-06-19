import { Select, Form } from "antd";
const Index = ({ dataSource, onChange, defaultValue = "", propsSelect, propsFormItem }) => {
    return (
        <Form.Item
            {...propsFormItem}>
            <Select
                allowClear
                onChange={onChange}
                defaultValue={defaultValue}
                options={dataSource ?? []}
                style={{ width: 100 + "%" }}
                {...propsSelect}>
            </Select>
        </Form.Item>

    )

}
export default Index;