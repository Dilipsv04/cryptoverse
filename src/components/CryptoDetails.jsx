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
  const [timePeriod, setTimePeriod] = useState("5y");
  const [coinHistory, setCoinHistory] = useState([]);

  const { data: coinHistoryData, error: historyError } = useGetCryptoHistoryQuery({ coinId, timePeriod });
  const { data, isFetching, error: detailsError } = useGetCryptoDetailsQuery(coinId);

  useEffect(() => {
    // Add fallback for undefined data

    
    console.log("coinHistoryData?.data",coinHistoryData?.data);
    setCoinHistory(coinHistoryData || []);
  }, [coinHistoryData]);

  const cryptoDetails = data || {};

  if (isFetching) return <Loader />;
  if (historyError || detailsError) return <div>Error fetching data</div>;

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];
  const volume = cryptoDetails?.["24hVolume"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${millify(cryptoDetails?.price || 0)}`, // Added fallback
      icon: <DollarCircleOutlined />,
    },
    { 
      title: "Rank", 
      value: cryptoDetails?.rank || "N/A", 
      icon: <NumberOutlined /> 
    },
    {
      title: "24h Volume",
      value: `$ ${millify(volume || 0)}`, // Added fallback
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${millify(cryptoDetails?.marketCap || 0)}`, // Added fallback
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${millify(cryptoDetails?.allTimeHigh?.price || 0)}`, // Added fallback
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
      value: `$ ${millify(cryptoDetails?.supply?.total || 0)}`, // Added fallback
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${millify(cryptoDetails?.supply?.circulating || 0)}`, // Added fallback
      icon: <ExclamationCircleOutlined />,
    },
  ];
  console.log("coinHistoryData3222",coinHistoryData);
  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails?.name || "Unknown Coin"}
        </Title>
        <p>
          {cryptoDetails?.name || "This cryptocurrency"} live price in US dollars. 
          View value statistics, market cap, and supply.
        </p>
      </Col>

      <Select
        defaultValue="5y"
        className="select-timeperiod"
        placeholder="Select Time Period"
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>

      <LineChart
        currentPrice={millify(cryptoDetails?.price || 0)} // Added fallback
        coinHistory={coinHistoryData}
        coinName={cryptoDetails?.name || "Unknown"}
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