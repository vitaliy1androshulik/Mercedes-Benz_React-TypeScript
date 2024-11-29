import { LeftOutlined } from '@ant-design/icons'
import { Button, Flex, Image, Skeleton, Space, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MercedesModel } from '../models/mercedeses';

const api = import.meta.env.VITE_PRODUCTS_URL;

type QuaryParams = {
    id: string;
}

export default function MercedesInfo() {

    const { id } = useParams<QuaryParams>();
    const navigate = useNavigate();
    const [item, setItem] = useState<MercedesModel | null>(null);

    useEffect(() => {
        setTimeout(() => {
            fetch(api + id).then(res => res.json()).then(data => setItem(data));
        }, 5000)
    }, []);

    return (
        <>
            <Button onClick={() => navigate(-1)} color="default" variant="text" icon={<LeftOutlined />}></Button>

            {item
                ?
                <div>
                    <h2>{item.title}</h2>
                    <p>{item.className}</p>
                    <hr />
                    <Image
                        width={200}
                        src={item.imageUrl}
                    />
                    <p>Price: {item.price}$</p>
                    <p>Discount: {item.discount}%</p>
                    <p>Availability: {item.quantity > 0 ?
                        <Tag color="green">{item.quantity}</Tag>
                        :
                        <Tag color="volcano">Out of Stock</Tag>}</p>

                    <p>{item.description}</p>
                </div>
                :
                <Flex gap="middle" vertical>
                    <Space>
                        <Skeleton.Input active />
                        <Skeleton.Input active />
                    </Space>
                    <Skeleton
                        paragraph={{
                            rows: 0,
                        }}
                    />
                    <Skeleton.Image />
                    <Skeleton active />
                </Flex>
            }
        </>
    )
}