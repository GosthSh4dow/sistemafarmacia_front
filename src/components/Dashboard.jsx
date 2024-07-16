import React from 'react';
import { Layout, Menu, Avatar, Typography } from 'antd';
import {
  HomeOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  TeamOutlined,
  BarChartOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Routes, Route, Link } from 'react-router-dom';
import ProductManagement from './ProductManagement';
import SalesManagement from './SalesManagement';
import CustomerManagement from './CustomerManagement';
import SupplierManagement from './SupplierManagement';
import ReportComponent from './ReportComponent';

const { Content, Footer, Sider } = Layout;
const { Text } = Typography;

const user = {
  fullName: 'Luis Acebedo Ayaviri',
};

const getInitials = (name) => {
  const initials = name.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
  return initials;
};

const Dashboard = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div style={{ display: 'flex', alignItems: 'center', padding: '16px', background: 'rgba(255, 255, 255, 0.2)' }}>
          <Avatar size="large">{getInitials(user.fullName)}</Avatar>
          <Text style={{ marginLeft: '10px', color: '#fff' }}>{user.fullName}</Text>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/dashboard">Inicio</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<ShopOutlined />}>
            <Link to="/dashboard/products">Productos</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<ShoppingCartOutlined />}>
            <Link to="/dashboard/sales">Ventas</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            <Link to="/dashboard/customers">Clientes</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<TeamOutlined />}>
            <Link to="/dashboard/suppliers">Proveedores</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<BarChartOutlined />}>
            <Link to="/dashboard/reports">Reportes</Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<LogoutOutlined />}>
            <Link to="/logout">Cerrar Sesión</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '0 16px' }}>
          <Routes>
            <Route path="/" element={<div>Bienvenido al Dashboard</div>} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="sales" element={<SalesManagement/>} />
            <Route path="customers" element={<CustomerManagement/>} />
            <Route path="suppliers" element={<SupplierManagement/>} />
            <Route path="reports" element={<ReportComponent/>}/>
            <Route path="/logout" element={<div>Cerrar Sesión</div>} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: 'center' }}></Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
