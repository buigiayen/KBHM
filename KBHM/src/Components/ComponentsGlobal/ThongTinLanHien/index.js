import { Button, Form, Input, Select, Divider, DatePicker } from 'antd';
import SexCombobox from '../Sex.Combobox'
import RegionCombox from '../../Region.Combobox'
import { Row, Col } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
const Index = () => {
    const { Option } = Select;
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    const ComponentsGroup = () => {
        return (
            <>
                <Form
                    name="complex-form"
                    onFinish={onFinish}
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
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item>
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Form.Item label={<b>Ngày sinh</b>} required>
                                <DatePicker defaultValue={dayjs()} format={'DD/MM/YYYY'} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={<b>Giới tính</b>} required>
                                    <SexCombobox></SexCombobox>
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
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={<b>Nơi cấp</b>}>
                                    <Input placeholder='Địa chỉ cấp'></Input>
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
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={<b>Email</b>}>
                                    <Input type='email' placeholder='@gmail.com,@yasuo.com,...'></Input>
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
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        <Row gutter={[16, 8]}>
                            <Col span={24}>
                                <Form.Item label={<b>Xã/Phường/Huyện/Tỉnh</b>} required>
                                    <RegionCombox></RegionCombox>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        <Row gutter={[16, 8]}>
                            <Col span={24}>
                                <Form.Item label={<b>Địa chỉ liên lạc</b>} required>
                                    <Input
                                      
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        <Row gutter={[16, 8]}>
                            <Col span={24}>
                                <Form.Item label={<b>Xã/Phường/Huyện/Tỉnh</b>} required>
                                <RegionCombox></RegionCombox>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>
                  
                  
                </Form>

            </>

        )
    }
    return (
        <>
            <Divider orientation="left"><span style={{color:'blue' , fontStyle:'italic'}}>Thông tin người hiến</span></Divider>
            <ComponentsGroup />

        </>

    )

}
export default Index;