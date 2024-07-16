import React from 'react';
import { Tabs, Table, DatePicker, Button, Row, Col, Select, Divider } from 'antd';
import moment from 'moment';
import { DownloadOutlined, PrinterOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Option } = Select;

// Dummy data for demonstration
const salesData = [
  { key: '1', date: '2023-07-01', product: 'Paracetamol 500mg', quantity: 10, total: 70 },
  { key: '2', date: '2023-07-02', product: 'Amoxicilina 500mg', quantity: 5, total: 17.5 },
];

const inventoryData = [
  { key: '1', name: 'Paracetamol 500mg', stock: 200, expiry: '2024-12-31' },
  { key: '2', name: 'Amoxicilina 500mg', stock: 100, expiry: '2023-12-31' },
];

const supplierData = [
  { key: '1', name: 'Proveedor A', contact: '123456789', type: 'Medicamentos', paymentTerms: '30 días' },
];

const financialData = [
  { key: '1', type: 'Ingreso', amount: 500, date: '2023-07-01' },
  { key: '2', type: 'Gasto', amount: 200, date: '2023-07-02' },
];

const customerData = [
  { key: '1', name: 'Cliente A', totalPurchases: 1000 },
  { key: '2', name: 'Cliente B', totalPurchases: 500 },
];

const prescriptionData = [
  { key: '1', date: '2023-07-01', medicine: 'Amoxicilina 500mg', doctor: 'Dr. A', quantity: 2 },
];

