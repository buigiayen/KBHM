import React from "react";
import {Table} from 'antd'
const XnTruocHien = () => {
    const dataSource = [
        {
            key: '1',
            CSXN: 'Huyết sắc tố',
            KQ: 32,
            NV: '10 Downing Street',
        },
        {
            key: '2',
            CSXN: 'John',
            KQ: 42,
            NV: '10 Downing Street',
        },
    ];
    const columns = [
        {
            title: 'Chỉ số xét nghiệm',
            dataIndex: 'CSXN',
            key: 'name',
            width : 120,
            filterSearch: true
        },
        {
            title: 'Kết quả',
            dataIndex: 'KQ',
            key: 'age',  
            width : 120
        },
        {
            title: 'Người valid',
            dataIndex: 'NV',
            key: 'address',
            width : 120
        },
    ];
    return (
        <>
            <Table dataSource={dataSource} columns={columns} />
        </>
    )
}
export default XnTruocHien;