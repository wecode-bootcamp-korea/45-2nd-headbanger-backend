const productDao = require('../models/productDao');

const getProductList = async (
  regionId,
  amenityId,
  themeId,
  orderBy,
  campName,
  limit,
  offset
) => {
  const campList = await productDao.campList(
    regionId,
    amenityId,
    themeId,
    orderBy,
    campName,
    limit,
    offset
  );
  return campList;
};

const getZoneByCampId = async (campId) => {
  return productDao.getZoneByCampId(campId);
};

const getAvailableCampingZone = async (campId, startDate, endDate) => {
  return productDao.getAvailableCampingZone(campId, startDate, endDate);
};

const getUnavailableCampingZone = async (campId, availableZoneNames) => {
  return productDao.getUnavailableCampingZone(campId, availableZoneNames);
};

const getCampById = async (campId) => {
  try {
    const existCamp = await productDao.checkCampById(campId);

    if (!existCamp) throw error;

    return await productDao.getCampById(campId);
  } catch (err) {
    err = new Error('COULD NOT PROCESS REQUEST');
    err.statusCode = 400;
    throw err;
  }
};

module.exports = {
  getProductList,
  getZoneByCampId,
  getAvailableCampingZone,
  getUnavailableCampingZone,
  getCampById,
};
