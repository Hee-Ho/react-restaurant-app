import React from 'react';
import { Table } from 'react-bootstrap';

const OrdersInfo = ({order}) => {
  // Adds a decimal point to the price
  const getPrice = (num) => {
    return (num / 100).toFixed(2);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Item Name</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {
          order.map(row => (
            <tr key = {row.item.mid}>
              <td>{row.item.name}</td>
              <td>{row.quantity}</td>
              <td>${getPrice(row.total)}</td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  );
}

export default OrdersInfo
