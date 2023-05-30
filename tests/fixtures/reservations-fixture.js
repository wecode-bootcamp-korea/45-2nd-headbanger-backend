const { dataSource } = require("../../src/models/dataSource")

const createReservations = (reservationList) => {
  let data = [];

  for (const reservation of reservationList) {
    data.push([
      reservation.id,
      reservation.reservationNumber,
      reservation.startDate,
      reservation.endDate,
      reservation.totalPrice, 
      reservation.totalMembers, 
      reservation.userId, 
      reservation.reservationStatusId, 
      reservation.createdAt, 
      reservation.updatedAt, 
      reservation.deletedAt
    ]);
  }

  return dataSource.query(
    `INSERT INTO reservations (
      id,
      reservation_number,
      start_date,
      end_date,
      total_price, 
      total_members, 
      user_id, 
      reservation_status_id, 
      created_at, 
      updated_at, 
      deleted_at
    ) VALUES ?
  `, [ data ]
  )
}


module.exports = { createReservations }