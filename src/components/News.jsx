import React, { useState } from 'react'
import { Typography, Select, Row, Col, Avatar, Card, Space } from "antd";
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoAPI';
import { Loader } from './Loader';

const { Text, Title } = Typography;
const { Option } = Select;
const demoImage = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg';

const News = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
    const {data: cryptoNews } = useGetCryptoNewsQuery({newsCategory, count : simplified ? 6 : 12 });
    const { data: cryptosList } = useGetCryptosQuery(100);

    if(!cryptoNews?.value) return <Loader />;
    return (
        <Row gutter={[24,24]}>
            {!simplified && (
                <Col span={14}>
                    <Select showSearch 
                    className="search-news" 
                    placeholder="Selecet a Crypto" 
                    optionFilterProp="childerenm" 
                    onChange={(value) => setNewsCategory(value)}
                    // filtering out options so we only show the typed/selected crypto
                    filterOption={(input,option) => option.children.toLowerCase().indexOf(input.toLowerCase()) > 0}
                    >
                        <Option value="Cryptocurrency">Cryptocurrency</Option>
                        {cryptosList?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}
                    </Select>
                </Col>
            )}
            {cryptoNews?.value.map((news, i) => (
                <Col xs={24} sm={12} lg={12} key={i}>
                    <Card hoverable className="news-card">
                        <a href={news.url} target="_blank" rel="noreferrer">
                            <div className="news-image-container">
                                <Title className="news-title" level={4} >
                                    {news.name}
                                </Title>
                                <img style={{ maxWidth: '200px', maxHeight:'100px' }} src={news?.image?.thumbnail?.contentUrl || demoImage } alt="news"/>
                            </div>
                            <p>{news.description > 100 ? `${news.description.substring(0,100)} ...` : news.description}</p>
                            <div className="provider-container">
                                <div>
                                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                                    <Text className="provider-name">{news.provider[0]?.name}</Text>
                                </div>
                                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default News
