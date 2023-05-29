const {dataSource} = require('./dataSource')

const cancelPayment = async(userId, reservationId) => {
  try{
     const result = await dataSource.query(
      `UPDATE reservations
        SET 
        deleted_at = now(),
        reservation_status_id = 3
      WHERE user_id = ? AND id = ?
      `,[userId, reservationId]
    )

    if(!result.affectedRows) return result.affectedRows;
    return result;
  }catch(error){
    error = new Error('INVALID_DATA');
    error.statusCode = 400;
    throw error;
  }
}

module.exports = {
  cancelPayment
}