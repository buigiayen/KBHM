import { Button, Checkbox, Form, Input } from 'antd';
import { Row, Col } from 'antd';
import './index.css'
import { useNavigate } from 'react-router-dom';
import { Get_Token } from '../../Data/Api/Login';
import { useEffect, useState } from 'react';


const App = () => {

    var Navigate = useNavigate();
    const [Login, SetLogin] = useState({ userID: null, PasswordWeb: null });
    const VeryfyLogin = () => {
        Get_Token(Login).then(rs => {
            console.log('Loi')
            localStorage.setItem('Token', rs?.token ?? "");
            Navigate('/QuanLyThongTin')
        }).catch(console.log('Loi'));
    }



    return (

        <Form
            className='FormLogin'
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{ maxWidth: 900, marginLeft: 10 }}




        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input onChange={(e) => { SetLogin({ ...Login, userID: e.target.value }) }} />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password onChange={(e) => { SetLogin({ ...Login, PasswordWeb: e.target.value }) }} />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" onClick={VeryfyLogin}>
                    Đăng nhập
                </Button>
            </Form.Item>
        </Form>

    )
}

export default App;