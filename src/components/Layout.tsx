import React, { useState } from 'react';
import { Button, Layout, Menu, theme } from 'antd';
import {
  HomeOutlined,
  QuestionCircleOutlined,
  LoginOutlined,
  LogoutOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  PlusOutlined,
  UnorderedListOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { accountService } from '../services/account.service';
import { useAccountContext } from '../contexts/account.context';
const { Header, Content } = Layout;

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const { account, clear } = useAccountContext();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const logout = () => {
    accountService.logout();
    clear();
  }

  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[pathname]}
          items={[
            {
              key: '/',
              icon: <HomeOutlined />,
              label: <Link to="/">Home</Link>,
            },
            {
              key: '/mercedeses',
              icon: <UnorderedListOutlined />,
              label: <Link to="/mercedeses">Catalog</Link>,
            },
            {
              key: '/create',
              icon: <PlusOutlined />,
              label: <Link to="/create">Create</Link>,
            },
            {
              key: '/about',
              icon: <QuestionCircleOutlined />,
              label: <Link to="/about">About</Link>,
            },
          ]
          }
          style={{ flex: 1, minWidth: 0 }}
        />
        <Button
          type="text"
          icon={collapsed ? <ArrowRightOutlined /> : <ArrowLeftOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
          }}
        />
        <div>
          {accountService.isAuthenticated() ?
            <>
              <span>Dear, {account?.email}</span>
              <Button
                type="text"
                icon={<LogoutOutlined />}
                onClick={logout}
                style={{
                  fontSize: '16px',
                  height: 64,
                }}
              >Logout</Button>
            </>
            :
            <>
              <Link to="/login">
                <Button
                  type="text"
                  icon={<LoginOutlined />}
                  style={{
                    fontSize: '16px',
                    color: 'white',
                    height: 64,
                  }}
                >Login</Button>
              </Link>
              <Link to="/register">
                <Button
                  type="text"
                  icon={<UserAddOutlined />}
                  style={{
                    fontSize: '16px',
                    color: 'white',
                    height: 64,
                  }}
                >Register</Button></Link>
            </>
          }
        </div>
      </Header>
      <Content
        style={{
          margin: '24px 16px 10px 100px',
          padding: 10,
          minHeight: 280,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  );
};

export default AppLayout;