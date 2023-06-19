import { Select ,Form } from 'antd';

const App = ({ onChange, data, props , Name ,initialValue ,  PropsFormItem}) => {
    return (
        <Form.Item name={Name} initialValue={initialValue} {...PropsFormItem}>
            <Select
                onChange={onChange}
                style={{ width: 100 + '%' }}
                options={
                    data ?? []
                }
                {...props}
            />
        </Form.Item>
    )
}
export default App;