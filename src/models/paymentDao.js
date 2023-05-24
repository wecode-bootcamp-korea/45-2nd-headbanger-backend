const { dataSource } = require('./dataSource');
const { reservationStatusEnum } = require('./enum');

const completePayments = async (
  userId, 
  campingZoneId, 
  startDate, 
  endDate, 
  totalMembers, 
  totalPrice,
  reservationNumber,
  paymentApproval
  ) => {
  const queryRunner = dataSource.createQueryRunner();

  await queryRunner.connect();

  await queryRunner.startTransaction();

  const reservationStatus = reservationStatusEnum.SCHEDULED

  try{
    const reservationResult = await queryRunner.query(
      `INSERT INTO reservations (
        reservation_number,
        start_date,
        end_date,
        total_price,
        total_members,
        user_id,
        reservation_status_id
      ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
      )`,
      [
        reservationNumber,
        startDate,
        endDate,
        totalPrice,
        totalMembers,
        userId,
        reservationStatus
      ])

    await queryRunner.query(
      `INSERT INTO payments (
        payment_data,
        reservation_id
      ) VALUES (
        ?,
        ?
      )`,
      [JSON.stringify(paymentApproval), reservationResult.insertId]
    )

    campingZoneId.map(campingZone => 
      queryRunner.query(
        `INSERT INTO zones_reservations (
          reservation_id,
          camping_zone_id
        ) VALUES (
          ?,
          ?
          )`,
        [reservationResult.insertId, campingZone]
      )
    )

    const [paymentResult] = await queryRunner.query(
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
      WHERE r.id = ?
      GROUP BY r.id, c.campsite_name, c.address, rg.region_name`,
      [reservationResult.insertId]
    )
    await queryRunner.commitTransaction();
    return paymentResult
  } catch (error) {
    await queryRunner.rollbackTransaction();
    error = new Error('DATABASE_CONNECTION_ERROR');
    error.statusCode = 400;
    throw error;
  } finally {
    await queryRunner.release();
  }
}

module.exports = {
  completePayments
};