import React from 'react';
import type { FormProps } from 'antd';
import { Button, DatePicker, Form, Input, message } from 'antd';
import axios from 'axios';
import { UserFormField } from '../models/accounts';

const api = import.meta.env.VITE_ACCOUNTS_URL;

const onFinish: FormProps<UserFormField>['onFinish'] = (values) => {
    console.log('Success:', values);

    axios.post(api + "register", values).then(res => {
        if (res.status === 200)
            message.success("User registered successfully!");
    }).catch(err => {
        message.error(err.response.data.detail);
    })
};

const Register: React.FC = () => (
    <>
        <h2>Register New User</h2>

        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item<UserFormField>
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<UserFormField>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item<UserFormField>
                label="Phone Number"
                name="phoneNumber"
            >
                <Input />
            </Form.Item>

            <Form.Item<UserFormField>
                label="Birthdate"
                name="birthdate"
            >
                <DatePicker />
            </Form.Item>

            {/* <Form.Item<UserFormField> name="remember" valuePropName="checked" label={null}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item> */}

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
    </>
);

export default Register;