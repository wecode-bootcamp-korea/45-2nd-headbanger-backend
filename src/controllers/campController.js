const campService = require('../services/campService');
const { catchAsync } = require('../middlewares/error');

const getZoneByCampId = catchAsync(async (req, res) => {
    const { campId } = req.params;

    const result = await campService.getZoneByCampId(campId);

    if (!result.zoneInfo) {
      const error = new Error('INVALID_DATA');
      error.statusCode = 400;
      throw error;
    }

    return res.status(200).json({ message: 'GET SUCCESS', result});
  });

  module.exports = {
    getZoneByCampId,
  };