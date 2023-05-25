const campDao = require('../models/campDao');

const getZoneByCampId = async (campId) => {
  return campDao.getZoneByCampId(campId);
};

module.exports = {
  getZoneByCampId,
};
