import React, { useState, useEffect } from 'react';
import {
  Table, Button, Modal, Form, Input, Select, Tooltip, Popconfirm, notification, Tabs, Drawer, Descriptions,
  List, Checkbox, Row, Col, Divider, Tag, InputNumber, message
} from 'antd';
import { EditOutlined, DeleteOutlined, ShoppingCartOutlined, PlusOutlined, PrinterOutlined, CloseOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;
const { TabPane } = Tabs;

const SupplierManagement = () => {
  const [isSupplierModalVisible, setIsSupplierModalVisible] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState(suppliers);
  const [searchSupplierText, setSearchSupplierText] = useState('');

  const [isOrderModalVisible, setIsOrderModalVisible] = useState(false);
  const [isAddProductsModalVisible, setIsAddProductsModalVisible] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [searchOrderText, setSearchOrderText] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [selectedProducts, setSelectedProducts] = useState([]);
  
  const products = [
    { id: 1, name: 'Paracetamol 500mg', stock: 200, monthlySales: { Jan: 50, Feb: 40, Mar: 45, Apr: 35, May: 50, Jun: 55, Jul: 60, Aug: 65, Sep: 70, Oct: 75, Nov: 80, Dec: 85 }, estimatedNeed: 60, estimatedCost: 42 },
    { id: 2, name: 'Amoxicilina 500mg', stock: 100, monthlySales: { Jan: 30, Feb: 35, Mar: 40, Apr: 45, May: 50, Jun: 55, Jul: 60, Aug: 65, Sep: 70, Oct: 75, Nov: 80, Dec: 85 }, estimatedNeed: 65, estimatedCost: 227.5 },
  ];

  useEffect(() => {
    filterSuppliers();
    filterOrders();
  }, [suppliers, searchSupplierText, orders, searchOrderText]);

  const filterSuppliers = () => {
    setFilteredSuppliers(
      suppliers.filter(supplier =>
        supplier.name.toLowerCase().includes(searchSupplierText.toLowerCase()) ||
        supplier.contact.toLowerCase().includes(searchSupplierText.toLowerCase())
      )
    );
  };

  const showAddSupplierModal = () => {
    setEditingSupplier(null);
    setIsSupplierModalVisible(true);
  };

  const showEditSupplierModal = (supplier) => {
    setEditingSupplier(supplier);
    setIsSupplierModalVisible(true);
  };

  const handleCancelSupplier = () => {
    setIsSupplierModalVisible(false);
  };

  const handleFinishSupplier = (values) => {
    if (editingSupplier) {
      const updatedSuppliers = suppliers.map(supplier =>
        supplier.id === editingSupplier.id ? { ...values, id: editingSupplier.id } : supplier
      );
      setSuppliers(updatedSuppliers);
      notification.success({ message: 'Proveedor actualizado exitosamente' });
    } else {
      const newSupplier = { ...values, id: suppliers.length + 1 };
      setSuppliers([...suppliers, newSupplier]);
      notification.success({ message: 'Proveedor agregado exitosamente' });
    }
    setIsSupplierModalVisible(false);
  };

  const handleDeleteSupplier = (id) => {
    setSuppliers(suppliers.filter(supplier => supplier.id !== id));
    notification.success({ message: 'Proveedor eliminado exitosamente' });
  };

  const filterOrders = () => {
    setFilteredOrders(
      orders.filter(order =>
        order.supplier.toLowerCase().includes(searchOrderText.toLowerCase()) ||
        order.status.toLowerCase().includes(searchOrderText.toLowerCase())
      )
    );
  };

  const showAddOrderModal = () => {
    setEditingOrder(null);
    setSelectedProducts([]);
    setIsOrderModalVisible(true);
  };

  const showEditOrderModal = (order) => {
    setEditingOrder(order);
    setSelectedProducts(order.products || []);
    setIsOrderModalVisible(true);
  };

  const handleCancelOrder = () => {
    setIsOrderModalVisible(false);
  };

  const handleFinishOrder = (values) => {
    const orderData = {
      ...values,
      products: selectedProducts,
      orderNumber: `ORD-${Math.floor(Math.random() * 10000)}`,
      status: 'Activo',
      creationDate: moment().format('YYYY-MM-DD')
    };
    if (editingOrder) {
      const updatedOrders = orders.map(order =>
        order.id === editingOrder.id ? { ...orderData, id: editingOrder.id } : order
      );
      setOrders(updatedOrders);
      notification.success({ message: 'Orden de compra actualizada exitosamente' });
    } else {
      const newOrder = { ...orderData, id: orders.length + 1 };
      setOrders([...orders, newOrder]);
      notification.success({ message: 'Orden de compra creada exitosamente' });
    }
    setIsOrderModalVisible(false);
  };

  const handleDeleteOrder = (id) => {
    setOrders(orders.filter(order => order.id !== id));
    notification.success({ message: 'Orden de compra eliminada exitosamente' });
  };

  const showOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseOrderDetails = () => {
    setSelectedOrder(null);
  };

  const handlePrintOrder = () => {
    message.success('Se imprimió correctamente');
  };

  const handleCancelOrderStatus = () => {
    const updatedOrders = orders.map(order =>
      order.id === selectedOrder.id ? { ...order, status: 'Cancelado' } : order
    );
    setOrders(updatedOrders);
    setSelectedOrder({ ...selectedOrder, status: 'Cancelado' });
    notification.success({ message: 'Orden cancelada' });
  };

  const showAddProductsModal = () => {
    setIsAddProductsModalVisible(true);
  };

  const handleAddProducts = () => {
    setIsAddProductsModalVisible(false);
    notification.success({ message: 'Productos agregados a la orden de compra' });
  };

  const handleSelectProduct = (product, quantity) => {
    const existingProduct = selectedProducts.find(p => p.id === product.id);
    if (existingProduct) {
      const updatedProducts = selectedProducts.map(p => p.id === product.id ? { ...p, quantity } : p);
      setSelectedProducts(updatedProducts);
    } else {
      setSelectedProducts([...selectedProducts, { ...product, quantity }]);
    }
  };

  const supplierColumns = [
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Contacto', dataIndex: 'contact', key: 'contact' },
    { title: 'Tipo', dataIndex: 'type', key: 'type' },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <>
          <Tooltip title="Editar">
            <Button icon={<EditOutlined />} onClick={() => showEditSupplierModal(record)} type="link" />
          </Tooltip>
          <Tooltip title="Eliminar">
            <Popconfirm
              title="¿Estás seguro de eliminar este proveedor?"
              onConfirm={() => handleDeleteSupplier(record.id)}
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

  const orderColumns = [
    { title: 'Número de Orden', dataIndex: 'orderNumber', key: 'orderNumber' },
    { title: 'Proveedor', dataIndex: 'supplier', key: 'supplier' },
    { title: 'Fecha de Creación', dataIndex: 'creationDate', key: 'creationDate', render: text => moment(text).format('YYYY-MM-DD') },
    { title: 'Estado', dataIndex: 'status', key: 'status', render: status => <Tag color={status === 'Activo' ? 'green' : status === 'Cancelado' ? 'red' : 'blue'}>{status}</Tag> },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <>
          <Tooltip title="Ver Detalles">
            <Button icon={<ShoppingCartOutlined />} onClick={() => showOrderDetails(record)} type="link" />
          </Tooltip>
          <Tooltip title="Editar">
            <Button icon={<EditOutlined />} onClick={() => showEditOrderModal(record)} type="link" />
          </Tooltip>
          <Tooltip title="Eliminar">
            <Popconfirm
              title="¿Estás seguro de eliminar esta orden?"
              onConfirm={() => handleDeleteOrder(record.id)}
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

  const productColumns = [
    {
      title: 'Seleccionar',
      key: 'select',
      render: (text, record) => (
        <Checkbox
          checked={selectedProducts.some(p => p.id === record.id)}
          onChange={(e) => handleSelectProduct(record, e.target.checked ? 1 : 0)}
        />
      )
    },
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Stock', dataIndex: 'stock', key: 'stock' },
    { title: 'Enero', key: 'jan', render: (_, record) => <div>{record.monthlySales.Jan}</div> },
    { title: 'Febrero', key: 'feb', render: (_, record) => <div>{record.monthlySales.Feb}</div> },
    { title: 'Marzo', key: 'mar', render: (_, record) => <div>{record.monthlySales.Mar}</div> },
    { title: 'Abril', key: 'apr', render: (_, record) => <div>{record.monthlySales.Apr}</div> },
    { title: 'Mayo', key: 'may', render: (_, record) => <div>{record.monthlySales.May}</div> },
    { title: 'Junio', key: 'jun', render: (_, record) => <div>{record.monthlySales.Jun}</div> },
    { title: 'Julio', key: 'jul', render: (_, record) => <div>{record.monthlySales.Jul}</div> },
    { title: 'Agosto', key: 'aug', render: (_, record) => <div>{record.monthlySales.Aug}</div> },
    { title: 'Septiembre', key: 'sep', render: (_, record) => <div>{record.monthlySales.Sep}</div> },
    { title: 'Octubre', key: 'oct', render: (_, record) => <div>{record.monthlySales.Oct}</div> },
    { title: 'Noviembre', key: 'nov', render: (_, record) => <div>{record.monthlySales.Nov}</div> },
    { title: 'Diciembre', key: 'dec', render: (_, record) => <div>{record.monthlySales.Dec}</div> },
    { title: 'Total', key: 'total', render: (_, record) => <div>{Object.values(record.monthlySales).reduce((a, b) => a + b, 0)}</div> },
    {
      title: 'Cantidad',
      key: 'quantity',
      render: (text, record) => (
        <InputNumber
          min={1}
          defaultValue={1}
          onChange={(value) => handleSelectProduct(record, value)}
        />
      )
    },
    {
      title: 'Ventas Mensuales y Estimación',
      key: 'monthlySales',
      render: (_, record) => (
        <div>
          <div><strong>Necesidad Estimada:</strong> {record.estimatedNeed} unidades</div>
          <div><strong>Costo Estimado:</strong> Bs. {record.estimatedCost.toFixed(2)}</div>
        </div>
      )
    }
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Proveedores" key="1">
          <Input.Search
            placeholder="Buscar proveedores"
            value={searchSupplierText}
            onChange={(e) => setSearchSupplierText(e.target.value)}
            style={{ marginBottom: '16px', width: '300px' }}
          />
          <Button type="primary" onClick={showAddSupplierModal} style={{ marginBottom: 16 }}>
            Agregar Proveedor
          </Button>
          <Table columns={supplierColumns} dataSource={filteredSuppliers} rowKey="id" />

          <Modal
            title={editingSupplier ? 'Editar Proveedor' : 'Agregar Proveedor'}
            visible={isSupplierModalVisible}
            onCancel={handleCancelSupplier}
            footer={null}
          >
            <Form
              initialValues={editingSupplier ? editingSupplier : {}}
              onFinish={handleFinishSupplier}
              layout="vertical"
            >
              <Form.Item name="name" label="Nombre" rules={[{ required: true, message: 'Por favor ingrese el nombre del proveedor' }]}>
                <Input />
              </Form.Item>
              <Form.Item name="contact" label="Contacto" rules={[{ required: true, message: 'Por favor ingrese el contacto del proveedor' }]}>
                <Input />
              </Form.Item>
              <Form.Item name="type" label="Tipo" rules={[{ required: true, message: 'Por favor seleccione el tipo de proveedor' }]}>
                <Select>
                  <Option value="Medicamentos">Medicamentos</Option>
                  <Option value="Suministros Médicos">Suministros Médicos</Option>
                </Select>
              </Form.Item>
              <Form.Item name="paymentTerms" label="Condiciones de Pago" rules={[{ required: true, message: 'Por favor ingrese las condiciones de pago' }]}>
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {editingSupplier ? 'Actualizar' : 'Agregar'}
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </TabPane>

        <TabPane tab="Órdenes de Compra" key="2">
          <Input.Search
            placeholder="Buscar órdenes"
            value={searchOrderText}
            onChange={(e) => setSearchOrderText(e.target.value)}
            style={{ marginBottom: '16px', width: '300px' }}
          />
          <Button type="primary" onClick={showAddOrderModal} style={{ marginBottom: 16 }}>
            Crear Orden de Compra
          </Button>
          <Table columns={orderColumns} dataSource={filteredOrders} rowKey="id" />

          <Modal
            title={editingOrder ? 'Editar Orden de Compra' : 'Crear Orden de Compra'}
            visible={isOrderModalVisible}
            onCancel={handleCancelOrder}
            footer={null}
          >
            <Form
              initialValues={editingOrder ? editingOrder : {}}
              onFinish={handleFinishOrder}
              layout="vertical"
            >
              <Form.Item name="supplier" label="Proveedor" rules={[{ required: true, message: 'Por favor seleccione el proveedor' }]}>
                <Select>
                  {suppliers.map(supplier => (
                    <Option key={supplier.id} value={supplier.name}>{supplier.name}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Productos">
                <Button type="dashed" onClick={showAddProductsModal} icon={<PlusOutlined />}>
                  Agregar Más
                </Button>
              </Form.Item>
              <List
                dataSource={selectedProducts}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.name}
                      description={`Cantidad: ${item.quantity}`}
                    />
                  </List.Item>
                )}
              />
              <Form.Item name="observations" label="Observaciones">
                <Input.TextArea rows={4} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {editingOrder ? 'Actualizar' : 'Crear'}
                </Button>
              </Form.Item>
            </Form>
          </Modal>

          <Drawer
            title="Detalles de la Orden de Compra"
            width={640}
            placement="right"
            onClose={handleCloseOrderDetails}
            visible={!!selectedOrder}
          >
            {selectedOrder && (
              <div style={{ padding: '16px', backgroundColor: '#f7f7f7', borderRadius: '8px' }}>
                <Descriptions bordered layout="vertical">
                  <Descriptions.Item label="Número de Orden">{selectedOrder.orderNumber}</Descriptions.Item>
                  <Descriptions.Item label="Proveedor">{selectedOrder.supplier}</Descriptions.Item>
                  <Descriptions.Item label="Fecha de Creación">{moment(selectedOrder.creationDate).format('YYYY-MM-DD')}</Descriptions.Item>
                  <Descriptions.Item label="Estado">{selectedOrder.status}</Descriptions.Item>
                  <Descriptions.Item label="Productos" span={3}>
                    <List
                      dataSource={selectedOrder.products}
                      renderItem={item => (
                        <List.Item>
                          <List.Item.Meta
                            title={item.name}
                            description={`Cantidad: ${item.quantity}`}
                          />
                        </List.Item>
                      )}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item label="Observaciones" span={3}>{selectedOrder.observations}</Descriptions.Item>
                </Descriptions>
                <div style={{ marginTop: '16px', textAlign: 'right' }}>
                  <Button icon={<PrinterOutlined />} type="primary" onClick={handlePrintOrder} style={{ marginRight: 8 }}>
                    Imprimir
                  </Button>
                  <Button icon={<CloseOutlined />} type="danger" onClick={handleCancelOrderStatus}>
                    Cancelar Orden
                  </Button>
                </div>
              </div>
            )}
          </Drawer>
        </TabPane>
      </Tabs>

      <Modal
        title="Agregar Productos"
        visible={isAddProductsModalVisible}
        onCancel={() => setIsAddProductsModalVisible(false)}
        footer={null}
        width={1000}
      >
        <Table
          columns={productColumns}
          dataSource={products}
          rowKey="id"
          pagination={false}
          scroll={{ x: 'max-content' }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
          <Button type="primary" onClick={handleAddProducts}>
            Agregar a la Orden de Compra
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default SupplierManagement;
