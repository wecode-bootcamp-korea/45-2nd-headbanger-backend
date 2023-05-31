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
    ) campingZoneNames
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

const cancelReservation = async(userId, reservationId) => {
  const queryRunner = dataSource.createQueryRunner();

  await queryRunner.connect();

  await queryRunner.startTransaction();

  try{
     const result = await queryRunner.query(
      `UPDATE reservations
        SET 
        deleted_at = now(),
        reservation_status_id = ?
      WHERE user_id = ? AND id = ?
      `,[reservationStatusEnum.CANCELLED, userId, reservationId]
    )

    if (result.affectedRows !== 1) throw new Error ('INVALID_MODIFICATION');

    const [modifyResult] = await queryRunner.query(
      `SELECT
        r.id reservationId,
        r.reservation_number reservationNumber,
        c.campsite_name campsiteName,
        DATE_FORMAT(r.start_date, '%Y-%m-%d') startDate,
        DATE_FORMAT(r.end_date, '%Y-%m-%d') endDate,
        r.total_price totalPrice,
        r.total_members totalMembers,
        c.address,
        rg.region_name regionName,
        JSON_ARRAYAGG(
          cz.zone_name
        ) campingZoneNames
      FROM reservations r
      JOIN zones_reservations zr ON r.id = zr.reservation_id
      JOIN camping_zones cz ON cz.id = zr.camping_zone_id
      JOIN camps c ON c.id = cz.camp_id
      JOIN regions rg ON rg.id = c.region_id
      WHERE r.user_id = ? AND r.id = ?
      GROUP BY r.id, c.campsite_name, c.address, rg.region_name`,
      [userId, reservationId]
    )

    await queryRunner.commitTransaction();

    return modifyResult;
  } catch(error) {
    await queryRunner.rollbackTransaction();
    error = new Error('INVALID_DATA');
    error.statusCode = 400;
    throw error;
  } finally {
    await queryRunner.release();
  }
}

module.exports = {
  getScheduledReservationLists,
  getPastReservationLists,
  getCancelledReservationLists,
  cancelReservation
};