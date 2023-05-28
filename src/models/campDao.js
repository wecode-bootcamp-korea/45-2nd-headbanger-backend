const {dataSource} = require('./dataSource')

const getZoneByCampId = async(campId) => {
  try{
    const [result] = await dataSource.query(
      `SELECT
      JSON_ARRAYAGG(
         JSON_OBJECT(
           "id", cz.id,
           "zoneName", cz.zone_name,
           "additionalPrice", zso.additional_price,
           "maxPeople", zso.max_people,
           "coordinates", 
             JSON_OBJECT(
               "x1", cz.x1,
               "x2", cz.x2,
               "x3", cz.x3,
               "x4", cz.x4,
               "y1", cz.y1,
               "y2", cz.y2,
               "y3", cz.y3,
               "y4", cz.y4 
             )
            ) 
          ) zoneInfo
      FROM camping_zones cz
      JOIN zone_size_options zso ON zso.id = cz.zone_size_option_id
      WHERE cz.camp_id = ?`,
      [campId]
    )
    return result
  }catch(error){
    error = new Error('INVALID_DATA');
    error.statusCode = 400;
    throw error;
  }
}

module.exports = {
  getZoneByCampId
}