
import { Divider, Row, Col, Radio } from 'antd';
import { useState } from 'react';
import { Question } from '../../../Data/UnitData/data';

const Index = () => {
    const [Data, SetData] = useState();
    const SetQuestion = (e,value) => {
        console.log( e.target.value, value.Key)
    }

    const ComponentsGroup = () => {
        return (
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
                                                <Col key={IndexValue} span={10}  xl={17}>
                                                    {Value.ShowText ? <small>- {Value.value}</small> : ""}
                                                </Col>
                                                <Col span={10} xl={6}>
                                                    <Radio.Group onChange={(e) => SetQuestion(e,Value)}>
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

        )
    }
    return (
        <>
            <Divider orientation="left"> <span style={{color:'blue' , fontStyle:'italic'}}>Khảo sát thông tin sức khỏe trước hiến máu <span style={{color:'red' , fontStyle:'italic'}}>*</span></span></Divider>
            <ComponentsGroup /> 
        </>

    )

}
export default Index;