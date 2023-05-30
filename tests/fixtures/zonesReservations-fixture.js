const { dataSource } = require("../../src/models/dataSource")

const createZonesReservations = (zonesReservationList) => {
  let data = [];

  for (const zonesReservation of zonesReservationList) {
    data.push([
      zonesReservation.id,
      zonesReservation.reservationId,
      zonesReservation.campingZoneId
    ]);
  }

  return dataSource.query(
    `INSERT INTO zones_reservations (
      id,
      reservation_id,
      camping_zone_id
    ) VALUES ?
  `, [ data ]
  )
}


module.exports = { createZonesReservations }