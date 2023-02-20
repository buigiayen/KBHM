import { Form, Input, Divider, DatePicker } from 'antd';
import { Row, Col } from 'antd';
import dayjs from 'dayjs';

import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useEffect, useState } from 'react';
import SexCombobox from '../Sex.Combobox'
import RegionCombox from '../../Region.Combobox'
import { GET_PersonInfo } from '../../../Data/Api/DangKyKham';

dayjs.extend(customParseFormat);
const { Search } = Input;
const Index = (props) => {
    const [DataPerson, SetDataPerson] = useState({
        Name: null,
        BirthDay: dayjs(),
        Sex: 1,
        CCCD: null,
        Phone: null,
        Email: null,
        personProperties: [],
        NoiCapCCCD: null,
        DiaChiThuongTru_ChiTiet: null,
        DiaChiThuongTru: null,
        DiaChiLienLac: null,
        DiaChiThuongLienLac_ChiTiet: null,

    });

    useEffect(() => {
        if (props?.dtPerson !== undefined) {
            SetDataPerson(props?.dtPerson);
        }
    }, [props?.dtPerson])

    useEffect(() => {
        if (props?.ValuePerson !== undefined) {
            props?.ValuePerson(DataPerson)
        }
    }, [DataPerson])


    const FetchPeron = async (value) => {
        const pra = {
            text: value,
            row: 1
        }

        await GET_PersonInfo(pra).then(rs => {
            SetDataPerson(rs[0]);
            return rs[0];
        })
    }
    return (
        <>
            <Divider orientation="left"><span style={{ color: 'blue', fontStyle: 'italic' }}>Thông tin người hiến</span></Divider>

            <>
                <Form
                    name="complex-form"
                    labelCol={{
                        span: 8,
                    }}
                    style={{
                        maxWidth: 7000,
                    }}
                >
                    <Form.Item>
                        <Row gutter={[16, 8]}>
                            <Col span={24}>
                                <Form.Item label={<b>Họ và tên</b>} required>
                                    {
                                        props.NotreadOnly ? <Input
                                            placeholder="NGUYEN VAN A"
                                            value={DataPerson?.Name}
                                            onChange={(e) => { SetDataPerson({ ...DataPerson, Name: e.target.value }) }}
                                        /> :
                                            <>{DataPerson?.Name}</>
                                    }

                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item>
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Form.Item label={<b>Ngày sinh</b>} required>
                                    {
                                        props.NotreadOnly ? <DatePicker allowClear={false} value={DataPerson?.BirthDay ? dayjs(DataPerson?.BirthDay) : dayjs()} defaultValue={dayjs()} format={'DD/MM/YYYY'} onChange={(date) => { console.log(date.$d); SetDataPerson({ ...DataPerson, BirthDay: date.$d }) }} /> :
                                            <>{DataPerson?.BirthDay ? dayjs(DataPerson?.BirthDay).format('DD/MM/YYYY') : dayjs().date}</>
                                    }
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={<b>Giới tính</b>} required>
                                    {
                                        props.NotreadOnly ? <SexCombobox defaultValue={DataPerson?.Sex} Value={(Value) => { console.log(Value); SetDataPerson({ ...DataPerson, Sex: Value }) }} ></SexCombobox> :
                                            <>{DataPerson?.Sex == 1 ? "Nam" : "Nữ"}</>
                                    }

                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Form.Item label={<b>Số CCCD</b>} required>
                                    {
                                        props.NotreadOnly ? <Input
                                            placeholder="Số căn cước"
                                            value={DataPerson?.CCCD}
                                            onChange={(e) => { SetDataPerson({ ...DataPerson, CCCD: e.target.value }) }}
                                        /> :
                                            <>{DataPerson?.CCCD}</>
                                    }
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={<b>Nơi cấp</b>}>
                                    {
                                        props.NotreadOnly ? <Input placeholder='Địa chỉ cấp'
                                            value={DataPerson?.NoiCapCCCD}
                                            onChange={(e) => { SetDataPerson({ ...DataPerson, NoiCapCCCD: e.target.value }) }}></Input> :
                                            <>{DataPerson?.NoiCapCCCD}</>
                                    }
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item>
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Form.Item label={<b>Số điện thoại</b>} required>
                                    {
                                        props.NotreadOnly ? <Search placeholder="0123456789" value={DataPerson?.Phone} onSearch={FetchPeron} onChange={(e) => { SetDataPerson({ ...DataPerson, Phone: e.target.value }) }} enterButton /> :
                                            <>{DataPerson?.Phone}</>
                                    }

                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={<b>Email</b>}>
                                    {
                                        props.NotreadOnly ? <Input type='email' value={DataPerson?.Email} placeholder='@gmail.com,...' onChange={(e) => { SetDataPerson({ ...DataPerson, Email: e.target.value }) }}></Input> :
                                            <>{DataPerson?.Email}</>
                                    }
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item>
                        <Row gutter={[16, 8]}>
                            <Col span={24}>
                                <Form.Item label={<b>Địa chỉ thường trú (ghi trên CCCD)</b>} required>
                                    {
                                        props.NotreadOnly ? <Input
                                            placeholder="Số nhà A"
                                            value={DataPerson?.DiaChiThuongTru}
                                            onChange={(e) => {
                                                SetDataPerson({ ...DataPerson, DiaChiThuongTru: e.target.value })
                                            }}
                                        /> :
                                            <>{DataPerson?.DiaChiThuongTru}</>
                                    }

                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        <Row gutter={[16, 8]}>
                            <Col span={24}>
                                <Form.Item label={<b>Xã/Phường/Huyện/Tỉnh</b>} required>
                                    {
                                        props.NotreadOnly ? <RegionCombox Region={DataPerson?.DiaChiThuongTru_ChiTiet} valueChange={valueChange => { SetDataPerson({ ...DataPerson, DiaChiThuongTru_ChiTiet: valueChange }) }}></RegionCombox> :
                                            <>{DataPerson?.DiaChiThuongTru_ChiTiet}</>
                                    }
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        <Row gutter={[16, 8]}>
                            <Col span={24}>
                                <Form.Item label={<b>Địa chỉ liên lạc</b>} required>
                                    {
                                        props.NotreadOnly ? <Input value={DataPerson?.DiaChiLienLac} onChange={(e) => { SetDataPerson({ ...DataPerson, DiaChiLienLac: e.target.value }) }} /> :
                                            <>{DataPerson?.DiaChiLienLac}</>
                                    }

                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        <Row gutter={[16, 8]}>
                            <Col span={24}>
                                <Form.Item label={<b>Xã/Phường/Huyện/Tỉnh</b>} required>
                                    {
                                        props.NotreadOnly ? <RegionCombox Region={DataPerson?.DiaChiThuongLienLac_ChiTiet} valueChange={valueChange => { SetDataPerson({ ...DataPerson, DiaChiThuongLienLac_ChiTiet: valueChange }) }}></RegionCombox> :
                                            <>{DataPerson?.DiaChiThuongLienLac_ChiTiet}</>
                                    }
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>


                </Form>

            </>
        </>

    )

}
export default Index;