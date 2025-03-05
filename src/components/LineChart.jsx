import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import millify from "millify";
import { Chart as ChartJS } from "chart.js/auto";
const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName, conversionFactor, currency }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  // Use coinHistory.history if available; otherwise, use coinHistory directly.
  const historyData =
    coinHistory && coinHistory.history ? coinHistory.history : coinHistory || [];

  for (let i = 0; i < historyData.length; i++) {
    coinPrice.push(Number(historyData[i].price) * conversionFactor);
    coinTimestamp.push(
      new Date(historyData[i].timestamp * 1000).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: `Price In ${currency}`,
        data: coinPrice,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
        fill: false,
        tension: 0.1,
      },
    ],
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change: {coinHistory?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: {currency === "USD" ? "$" : "₹"}{" "}
            {millify(Number(currentPrice) * conversionFactor, { 
              space: true, 
              precision: 2, 
              units: ["", "K", "M", "B", "T"]
            })}
          </Title>
        </Col>
      </Row>
      <Line className="chart" data={data} />
    </>
  );
};

export default LineChart;
