import React, { useState, useEffect } from 'react';
import {
  Table, Button, Modal, Form, Input, notification, Tooltip, Popconfirm, Row, Col
} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';

const CustomerManagement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState(customers);

  useEffect(() => {
    filterCustomers();
  }, [customers, searchText]);

  const filterCustomers = () => {
    setFilteredCustomers(
      customers.filter(customer =>
        customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
        customer.ci.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  };

  const showAddModal = () => {
    setEditingCustomer(null);
    setIsModalVisible(true);
  };

  const showEditModal = (customer) => {
    setEditingCustomer(customer);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFinish = (values) => {
    if (editingCustomer) {
      const updatedCustomers = customers.map(customer =>
        customer.id === editingCustomer.id ? { ...values, id: editingCustomer.id } : customer
      );
      setCustomers(updatedCustomers);
      notification.success({ message: 'Cliente actualizado exitosamente' });
    } else {
      const newCustomer = { ...values, id: customers.length + 1 };
      setCustomers([...customers, newCustomer]);
      notification.success({ message: 'Cliente agregado exitosamente' });
    }
    setIsModalVisible(false);
  };

  const handleDeleteCustomer = (id) => {
    setCustomers(customers.filter(customer => customer.id !== id));
    notification.success({ message: 'Cliente eliminado exitosamente' });
  };

  const columns = [
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Correo Electrónico', dataIndex: 'email', key: 'email' },
    { title: 'Teléfono', dataIndex: 'phone', key: 'phone' },
    { title: 'NIT o CI', dataIndex: 'ci', key: 'ci' },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <>
          <Tooltip title="Editar">
            <Button icon={<EditOutlined />} onClick={() => showEditModal(record)} type="link" />
          </Tooltip>
          <Tooltip title="Eliminar">
            <Popconfirm
              title="¿Estás seguro de eliminar este cliente?"
              onConfirm={() => handleDeleteCustomer(record.id)}
              okText="Sí"
              cancelText="No"
            >
              <Button icon={<DeleteOutlined />} type="link" danger />
            </Popconfirm>
          </Tooltip>
        </>
      )
    }
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Input.Search
        placeholder="Buscar clientes"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: '16px', width: '300px' }}
      />
      <Button type="primary" onClick={showAddModal} style={{ marginBottom: 16 }}>
        Agregar Cliente
      </Button>
      <Table
        columns={columns}
        dataSource={filteredCustomers}
        rowKey="id"
      />

      <Modal
        title={editingCustomer ? 'Editar Cliente' : 'Agregar Cliente'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          initialValues={editingCustomer ? editingCustomer : {}}
          onFinish={handleFinish}
          layout="vertical"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="name" label="Nombre" rules={[{ required: true, message: 'Por favor ingrese el nombre del cliente' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="email" label="Correo Electrónico" rules={[{ required: true, message: 'Por favor ingrese el correo electrónico del cliente', type: 'email' }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="phone" label="Teléfono" rules={[{ required: true, message: 'Por favor ingrese el teléfono del cliente' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="ci" label="NIT o CI" rules={[{ required: true, message: 'Por favor ingrese el NIT o CI del cliente' }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingCustomer ? 'Actualizar' : 'Agregar'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CustomerManagement;
