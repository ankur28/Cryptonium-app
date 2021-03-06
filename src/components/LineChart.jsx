import React from 'react';
import { Line } from 'react-chartjs-2';
import { Typography, Select, Row, Col } from 'antd';

const { Title } = Typography;

export const LineChart = ({coinHistory, currentPrice, coinName}) => {
    const coinPrice = [];
    const coinTimeStamp = [];

    // looping until we come to the end of coin history
    for(let i=0 ; i < coinHistory?.data?.history?.length; i+= 1){
        coinPrice.push(coinHistory.data.history[i].price)
        coinTimeStamp.push(new Date(coinHistory.data.history[i].timestamp).toLocaleDateString());

    }

    const data = {
        labels: coinTimeStamp,
        datasets: [
            {
                label: 'Price in USD',
                data: coinPrice,
                fill:false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd'
            }
        ]
    }
    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true 
                    }
                }
            ]
        }
    }

    return (
        <>
            <Row className="chart-header">
                <Title level={2} className="chart-title">
                    {coinName} Price Chart
                </Title>
                <Col className="price-container">
                    <Title className="price-change" level={5}>{coinHistory?.data?.change}%</Title>
                    <Title className="current-price" level={5}>Current {coinName} Price: $ {currentPrice}</Title>
                </Col>
            </Row>
            <Line data={data} options={options} />
        </>
    )
}
