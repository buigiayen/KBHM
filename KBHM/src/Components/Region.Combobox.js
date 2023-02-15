import React, { useState } from 'react';
import { Select } from 'antd';
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
const SearchInput = (props) => {
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
        if (props.valueChange !== undefined) {
            props.valueChange(newValue);
        }
    };
    return (
        <Select
            showSearch
            defaultValue={value}
            placeholder={props.placeholder}
            style={props.style}
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
    );
};
const App = (props) => (

    < SearchInput
        placeholder={props.Region ?? "Khu vực"}
        value={props.Region ?? "Khu vực"}
        {...props}
    />
);
export default App;