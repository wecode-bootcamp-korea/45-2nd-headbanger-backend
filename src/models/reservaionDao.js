const { dataSource } = require('./dataSource');
const { reservationStatusEnum } = require('./enum');

const reservationListQuery = `
  SELECT
    c.campsite_name campsiteName,
    c.thumbnail,
    r.reservation_number reservationNumber,
    DATE_FORMAT(r.start_date, '%Y-%m-%d') startDate,
    DATE_FORMAT(r.end_date, '%Y-%m-%d') endDate,
    r.total_members totalMembers,
    r.total_price totalPrice,
    JSON_ARRAYAGG(
      cz.zone_name
    ) zoneNames
  FROM camps c
  JOIN camping_zones cz ON c.id = cz.camp_id
  JOIN zones_reservations zr ON cz.id = zr.camping_zone_id
  JOIN reservations r ON zr.reservation_id = r.id`;

const getScheduledReservationLists = async (userId) => {
  try{
    const query = `${reservationListQuery}
    WHERE r.reservation_status_id = ? AND r.user_id = ?
    GROUP BY c.campsite_name, c.thumbnail, r.reservation_number, r.start_date, r.end_date, r.total_members, r.total_price`;

    const scheduledReservation = await dataSource.query(query, [reservationStatusEnum.SCHEDULED, userId])
    
    return scheduledReservation
  } catch (error) {
    console.log(error.message)
    error = new Error('INVALID_DATA');
    error.statusCode = 400;
    throw error;
  }
}

const getPastReservationLists = async (userId) => {
  try{
    const query = `${reservationListQuery}
    WHERE r.reservation_status_id = ? AND r.user_id = ?
    GROUP BY c.campsite_name, c.thumbnail, r.reservation_number, r.start_date, r.end_date, r.total_members, r.total_price`;

    const pastReservation = await dataSource.query(query, [reservationStatusEnum.PAST, userId])
    
    return pastReservation
  } catch (error) {
    error = new Error('INVALID_DATA');
    error.statusCode = 400;
    throw error;
  }
}

const getCancelledReservationLists = async (userId) => {
  try{
    const query = `${reservationListQuery}
    WHERE r.reservation_status_id = ? AND r.user_id = ?
    GROUP BY c.campsite_name, c.thumbnail, r.reservation_number, r.start_date, r.end_date, r.total_members, r.total_price`;

    const cancelledReservation = await dataSource.query(query, [reservationStatusEnum.CANCELLED, userId])
    
    return cancelledReservation
  } catch (error) {
    error = new Error('INVALID_DATA');
    error.statusCode = 400;
    throw error;
  }
}

module.exports = {
  getScheduledReservationLists,
  getPastReservationLists,
  getCancelledReservationLists
};