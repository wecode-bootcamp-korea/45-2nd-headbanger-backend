const { dataSource } = require("../../src/models/dataSource")

const createReservationStatus = (reservationStatusList) => {
  let data = [];

  for (const reservationStatus of reservationStatusList) {
    data.push([
      reservationStatus.id,
      reservationStatus.status
    ]);
  }

  return dataSource.query(
    `INSERT INTO reservation_status (
      id,
      status
    ) VALUES ?
  `, [ data ]
  )
}

module.exports = { createReservationStatus }