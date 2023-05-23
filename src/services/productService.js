const productDao = require('../models/productDao');

const getProductList = async (
  region,
  amenity,
  theme,
  orderBy,
  campName,
  limit,
  offset
) => {
  const campList = await productDao.campList(
    region,
    amenity,
    theme,
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
