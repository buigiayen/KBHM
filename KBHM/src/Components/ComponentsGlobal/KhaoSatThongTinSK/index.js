import React from "react";
import { Divider, Row, Col, Radio } from 'antd';
import { useEffect, useState } from 'react';
import { Question } from '../../../Data/UnitData/data';

const Index = ({ Value }) => {
    const [Properties, SetProperties] = useState({ data: [{ key: null, label: null, value: null }] });

    const SetQuestion = (e, value) => {
        const { data } = Properties;
        if (data.filter(p => p.key === value.Key).length === 0) {
            data.push({ key: value.Key, label: value.value, value: e.target.value === 1 ? "true" : "false" })
        } else {
            data.forEach((rs, index) => {
                if (rs.key === value.Key) {
                    data[index].value = e.target.value === 1 ? "true" : "false";
                }
            })
        }
        SetProperties({ data });
    }
    useEffect(() => {
        if (Value !== undefined) {
            const valueRef = Properties.data.filter(p => p.key !== null);
            Value(valueRef); 
        }
    }, [Properties])

    return (
        <>
            <Divider orientation="left"> <span style={{ color: 'blue', fontStyle: 'italic' }}>Khảo sát thông tin sức khỏe trước hiến máu <span style={{ color: 'red', fontStyle: 'italic' }}>*</span></span></Divider>
            <>
                {
                    Question.map((Group, indexGroup) => {
                        return (
                            <>
                                <p key={indexGroup} style={{ color: 'red', fontWeight: 'bold' }}>{Group.value}</p>
                                {
                                    Group.data.map((Value, IndexValue) => {
                                        return (
                                            <Row>
                                                <Col span={1}></Col>
                                                <Col key={IndexValue} span={10} xl={17}>
                                                    {Value.ShowText ? <small>- {Value.value}</small> : ""}
                                                </Col>
                                                <Col span={10} xl={6}>
                                                    <Radio.Group onChange={(e) => SetQuestion(e, Value)}>
                                                        <Radio value={1} size='small'>Có</Radio>
                                                        <Radio value={2} size='small'>Không</Radio>
                                                    </Radio.Group>
                                                </Col>
                                            </Row>
                                        )

                                    })
                                }
                                <br></br>
                            </>

                        )

                    })
                }

            </>
        </>

    )

}
export default Index;