import React, { useContext, useState, useEffect } from 'react';
import {
  Table, Button, Modal, Form, Input, InputNumber, DatePicker, Select, notification, Tooltip, Popconfirm, Row, Col
} from 'antd';
import { ProductContext } from '../contexts/ProductContext';
import moment from 'moment';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

const ProductManagement = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useContext(ProductContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [categories, setCategories] = useState(['Analgésicos', 'Antibióticos']);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    checkProductStatus();
    filterProducts();
  }, [products, searchText]);

  const checkProductStatus = () => {
    products.forEach(product => {
      const expiryDate = moment(product.expiryDate);
      const now = moment();
      const daysToExpire = expiryDate.diff(now, 'days');

      if (daysToExpire <= 30 && daysToExpire > 0) {
        notification.warning({
          message: 'Producto por Vencer',
          description: `El producto ${product.name} está por vencer en ${daysToExpire} días.`
        });
      }

      if (product.stock < 20) {
        notification.error({
          message: 'Bajo Stock',
          description: `El producto ${product.name} tiene bajo stock (${product.stock} unidades).`
        });
      }
    });
  };

  const filterProducts = () => {
    setFilteredProducts(
      products.filter(product =>
        product.name.toLowerCase().includes(searchText.toLowerCase()) ||
        product.category.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  };

  const showAddModal = () => {
    setEditingProduct(null);
    setIsModalVisible(true);
  };

  const showEditModal = (product) => {
    setEditingProduct(product);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFinish = (values) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, { ...values, id: editingProduct.id });
    } else {
      addProduct(values);
    }
    setIsModalVisible(false);
  };

  const getRowStyle = (record) => {
    const expiryDate = moment(record.expiryDate);
    const now = moment();
    const daysToExpire = expiryDate.diff(now, 'days');

    if (daysToExpire <= 0) {
      return { backgroundColor: '#ffcccc' };
    }
    if (daysToExpire <= 30) {
      return { backgroundColor: '#fff3cd' };
    }
    return {};
  };

  const handleAddCategory = (value) => {
    if (value === '+Agregar') {
      setNewCategory('');
      return;
    }
    const formattedValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    if (!categories.includes(formattedValue)) {
      setCategories([...categories, formattedValue]);
      setNewCategory('');
    }
  };

  const handleCategoryInputChange = (e) => {
    const value = e.target.value;
    setNewCategory(value);
  };

  const handleCategoryInputBlur = () => {
    if (newCategory.trim() !== '') {
      handleAddCategory(newCategory);
    }
  };

  const columns = [
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Descripción', dataIndex: 'description', key: 'description' },
    { title: 'Categoría', dataIndex: 'category', key: 'category' },
    { title: 'Precio de Costo (Bs)', dataIndex: 'costPrice', key: 'costPrice' },
    { title: 'Precio de Venta (Bs)', dataIndex: 'salePrice', key: 'salePrice' },
    { title: 'Fecha de Vencimiento', dataIndex: 'expiryDate', key: 'expiryDate', render: text => moment(text).format('YYYY-MM-DD') },
    { title: 'Lote', dataIndex: 'lot', key: 'lot' },
    { title: 'Cantidad en Stock', dataIndex: 'stock', key: 'stock' },
    { title: 'Línea Farmacéutica', dataIndex: 'pharmaceuticalLine', key: 'pharmaceuticalLine' },
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
              title="¿Estás seguro de eliminar este producto?"
              onConfirm={() => deleteProduct(record.id)}
              okText="Sí"
              cancelText="No"
            >
              <Button icon={<DeleteOutlined />} type="link" danger />
            </Popconfirm>
          </Tooltip>
          {(record.stock < 20 || moment(record.expiryDate).diff(moment(), 'days') <= 30) && (
            <Tooltip title="Advertencia">
              <ExclamationCircleOutlined style={{ color: 'red' }} />
            </Tooltip>
          )}
        </>
      )
    }
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Input.Search
        placeholder="Buscar productos"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: '16px', width: '300px' }}
      />
      <Button type="primary" onClick={showAddModal} style={{ marginBottom: 16 }}>
        Agregar Producto
      </Button>
      <Table
        columns={columns}
        dataSource={filteredProducts}
        rowKey="id"
        rowClassName={(record) => (getRowStyle(record) ? 'custom-row-style' : '')}
        rowStyle={(record) => getRowStyle(record)}
      />

      <Modal
        title={editingProduct ? 'Editar Producto' : 'Agregar Producto'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          initialValues={editingProduct ? {
            ...editingProduct,
            expiryDate: moment(editingProduct.expiryDate)
          } : {}}
          onFinish={handleFinish}
          layout="vertical"
        >
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="name" label="Nombre" rules={[{ required: true, message: 'Por favor ingrese el nombre del producto', min: 3 }]}>
                <div>
                <Input />
                </div>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="description" label="Descripción" rules={[{ required: true, message: 'Por favor ingrese la descripción del producto', min: 10 }]}>
              <div>
                <Input />
                </div>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="category" label="Categoría" rules={[{ required: true, message: 'Por favor seleccione una categoría' }]}>
                <Select
                  placeholder="Seleccione una categoría"
                  value={newCategory}
                  onChange={handleAddCategory}
                  onInputKeyDown={(e) => e.stopPropagation()}
                  dropdownRender={menu => (
                    <>
                      {menu}
                      <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                        <Input
                          style={{ flex: 'auto' }}
                          value={newCategory}
                          onChange={handleCategoryInputChange}
                          onBlur={handleCategoryInputBlur}
                          placeholder="Nueva categoría"
                        />
                      </div>
                    </>
                  )}
                >
                  {categories.map(category => (
                    <Option key={category} value={category}>{category}</Option>
                  ))}
                
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="costPrice" label="Precio de Costo (Bs)" rules={[{ required: true, message: 'Por favor ingrese el precio de costo', min: 0.01 }]}>
               <div> <InputNumber min={0} step={0.01} style={{ width: '100%' }} /></div>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="salePrice" label="Precio de Venta (Bs)" rules={[{ required: true, message: 'Por favor ingrese el precio de venta', min: 0.01 }]}>
                <div><InputNumber min={0} step={0.01} style={{ width: '100%' }} /></div>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="expiryDate" label="Fecha de Vencimiento" rules={[{ required: true, message: 'Por favor seleccione la fecha de vencimiento' }]}>
                <div><DatePicker style={{ width: '100%' }} /></div>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="lot" label="Lote" rules={[{ required: true, message: 'Por favor ingrese el número de lote' }]}>
              <div>
                <Input />
                </div>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="stock" label="Cantidad en Stock" rules={[{ required: true, message: 'Por favor ingrese la cantidad en stock', min: 0 }]}>
              <div>  <InputNumber min={0} style={{ width: '100%' }} /></div>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="pharmaceuticalLine" label="Línea Farmacéutica" rules={[{ required: true, message: 'Por favor seleccione una línea farmacéutica' }]}>
                <div>
                <Select>
                  <Option value="Bago">Bago</Option>
                  <Option value="Inti">Inti</Option>
                  {/* Agregar más opciones según sea necesario */}
                </Select>
                </div>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingProduct ? 'Actualizar' : 'Agregar'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <style jsx>{`
        .expired-product {
          background-color: #ffcccc !important;
        }
        .expiring-soon-product {
          background-color: #fff3cd !important;
        }
      `}</style>
    </div>
  );
};

export default ProductManagement;
