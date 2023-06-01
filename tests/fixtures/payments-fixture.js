const { dataSource } = require('../../src/models/dataSource');

const createPayments = (paymentList) => {
  let data = [];

  for (const payment of paymentList) {
    data.push([
      payment.id,
      payment.paymentData,
      payment.reservationId,
      payment.createdAt, 
      payment.deletedAt
    ]);
  }

  return dataSource.query(
    `INSERT INTO payments (
      id,
      payment_data,
      reservation_id,
      created_at,
      deleted_at
    ) VALUES ?
  `,
    [data]
  );
};

module.exports = { createPayments };
