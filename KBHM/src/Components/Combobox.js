import { Select } from 'antd';

const App = ({ onChange, valueDefault, data, props }) => {
    return (<Select
        defaultValue={valueDefault}
        onChange={onChange}
        style={{ width: 100 + '%' }}
        options={
            data ?? []
        }
        {...props}
    />)
}
export default App;