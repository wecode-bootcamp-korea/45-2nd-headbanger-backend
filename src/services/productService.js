const productDao = require('../models/productDao');

const getProductList = async (
  userId,
  regionId,
  amenityId,
  themeId,
  orderBy,
  campName,
  limit,
  offset
) => {
  const campList = await productDao.campList(
    userId,
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

const getAllZoneByCampId = async (campId) => {
  return productDao.getAllZoneByCampId(campId);
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
  getAllZoneByCampId,
  getAvailableCampingZone,
  getUnavailableCampingZone,
  getCampById,
};
