import { Button, Form, FormProps, Input, InputNumber, message, Select, Space } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ClassModel, ClassOption, MercedesFormField } from '../models/mercedeses';
import { LeftOutlined } from '@ant-design/icons';

const api = import.meta.env.VITE_PRODUCTS_URL;

export default function CreateMercedes() {

    const navigate = useNavigate();

    const [categories, setCategories] = useState<ClassOption[]>([]);

    useEffect(() => {
        fetch(api + "categories")
            .then(res => res.json())
            .then(data => {
                const items = data as ClassModel[];
                setCategories(items.map(x => {
                    return { label: x.name, value: x.id };
                }));
            })
    }, []);

    const onSubmit: FormProps<MercedesFormField>['onFinish'] = (item) => {

        console.log(item);

        fetch(api, {
            method: "POST",
            body: JSON.stringify(item),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(res => {
            if (res.status === 200) {
                message.success("Car created successfully!");
                navigate("/mercedeses");
            }
            else
                message.error("Something went wrong!");
        });
    }

    return (
        <div>
            <Button onClick={() => navigate(-1)} color="default" variant="text" icon={<LeftOutlined />}></Button>

            <h2>Create Mercedes-Benz</h2>

            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 19,
                }}
                layout="horizontal"
                onFinish={onSubmit}
            >
                <Form.Item<MercedesFormField> label="Title" name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Please input!',
                        },
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item<MercedesFormField> label="Price" name="price">
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item<MercedesFormField> label="Discount" name="discount">
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item<MercedesFormField> label="Quantity" name="quantity">
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item<MercedesFormField> label="Class" name="classId">
                    <Select options={categories}></Select>
                </Form.Item>
                <Form.Item<MercedesFormField> label="Description" name="description">
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item<MercedesFormField> label="Image" name="imageUrl">
                    <Input />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 4,
                        span: 16,
                    }}
                >
                    <Space>
                        <Button type="default" htmlType="reset">
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Create
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    )
}