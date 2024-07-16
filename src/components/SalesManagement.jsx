import React, { useState, useEffect } from 'react';
import {
  DatePicker, Table, Button, Modal, Form, Input, InputNumber, Select, Tooltip, Popconfirm,
  Row, Col, notification, List, Divider, Badge, Tabs
} from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;
const { TabPane } = Tabs;

const SalesManagement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPrescriptionModalVisible, setIsPrescriptionModalVisible] = useState(false);
  const [sales, setSales] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState({ name: '', ci: '' });
  const [prescription, setPrescription] = useState({});

  const products = [
    { name: 'Paracetamol 500mg', unitPrice: 0.70, stock: 200, requiresPrescription: false, expiryDate: '2024-12-31', lot: 'L2024P500' },
    { name: 'Amoxicilina 500mg', unitPrice: 3.50, stock: 100, requiresPrescription: true, expiryDate: '2023-12-31', lot: 'L2023A500' },
  ];

  useEffect(() => {
    setFilteredProducts(products);
  }, []);

  const handleAddToCart = (values) => {
    const product = products.find(p => p.name === values.productName);
    if (product.requiresPrescription) {
      setPrescription(values);
      setIsPrescriptionModalVisible(true);
      return;
    }
    addToCart(values, product);
  };

  const addToCart = (values, product) => {
    const newCartItem = {
      ...values,
      id: cart.length + 1,
      totalPrice: parseFloat((values.quantity * product.unitPrice).toFixed(2)),
      unitPrice: parseFloat(product.unitPrice.toFixed(2))
    };
    setCart([...cart, newCartItem]);
    setIsModalVisible(false);
    notification.success({ message: 'Producto agregado al carrito' });
  };

  const handlePrescriptionSubmit = (values) => {
    const product = products.find(p => p.name === prescription.productName);
    addToCart({ ...prescription, prescriptionData: values }, product);
    setIsPrescriptionModalVisible(false);
    setPrescription({});
  };

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleSubmitSale = () => {
    if (!selectedCustomer.name || !selectedCustomer.ci) {
      notification.error({ message: 'Por favor ingrese los datos del cliente' });
      return;
    }
    const newSale = {
      id: sales.length + 1,
      products: cart,
      customerName: selectedCustomer.name,
      customerCI: selectedCustomer.ci,
      saleDate: moment().format('YYYY-MM-DD'),
      totalPrice: parseFloat(cart.reduce((acc, item) => acc + item.totalPrice, 0).toFixed(2))
    };
    setSales([...sales, newSale]);
    setCart([]);
    setSelectedCustomer({ name: '', ci: '' });
    setIsModalVisible(false);
    notification.success({ message: 'Venta realizada exitosamente' });
  };

  const handleAddMoreToCart = () => {
    setIsModalVisible(false);
  };

  const showAddModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setCart([]);
    setSelectedCustomer({ name: '', ci: '' });
    setIsModalVisible(false);
    notification.info({ message: 'Orden cancelada' });
  };

  const handleCancelOrder = () => {
    setCart([]);
    setSelectedCustomer({ name: '', ci: '' });
    setIsModalVisible(false);
    notification.info({ message: 'Orden cancelada' });
  };

  const handlePrescriptionCancel = () => {
    setIsPrescriptionModalVisible(false);
    setPrescription({});
  };

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const columns = [
    { title: 'Producto', dataIndex: 'name', key: 'name' },
    { title: 'Stock', dataIndex: 'stock', key: 'stock' },
    {
      title: 'Cantidad',
      key: 'quantity',
      render: (_, record) => (
        <InputNumber
          min={1}
          max={record.stock}
          defaultValue={1}
          formatter={value => `${value}`}
          parser={value => value.replace(/^\$/, '')}
          onChange={(value) => handleAddToCart({ productName: record.name, quantity: value })}
        />
      ),
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <Button
          icon={<ShoppingCartOutlined />}
          onClick={() => handleAddToCart({ productName: record.name, quantity: 1 })}
        >
          Agregar
        </Button>
      ),
    }
  ];

  const salesColumns = [
    { title: 'Fecha', dataIndex: 'saleDate', key: 'saleDate', render: text => moment(text).format('YYYY-MM-DD') },
    { title: 'Cliente', dataIndex: 'customerName', key: 'customerName' },
    { title: 'Productos', dataIndex: 'products', key: 'products', render: products => products.map(p => p.productName).join(', ') },
    { title: 'Precio Total (Bs)', dataIndex: 'totalPrice', key: 'totalPrice' },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Ventas" key="1">
          <Input
            placeholder="Buscar productos"
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ marginBottom: '16px', width: '300px' }}
          />
          <Table columns={columns} dataSource={filteredProducts} rowKey="name" pagination={false} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
            <Button
              type="primary"
              icon={<Badge count={cart.length} style={{ backgroundColor: '#52c41a' }}>
                <ShoppingCartOutlined />
              </Badge>}
              onClick={showAddModal}
            >
              Realizar Venta
            </Button>
          </div>
        </TabPane>
        <TabPane tab="Historial de Ventas" key="2">
          <Table columns={salesColumns} dataSource={sales} rowKey="id" pagination={false} />
        </TabPane>
      </Tabs>

      <Modal
        title="Datos del Cliente y Resumen de la Venta"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          onFinish={handleSubmitSale}
          layout="vertical"
        >
          <div>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="customerName"
                  label="Nombre del Cliente"
                  rules={[{ required: true, message: 'Por favor ingrese el nombre del cliente' }]}
                >
                  <div>
                  <Input
                    value={selectedCustomer.name}
                    onChange={(e) => setSelectedCustomer({ ...selectedCustomer, name: e.target.value })}
                  /></div>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="customerCI"
                  label="NIT o CI"
                  rules={[{ required: true, message: 'Por favor ingrese el NIT o CI del cliente' }]}
                >
                  <div>
                  <Input
                    value={selectedCustomer.ci}
                    onChange={(e) => setSelectedCustomer({ ...selectedCustomer, ci: e.target.value })}
                  /></div>
                </Form.Item>
              </Col>
            </Row>
          </div>
          <Divider />
          <h3>Carrito de Compras</h3>
          <List
            dataSource={cart}
            renderItem={item => (
              <List.Item actions={[
                <Button type="link" onClick={() => handleRemoveFromCart(item.id)}>Eliminar</Button>,
                <InputNumber min={1} defaultValue={item.quantity} formatter={value => `${value}`} parser={value => value.replace(/^\$/, '')} onChange={(value) => {
                  const newCart = cart.map(cartItem => {
                    if (cartItem.id === item.id) {
                      cartItem.quantity = value;
                      cartItem.totalPrice = parseFloat((value * cartItem.unitPrice).toFixed(2));
                    }
                    return cartItem;
                  });
                  setCart(newCart);
                }} />
              ]}>
                <List.Item.Meta
                  title={`${item.productName} - ${item.quantity} unidades`}
                  description={`Precio Unitario: Bs${item.unitPrice.toFixed(2)}, Precio Total: Bs${item.totalPrice.toFixed(2)}`}
                />
              </List.Item>
            )}
          />
          <Divider />
          <h3>Total: Bs${cart.reduce((acc, item) => acc + item.totalPrice, 0).toFixed(2)}</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Popconfirm
              title="¿Estás seguro de cancelar la orden?"
              onConfirm={handleCancelOrder}
              okText="Sí"
              cancelText="No"
            >
              <Button>Cancelar</Button>
            </Popconfirm>
            <Button type="primary" onClick={handleAddMoreToCart}>Agregar más al Carrito</Button>
            <Button type="primary" htmlType="submit">Finalizar Venta</Button>
          </div>
        </Form>
      </Modal>

      <Modal
        title="Datos de la Receta"
        visible={isPrescriptionModalVisible}
        onCancel={handlePrescriptionCancel}
        footer={null}
      >
        <Form onFinish={handlePrescriptionSubmit} layout="vertical">
          <Form.Item name="doctorName" label="Nombre del Doctor" rules={[{ required: true, message: 'Por favor ingrese el nombre del doctor' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="prescriptionNumber" label="Número de la Receta" rules={[{ required: true, message: 'Por favor ingrese el número de la receta' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="date" label="Fecha de la Receta" rules={[{ required: true, message: 'Por favor ingrese la fecha de la receta' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Registrar Receta</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SalesManagement;
