import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    navigate('/dashboard'); // Redirigir al dashboard
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      background: 'linear-gradient(135deg, #1e90ff, #00ced1)' 
    }}>
      <Form
        name="login"
        style={{ 
          maxWidth: '300px', 
          padding: '2rem', 
          background: 'white', 
          borderRadius: '8px', 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
        }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Title level={2} style={{ textAlign: 'center', color: '#00ced1' }}>
          Farmacia 
        </Title>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Por favor ingrese su nombre de usuario!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Nombre de usuario" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Por favor ingrese su contraseña!' }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Contraseña"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%', background: '#1e90ff', borderColor: '#1e90ff' }}>
            Ingresar
          </Button>
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <Link to="/register" style={{ color: '#00ced1' }}>Registrarse</Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