const ReportComponent = () => {
  const handleExport = () => {
    console.log('Exporting report...');
  };

  const handlePrint = (data, title) => {
    // Implement logic to send data to JasperReports or other reporting tool
    console.log('Printing report...', data);
    // For now, just open a print dialog with the data
    const printableContent = `
      <h1>${title}</h1>
      <table border="1" cellpadding="5" cellspacing="0">
        <thead>
          <tr>${Object.keys(data[0]).map(key => `<th>${key}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${data.map(row => `<tr>${Object.values(row).map(value => `<td>${value}</td>`).join('')}</tr>`).join('')}
        </tbody>
      </table>
    `;
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(printableContent);
    printWindow.document.close();
    printWindow.print();
  };

  const salesColumns = [
    { title: 'Fecha', dataIndex: 'date', key: 'date' },
    { title: 'Producto', dataIndex: 'product', key: 'product' },
    { title: 'Cantidad', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Total (Bs)', dataIndex: 'total', key: 'total' },
  ];

  const inventoryColumns = [
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Stock', dataIndex: 'stock', key: 'stock' },
    { title: 'Fecha de Vencimiento', dataIndex: 'expiry', key: 'expiry' },
  ];

  const supplierColumns = [
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Contacto', dataIndex: 'contact', key: 'contact' },
    { title: 'Tipo', dataIndex: 'type', key: 'type' },
    { title: 'Condiciones de Pago', dataIndex: 'paymentTerms', key: 'paymentTerms' },
  ];

  const financialColumns = [
    { title: 'Tipo', dataIndex: 'type', key: 'type' },
    { title: 'Monto (Bs)', dataIndex: 'amount', key: 'amount' },
    { title: 'Fecha', dataIndex: 'date', key: 'date' },
  ];

  const customerColumns = [
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Compras Totales (Bs)', dataIndex: 'totalPurchases', key: 'totalPurchases' },
  ];

  const prescriptionColumns = [
    { title: 'Fecha', dataIndex: 'date', key: 'date' },
    { title: 'Medicamento', dataIndex: 'medicine', key: 'medicine' },
    { title: 'Doctor', dataIndex: 'doctor', key: 'doctor' },
    { title: 'Cantidad', dataIndex: 'quantity', key: 'quantity' },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Tabs defaultActiveKey="1">
        {/* Ventas */}
        <TabPane tab="Ventas" key="1">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Ventas Diarias" key="1">
              <Row gutter={16}>
                <Col span={8}>
                  <RangePicker />
                </Col>
                <Col span={8}>
                  <Button icon={<DownloadOutlined />} onClick={handleExport}>Exportar</Button>
                </Col>
                <Col span={8}>
                  <Button icon={<PrinterOutlined />} onClick={() => handlePrint(salesData, 'Ventas Diarias')}>Imprimir Reporte</Button>
                </Col>
              </Row>
              <Divider />
              <Table columns={salesColumns} dataSource={salesData} />
            </TabPane>
            <TabPane tab="Ventas Mensuales" key="2">
              <Row gutter={16}>
                <Col span={8}>
                  <RangePicker />
                </Col>
                <Col span={8}>
                  <Button icon={<DownloadOutlined />} onClick={handleExport}>Exportar</Button>
                </Col>
                <Col span={8}>
                  <Button icon={<PrinterOutlined />} onClick={() => handlePrint(salesData, 'Ventas Mensuales')}>Imprimir Reporte</Button>
                </Col>
              </Row>
              <Divider />
              <Table columns={salesColumns} dataSource={salesData} />
            </TabPane>
            <TabPane tab="Productos Más Vendidos" key="3">
              <Row gutter={16}>
                <Col span={8}>
                  <RangePicker />
                </Col>
                <Col span={8}>
                  <Button icon={<DownloadOutlined />} onClick={handleExport}>Exportar</Button>
                </Col>
                <Col span={8}>
                  <Button icon={<PrinterOutlined />} onClick={() => handlePrint(salesData, 'Productos Más Vendidos')}>Imprimir Reporte</Button>
                </Col>
              </Row>
              <Divider />
              <Table columns={salesColumns} dataSource={salesData} />
            </TabPane>
            <TabPane tab="Márgenes de Ganancia" key="4">
              <Row gutter={16}>
                <Col span={8}>
                  <RangePicker />
                </Col>
                <Col span={8}>
                  <Button icon={<DownloadOutlined />} onClick={handleExport}>Exportar</Button>
                </Col>
                <Col span={8}>
                  <Button icon={<PrinterOutlined />} onClick={() => handlePrint(salesData, 'Márgenes de Ganancia')}>Imprimir Reporte</Button>
                </Col>
              </Row>
              <Divider />
              <Table columns={salesColumns} dataSource={salesData} />
            </TabPane>
          </Tabs>
        </TabPane>

        {/* Inventario */}
        <TabPane tab="Inventario" key="2">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Nivel de Stock Actual" key="1">
              <Row gutter={16}>
                <Col span={8}>
                  <RangePicker />
                </Col>
                <Col span={8}>
                  <Button icon={<DownloadOutlined />} onClick={handleExport}>Exportar</Button>
                </Col>
                <Col span={8}>
                  <Button icon={<PrinterOutlined />} onClick={() => handlePrint(inventoryData, 'Nivel de Stock Actual')}>Imprimir Reporte</Button>
                </Col>
              </Row>
              <Divider />
              <Table columns={inventoryColumns} dataSource={inventoryData} />
            </TabPane>
            <TabPane tab="Productos Próximos a Vencer" key="2">
              <Row gutter={16}>
                <Col span={8}>
                  <RangePicker />
                </Col>
                <Col span={8}>
                  <Button icon={<DownloadOutlined />} onClick={handleExport}>Exportar</Button>
                </Col>
                <Col span={8}>
                  <Button icon={<PrinterOutlined />} onClick={() => handlePrint(inventoryData, 'Productos Próximos a Vencer')}>Imprimir Reporte</Button>
                </Col>
              </Row>
              <Divider />
              <Table columns={inventoryColumns} dataSource={inventoryData} />
            </TabPane>
            <TabPane tab="Historial de Movimientos" key="3">
              <Row gutter={16}>
                <Col span={8}>
                  <RangePicker />
                </Col>
                <Col span={8}>
                  <Button icon={<DownloadOutlined />} onClick={handleExport}>Exportar</Button>
                </Col>
                <Col span={8}>
                  <Button icon={<PrinterOutlined />} onClick={() => handlePrint(inventoryData, 'Historial de Movimientos')}>Imprimir Reporte</Button>
                </Col>
              </Row>
              <Divider />
              <Table columns={inventoryColumns} dataSource={inventoryData} />
            </TabPane>
          </Tabs>
        </TabPane>

        {/* Proveedores */}
        <TabPane tab="Proveedores" key="3">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Rendimiento de Proveedores" key="1">
              <Row gutter={16}>
                <Col span={8}>
                  <RangePicker />
                </Col>
                <Col span={8}>
                  <Button icon={<DownloadOutlined />} onClick={handleExport}>Exportar</Button>
                </Col>
                <Col span={8}>
                  <Button icon={<PrinterOutlined />} onClick={() => handlePrint(supplierData, 'Rendimiento de Proveedores')}>Imprimir Reporte</Button>
                </Col>
              </Row>
              <Divider />
              <Table columns={supplierColumns} dataSource={supplierData} />
            </TabPane>
            <TabPane tab="Historial de Órdenes de Compra" key="2">
              <Row gutter={16}>
                <Col span={8}>
                  <RangePicker />
                </Col>
                <Col span={8}>
                  <Button icon={<DownloadOutlined />} onClick={handleExport}>Exportar</Button>
                </Col>
                <Col span={8}>
                  <Button icon={<PrinterOutlined />} onClick={() => handlePrint(supplierData, 'Historial de Órdenes de Compra')}>Imprimir Reporte</Button>
                </Col>
              </Row>
              <Divider />
              <Table columns={supplierColumns} dataSource={supplierData} />
            </TabPane>
            <TabPane tab="Evaluación de Proveedores" key="3">
              <Row gutter={16}>
                <Col span={8}>
                  <RangePicker />
                </Col>
                <Col span={8}>
                  <Button icon={<DownloadOutlined />} onClick={handleExport}>Exportar</Button>
                </Col>
                <Col span={8}>
                  <Button icon={<PrinterOutlined />} onClick={() => handlePrint(supplierData, 'Evaluación de Proveedores')}>Imprimir Reporte</Button>
                </Col>
              </Row>
              <Divider />
              <Table columns={supplierColumns} dataSource={supplierData} />
            </TabPane>
          </Tabs>
        </TabPane>

        {/* Financiero */}
        <TabPane tab="Financiero" key="4">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Resumen de Ingresos y Gastos" key="1">
              <Row gutter={16}>
                <Col span={8}>
                  <RangePicker />
                </Col>
                <Col span={8}>
                  <Button icon={<DownloadOutlined />} onClick={handleExport}>Exportar</Button>
                </Col>
                <Col span={8}>
                  <Button icon={<PrinterOutlined />} onClick={() => handlePrint(financialData, 'Resumen de Ingresos y Gastos')}>Imprimir Reporte</Button>
                </Col>
              </Row>
              <Divider />
              <Table columns={financialColumns} dataSource={financialData} />
            </TabPane>
            <TabPane tab="ROI por Producto" key="2">
              <Row gutter={16}>
                <Col span={8}>
                  <RangePicker />
                </Col>
                <Col span={8}>
                  <Button icon={<DownloadOutlined />} onClick={handleExport}>Exportar</Button>
                </Col>
                <Col span={8}>
                  <Button icon={<PrinterOutlined />} onClick={() => handlePrint(financialData, 'ROI por Producto')}>Imprimir Reporte</Button>
                </Col>
              </Row>
              <Divider />
              <Table columns={financialColumns} dataSource={financialData} />
            </TabPane>
            <TabPane tab="Balance General" key="3">
              <Row gutter={16}>
                <Col span={8}>
                  <RangePicker />
                </Col>
                <Col span={8}>
                  <Button icon={<DownloadOutlined />} onClick={handleExport}>Exportar</Button>
                </Col>
                <Col span={8}>
                  <Button icon={<PrinterOutlined />} onClick={() => handlePrint(financialData, 'Balance General')}>Imprimir Reporte</Button>
                </Col>
              </Row>
              <Divider />
              <Table columns={financialColumns} dataSource={financialData} />
            </TabPane>
          </Tabs>
        </TabPane>

        {/* Clientes */}
        <TabPane tab="Clientes" key="5">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Historial de Compras por Cliente" key="1">
              <Row gutter={16}>
                <Col span={8}>
                  <RangePicker />
                </Col>
                <Col span={8}>
                  <Button icon={<DownloadOutlined />} onClick={handleExport}>Exportar</Button>
                </Col>
                <Col span={8}>
                  <Button icon={<PrinterOutlined />} onClick={() => handlePrint(customerData, 'Historial de Compras por Cliente')}>Imprimir Reporte</Button>
                </Col>
              </Row>
              <Divider />
              <Table columns={customerColumns} dataSource={customerData} />
            </TabPane>
            <TabPane tab="Clientes Frecuentes" key="2">
              <Row gutter={16}>
                <Col span={8}>
                  <RangePicker />
                </Col>
                <Col span={8}>
                  <Button icon={<DownloadOutlined />} onClick={handleExport}>Exportar</Button>
                </Col>
                <Col span={8}>
                  <Button icon={<PrinterOutlined />} onClick={() => handlePrint(customerData, 'Clientes Frecuentes')}>Imprimir Reporte</Button>
                </Col>
              </Row>
              <Divider />
              <Table columns={customerColumns} dataSource={customerData} />
            </TabPane>
            <TabPane tab="Análisis de Fidelización" key="3">
              <Row gutter={16}>
                <Col span={8}>
                  <RangePicker />
                </Col>
                <Col span={8}>
                  <Button icon={<DownloadOutlined />} onClick={handleExport}>Exportar</Button>
                </Col>
                <Col span={8}>
                  <Button icon={<PrinterOutlined />} onClick={() => handlePrint(customerData, 'Análisis de Fidelización')}>Imprimir Reporte</Button>
                </Col>
              </Row>
              <Divider />
              <Table columns={customerColumns} dataSource={customerData} />
            </TabPane>
          </Tabs>
        </TabPane>

        {/* Medicamentos */}
        <TabPane tab="Medicamentos" key="6">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Consumo de Medicamentos con Prescripción" key="1">
              <Row gutter={16}>
                <Col span={8}>
                  <RangePicker />
                </Col>
                <Col span={8}>
                  <Button icon={<DownloadOutlined />} onClick={handleExport}>Exportar</Button>
                </Col>
                <Col span={8}>
                  <Button icon={<PrinterOutlined />} onClick={() => handlePrint(prescriptionData, 'Consumo de Medicamentos con Prescripción')}>Imprimir Reporte</Button>
                </Col>
              </Row>
              <Divider />
              <Table columns={prescriptionColumns} dataSource={prescriptionData} />
            </TabPane>
            <TabPane tab="Historial de Recetas Emitidas" key="2">
              <Row gutter={16}>
                <Col span={8}>
                  <RangePicker />
                </Col>
                <Col span={8}>
                  <Button icon={<DownloadOutlined />} onClick={handleExport}>Exportar</Button>
                </Col>
                <Col span={8}>
                  <Button icon={<PrinterOutlined />} onClick={() => handlePrint(prescriptionData, 'Historial de Recetas Emitidas')}>Imprimir Reporte</Button>
                </Col>
              </Row>
              <Divider />
              <Table columns={prescriptionColumns} dataSource={prescriptionData} />
            </TabPane>
          </Tabs>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ReportComponent;
