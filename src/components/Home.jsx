/*import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
const { Title } = Typography;
import { useGetCryptosQuery } from "../services/cryptoApi";
import Cryptocurrencies from "./Cryptocurrencies";
import Loader from "./Loader";

const Home = () => {
  const { data, isFetching, error } = useGetCryptosQuery(10);
  
  if (isFetching) return <Loader />;
  if (error) return <div>Error fetching data</div>;

  // Add a fallback for undefined data
  const globalStats = data || {};
  console.log("data",data);
console.log("globalStats",globalStats);
  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic 
            title="Total Cryptocurrencies" 
            value={globalStats?.total || 0} // 👈 Add optional chaining
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={millify(globalStats?.totalExchanges || 0)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={millify(globalStats?.totalMarketCap || 0)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={millify(globalStats?.total24hVolume || 0)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(globalStats?.totalMarkets || 0)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the world
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
    </>
  );
};

export default Home;
*/
import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Cryptocurrencies from "./Cryptocurrencies";
import Loader from "./Loader";

const { Title } = Typography;

const Home = () => {
  // Request 10 coins
  const { data, isFetching, error } = useGetCryptosQuery(10);

  if (isFetching) return <Loader />;
  if (error) return <div>Error fetching data</div>;

  // Destructure stats and coins from the response
  const { stats, coins } = data || { stats: {}, coins: [] };

  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={stats?.totalCoins || 0} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Exchanges" value={millify(stats?.totalExchanges || 0)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Market Cap" value={millify(stats?.totalMarketCap || 0)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total 24h Volume" value={millify(stats?.total24hVolume || 0)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Markets" value={millify(stats?.totalMarkets || 0)} />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the world
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
    </>
  );
};

export default Home;
