import React, { useState, useEffect, useContext } from "react";
import { Button, Typography, Avatar, Switch } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined, FundOutlined, MenuOutlined } from "@ant-design/icons";
import icon from "../assets/cryptocurrency.png";
import { ThemeContext } from "../Themecontxt"; // Correct import

const { Title } = Typography;

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setActiveMenu(screenSize > 800);
  }, [screenSize]);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        {/* Add "gradient-text" in dark mode */}
        <Title level={4} className={`logo ${darkMode ? "gradient-text" : ""}`}>
          <Link to="/">Cryptoverse</Link>
        </Title>
        <Button
          className="menu-control-container"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined />
        </Button>
      </div>

      {activeMenu && (
        <ul className="menu">
          <li className="menu-item">
            <HomeOutlined className="menu-icon" />
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          <li className="menu-item">
            <FundOutlined className="menu-icon" />
            <Link className="link" to="/cryptocurrencies">
              Cryptocurrencies
            </Link>
          </li>
          <li className="menu-item">
            {/* Dark Mode Toggle */}
            <Switch checked={darkMode} onChange={(checked) => setDarkMode(checked)} />
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
