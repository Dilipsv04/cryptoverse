import React, { useEffect, useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import LineChart from "./LineChart";
import Loader from "../components/Loader";
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from "../services/cryptoApi";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  // Default time period is "7d"
  const [timePeriod, setTimePeriod] = useState("7d");
  const [coinHistory, setCoinHistory] = useState([]);

  // Currency toggle state: "USD" or "INR"
  const [currency, setCurrency] = useState("USD");
  // Example conversion factor: 1 USD = 75 INR (adjust as needed)
  const conversionFactor = currency === "INR" ? 75 : 1;

  const { data: coinHistoryData, error: historyError } = useGetCryptoHistoryQuery({ coinId, timePeriod });
  const { data, isFetching, error: detailsError } = useGetCryptoDetailsQuery(coinId);

  useEffect(() => {
    console.log("coinHistoryData", coinHistoryData);
    setCoinHistory(coinHistoryData || []);
  }, [coinHistoryData]);

  const cryptoDetails = data || {};

  if (isFetching) return <Loader />;
  if (historyError || detailsError) return <div>Error fetching data</div>;

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];
  const volume = cryptoDetails?.["24hVolume"];

  // For stats display, we still show milified values.
  const stats = [
    {
      title: "Price",
      value: `${currency === "USD" ? "$" : "₹"} ${millify((cryptoDetails?.price || 0) * conversionFactor)}`,
      icon: <DollarCircleOutlined />,
    },
    { 
      title: "Rank", 
      value: cryptoDetails?.rank || "N/A", 
      icon: <NumberOutlined /> 
    },
    {
      title: "24h Volume",
      value: `${currency === "USD" ? "$" : "₹"} ${millify((volume || 0) * conversionFactor)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `${currency === "USD" ? "$" : "₹"} ${millify((cryptoDetails?.marketCap || 0) * conversionFactor)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high (daily avg.)",
      value: `${currency === "USD" ? "$" : "₹"} ${millify((cryptoDetails?.allTimeHigh?.price || 0) * conversionFactor)}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets || "N/A",
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges || "N/A",
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Approved Supply",
      value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `${currency === "USD" ? "$" : "₹"} ${millify((cryptoDetails?.supply?.total || 0) * conversionFactor)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `${currency === "USD" ? "$" : "₹"} ${millify((cryptoDetails?.supply?.circulating || 0) * conversionFactor)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails?.name || "Unknown Coin"}
        </Title>
        <p>
          {cryptoDetails?.name || "This cryptocurrency"} live price in {currency}. 
          View value statistics, market cap, and supply.
        </p>
      </Col>

      <Row style={{ marginBottom: "20px" }}>
        <Col span={12}>
          {/* Currency Toggle */}
          <Select defaultValue="USD" onChange={(value) => setCurrency(value)}>
            <Option value="USD">USD</Option>
            <Option value="INR">INR</Option>
          </Select>
        </Col>
        <Col span={12}>
          {/* Time Period Selection */}
          <Select
            defaultValue="7d"
            className="select-timeperiod"
            placeholder="Select Time Period"
            onChange={(value) => setTimePeriod(value)}
          >
            {time.map((date) => (
              <Option key={date}>{date}</Option>
            ))}
          </Select>
        </Col>
      </Row>

      {/* 
          IMPORTANT: Pass the raw price (not a millified string) to LineChart 
          so that multiplication works correctly.
      */}
      <LineChart
        currentPrice={Number(cryptoDetails?.price) || 0}
        coinHistory={coinHistoryData}
        coinName={cryptoDetails?.name || "Unknown"}
        conversionFactor={conversionFactor}
        currency={currency}
      />

      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails?.name} Value Statistics
            </Title>
            <p>An overview showing the stats of {cryptoDetails?.name}</p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col key={title} className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>

        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              Other Statistics
            </Title>
            <p>An overview showing the stats of all cryptocurrencies</p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col key={title} className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>

      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">
            What is {cryptoDetails?.name}?
          </Title>
          <Text>{HTMLReactParser(cryptoDetails?.description || "No description available.")}</Text>
        </Row>

        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
            {cryptoDetails?.name} Links
          </Title>
          {cryptoDetails?.links?.map((link) => (
            <Row className="coin-link" key={link.url}>
              <Title level={5} className="link-name">
                {link.type}
              </Title>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;
