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

module.exports = {
  getProductList,
};
