import { Select } from 'antd';
import { useState } from 'react';

const App = (props) => {
    const [Value, setValue] = useState();
    const handleChange = (value) => {
        setValue(value)
        if (props.Value !== undefined) {
            props.Value(value);
        }
    }
    return (<Select
        value={Value ?? props.valueDefault}
        defaultValue={props.valueDefault ?? ""}
        onChange={handleChange}
        style={{ width: 100 + '%' }}
        options={
            props.data ?? []
        }
    />)
}
export default App;