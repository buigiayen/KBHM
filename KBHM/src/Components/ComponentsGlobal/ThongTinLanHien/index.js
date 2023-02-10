import { Form, Input, Divider, DatePicker } from 'antd';
import { Row, Col } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useEffect, useMemo, useState } from 'react';
import SexCombobox from '../Sex.Combobox'
import RegionCombox from '../../Region.Combobox'
import { GET_PersonInfo, GET_PropertiesPerson } from '../../../Data/Api/DangKyKham';
import { FindkeyValueArray } from '../../../Data/UnitData/Convert.Properties'

dayjs.extend(customParseFormat);
const { Search } = Input;
const Index = (props) => {
    const [DataPerson, SetDataPerson] = useState({
        Name: null,
        BirthDay: new Date(),
        Sex: 1,
        CCCD: null,
        Phone: null,
        Email: null,
        personProperties: [],
        NoiCapCCCD: null,
        DiaChiThuongTruCCCD: null,
        XPHT1: null,
        DiaChiLienLac: null,
        XPHT2: null
    });
    const [DataPersonFind, SetDataPersonFind] = useState();
    useEffect(() => {
        if (props.dtPerson !== undefined) {
            props.dtPerson(DataPerson);
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
                                    <Input
                                        placeholder="NGUYEN VAN A"
                                        value={DataPerson?.Name}
                                        onChange={(e) => { SetDataPerson({ ...DataPerson, Name: e.target.value }) }}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item>
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Form.Item label={<b>Ngày sinh</b>} required>
                                    <DatePicker defaultValue={dayjs()} format={'DD/MM/YYYY'} onChange={(date) => { SetDataPerson({ ...DataPerson, BirthDay: date.$d }) }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={<b>Giới tính</b>} required>
                                    <SexCombobox valueDefault={DataPerson?.Sex} Value={(Value) => { SetDataPerson({ ...DataPerson, Sex: Value }) }} ></SexCombobox>
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
                                        value={DataPerson?.CCCD}
                                        onChange={(e) => { SetDataPerson({ ...DataPerson, CCCD: e.target.value }) }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={<b>Nơi cấp</b>}>
                                    <Input placeholder='Địa chỉ cấp'
                                        value={DataPersonFind?.NoiCapCCCD}
                                        onChange={(e) => { SetDataPerson({ ...DataPerson, NoiCapCCCD: e.target.value }) }}></Input>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item>
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Form.Item label={<b>Số điện thoại</b>} required>
                                    <Search placeholder="0123456789" value={DataPerson?.Phone} onSearch={FetchPeron} onChange={(e) => { SetDataPerson({ ...DataPerson, Phone: e.target.value }) }} enterButton />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={<b>Email</b>}>
                                    <Input type='email' value={DataPerson?.Email} placeholder='@gmail.com,@yasuo.com,...' onChange={(e) => { SetDataPerson({ ...DataPerson, Email: e.target.value }) }}></Input>
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
                                        value={DataPersonFind?.DiaChiThuongTruCCCD}
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
                                    <RegionCombox valueChange={valueChange => { SetDataPerson({ ...DataPerson, XPHT1: valueChange }) }}></RegionCombox>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        <Row gutter={[16, 8]}>
                            <Col span={24}>
                                <Form.Item label={<b>Địa chỉ liên lạc</b>} required>
                                    <Input onChange={(e) => { SetDataPerson({ ...DataPerson, DiaChiLienLac: e.target.value }) }} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        <Row gutter={[16, 8]}>
                            <Col span={24}>
                                <Form.Item label={<b>Xã/Phường/Huyện/Tỉnh</b>} required>
                                    <RegionCombox valueChange={valueChange => { SetDataPerson({ ...DataPerson, XPHT2: valueChange }) }}></RegionCombox>
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