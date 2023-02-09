import { Form, Input, Divider, DatePicker } from 'antd';
import SexCombobox from '../Sex.Combobox'
import RegionCombox from '../../Region.Combobox'
import { Row, Col } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useEffect, useMemo, useState } from 'react';

dayjs.extend(customParseFormat);
const Index = (props) => {
    const [DataPerson, SetDataPerson] = useState({
        name: null,
        birthDay: new Date(),
        sex: 1,
        cccd: null,
        phone: null,
        email: null,
        personProperties: [],
        NoiCapCCCD: null,
        DiaChiThuongTruCCCD: null,
        XPHT1:null,
        DiaChiLienLac: null,
        XPHT2: null
    });

    useEffect(() => {
        if (props.dtPerson !== undefined) {
            props.dtPerson(DataPerson);
        }

    }, [DataPerson])
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
                                    <Input
                                        placeholder="NGUYEN VAN A"
                                        value={DataPerson.name}
                                        onChange={(e) => { SetDataPerson({ ...DataPerson, name: e.target.value }) }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item>
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Form.Item label={<b>Ngày sinh</b>} required>
                                    <DatePicker defaultValue={dayjs()} format={'DD/MM/YYYY'} onChange={(date) => { SetDataPerson({ ...DataPerson, birthDay: date.$d }) }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={<b>Giới tính</b>} required>
                                    <SexCombobox Value={(Value) => { SetDataPerson({ ...DataPerson, sex: Value }) }} ></SexCombobox>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Form.Item label={<b>Số CCCD</b>} required>
                                    <Input
                                        placeholder="Số căn cước"
                                        onChange={(e) => { SetDataPerson({ ...DataPerson, cccd: e.target.value }) }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={<b>Nơi cấp</b>}>
                                    <Input placeholder='Địa chỉ cấp' onChange={(e) => { SetDataPerson({ ...DataPerson, NoiCapCCCD: e.target.value })}}></Input>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item>
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Form.Item label={<b>Số điện thoại</b>} required>
                                    <Input
                                        placeholder="0123456789"
                                        onChange={(e) => { SetDataPerson({ ...DataPerson, phone: e.target.value }) }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={<b>Email</b>}>
                                    <Input type='email' placeholder='@gmail.com,@yasuo.com,...' onChange={(e) => { SetDataPerson({ ...DataPerson, email: e.target.value }) }}></Input>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item>
                        <Row gutter={[16, 8]}>
                            <Col span={24}>
                                <Form.Item label={<b>Địa chỉ thường trú (ghi trên CCCD)</b>} required>
                                    <Input
                                        placeholder="Số nhà A"
                                        onChange={(e) => {
                                            SetDataPerson({ ...DataPerson, DiaChiThuongTruCCCD: e.target.value })
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        <Row gutter={[16, 8]}>
                            <Col span={24}>
                                <Form.Item label={<b>Xã/Phường/Huyện/Tỉnh</b>} required>
                                    <RegionCombox valueChange={valueChange => {SetDataPerson({ ...DataPerson, XPHT1: valueChange })}}></RegionCombox>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        <Row gutter={[16, 8]}>
                            <Col span={24}>
                                <Form.Item label={<b>Địa chỉ liên lạc</b>} required>
                                    <Input onChange={(e) => { SetDataPerson({ ...DataPerson, DiaChiLienLac: e.target.value })}}/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        <Row gutter={[16, 8]}>
                            <Col span={24}>
                                <Form.Item label={<b>Xã/Phường/Huyện/Tỉnh</b>} required>
                                    <RegionCombox valueChange={valueChange => {SetDataPerson({ ...DataPerson, XPHT2: valueChange })}}></RegionCombox>
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