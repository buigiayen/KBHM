import { Select } from 'antd';

const App = (props) => {
    const handleChange = (value) => {
        if (props.Value !== undefined) {
            props.Value(value);
        }
    }
    return (<Select
        defaultValue={props.valueDefault ?? ""}
        onChange={handleChange}
        style={{ width: 100 + '%' }}
        options={
            props.data ?? []
        }
    />)
}
export default App;