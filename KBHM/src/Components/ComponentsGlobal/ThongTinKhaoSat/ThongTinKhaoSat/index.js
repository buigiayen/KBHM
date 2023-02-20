
import React, { useEffect, useState } from "react";
import {Alert } from 'antd'
import List from '../../../List'
import { GET_PropertiesPerson } from "../../../../Data/Api/DangKyKham";



const Index = (prop) => {
    const [PropertiesPerson, SetPropertiesPerson] = useState();
    useEffect(() => {
        GET_PropertiesPerson(prop.ID).then(
            rs => {
                const data = rs.map(r => {
                    return ({ label: r.Label, value: r.value == "true" ? true : false })
                })
                SetPropertiesPerson(data)
            }
        );
    }, [prop])

    const columns = [
        {
            title: 'Thông tin câu hỏi?',
            dataIndex: 'label',
            key: 'label',
            render: (_, { value }) => (
                <>
                    {value ?  <Alert message={`${_}: ${value? "Có" : "Không"}`} type="warning"  /> :  <Alert  message={`${_}: ${value? "Có" : "Không"}`}  type="success"/>}
                </>
            )
        },



    ];

    return (
        <>
            <List data={PropertiesPerson} columns={columns}/>
        </>
    )
}
export default Index;