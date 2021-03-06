import React, { useState, useEffect } from 'react';
import {Button, Menu,  Typography, Avatar, Space} from 'antd';
import {Link } from "react-router-dom";
import icon from '../images/cryptocurrency.png';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from "@ant-design/icons";

export const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(null);


    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener('resize',handleResize);
        handleResize();

        return () => window.removeEventListener('resize',handleResize);
    },[])

    // this hook is called whenever screensize changes
    useEffect(() => {
        if(screenSize < 768){
            setActiveMenu(false);
        }else{
            setActiveMenu(true);
        }
    },[screenSize])

    return (
        <div className="nav-container">
            <div className="logo-container">
                {/*coming from ant design*/}
                <Typography.Title level={2} className="Avatar">
                    <Space>
                        <Avatar src={icon} size="large" shape="square"/>
                        <Link style={{ color: '#fff'}} to="/">Cryptonium</Link>
                    </Space>
                </Typography.Title>
                </div>
                <Button className="menu-control-container" onClick={()=> setActiveMenu(!activeMenu)}>
                    <MenuOutlined />
                </Button>
                {/* only show this menu if active menu is true */}
                {activeMenu && (
                    <Menu theme="dark">
                    <Menu.Item icon= {<HomeOutlined />}>
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item icon= {<FundOutlined />}>
                        <Link to="/cryptocurrencies">CryptoCurrencies</Link>
                    </Menu.Item>
                    <Menu.Item icon= {<MoneyCollectOutlined />}>
                        <Link to="/exchanges">Exchanges</Link>
                    </Menu.Item>
                    <Menu.Item icon= {<BulbOutlined />}>
                        <Link to="/news">News</Link>
                    </Menu.Item>
               </Menu>
                )}
               
            
        </div>
    )
}

export default Navbar;