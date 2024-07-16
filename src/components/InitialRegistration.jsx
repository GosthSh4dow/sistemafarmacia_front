import React from 'react';
import { Form, Input, Button, Typography, notification } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axios'; // Asegúrate de que la ruta sea correcta

const { Title } = Typography;

const InitialRegistration = () => {
  const onFinish = async (values) => {
    try {
      const response = await axiosInstance.post('/usuarios', values);
      notification.success({
        message: 'Registro exitoso',
        description: 'El usuario ha sido registrado correctamente.',
      });
      console.log('Received values of form: ', response.data);
    } catch (error) {
      notification.error({
        message: 'Error en el registro',
        description: 'Hubo un error al registrar el usuario. Inténtalo de nuevo.',
      });
      console.error('Error registrando usuario: ', error);
    }
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
        name="initial_registration"
        style={{ 
          maxWidth: '400px', 
          padding: '2rem', 
          background: 'white', 
          borderRadius: '8px', 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
        }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Title level={2} style={{ textAlign: 'center', color: '#00ced1' }}>
          Registro Inicial
        </Title>
        <Form.Item
          name="nombre"
          rules={[{ required: true, message: 'Por favor ingrese su nombre completo!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Nombre completo" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Por favor ingrese su correo electrónico!', type: 'email' }]}
        >
          <Input prefix={<MailOutlined />} placeholder="Correo electrónico" />
        </Form.Item>
        <Form.Item
          name="rol"
          rules={[{ required: true, message: 'Por favor ingrese su rol!' }]}
        >
          <Input placeholder="Rol" />
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
        <Form.Item
          name="confirm_password"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Por favor confirme su contraseña!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Las dos contraseñas que ingresó no coinciden!'));
              },
            }),
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Confirmar contraseña"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%', background: '#1e90ff', borderColor: '#1e90ff' }}>
            Registrarse
          </Button>
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <Link to="/login" style={{ color: '#00ced1' }}>Volver al Login</Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default InitialRegistration;
