import React, { useState } from 'react';
import { Select, Form } from 'antd';
import { Get_Region } from '../Data/Api/Region';
let timeout;
let currentValue;
const fetch = (value, callback) => {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;
    const fake = async () => {
        const params = {
            Status: 5,
            Text: value
        }
        await Get_Region(params).then(rs => {
            const RegionMap = [];
            rs.map(rs => {
                RegionMap.push({
                    value: rs.NameRegion,
                    text: rs.NameRegion,
                })
            }

            )

            callback(RegionMap);
        })
    };
    timeout = setTimeout(fake, 300);
};
const SearchInput = ({ onChange, style,  name,label, Value, propsFormItem, disabled = false , placeholder}) => {
    const [data, setData] = useState([]);
    const [value, setValue] = useState();
    const handleSearch = (newValue) => {
        if (newValue) {
            fetch(newValue, setData);
        } else {
            setData([]);
        }
    };
    const handleChange = (newValue) => {
        setValue(newValue);
        if (onChange !== undefined) {
            onChange(newValue);
        }
    };
    return (
        <Form.Item name={name} label={label} initialValue={Value} {...propsFormItem}>
            <Select
                disabled={disabled}
                showSearch
                placeholder={placeholder}
                defaultValue={value}
                style={style}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={handleSearch}
                onChange={handleChange}
                notFoundContent={null}
                options={(data || []).map((d) => ({
                    value: d.value,
                    label: d.text,
                }))}    
            />
        </Form.Item>
    );
};
const App = ({ onChange, style, Region, name, label, Value, propsFormItem, disabled }) => (
    < SearchInput
        placeholder={Region ?? "Khu vực"}
        onChange={onChange}
        style={style}
        propsFormItem={propsFormItem}
        Value={Value}
        label={label}
        name={name}
        disabled={disabled}
    />
);
export default App;