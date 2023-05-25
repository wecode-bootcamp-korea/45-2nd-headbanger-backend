const productService = require('../services/productService');
const { catchAsync } = require('../middlewares/error');

const getProductList = catchAsync(async (req, res) => {
  const { regionId, amenityId, themeId, orderBy, campName, limit, offset } =
    req.query;
  const userId = req.userId;

  if (userId) {
    const result = await productService.getProductList(
      userId,
      regionId,
      amenityId,
      themeId,
      orderBy,
      campName,
      limit,
      offset
    );
    return res.json({ result });
  } else {
    const result = await productService.getProductList(
      regionId,
      amenityId,
      themeId,
      orderBy,
      campName,
      limit,
      offset
    );
    return res.json({ result });
  }
});

const getAllZoneByCampId = catchAsync(async (req, res) => {
  const { campId } = req.params;

  const result = await productService.getAllZoneByCampId(campId);

  if (!result.zoneInfo) {
    const error = new Error('INVALID_DATA');
    error.statusCode = 400;
    throw error;
  }

  return res.status(200).json({ message: 'GET SUCCESS', result });
});

const getAvailableCampingZone = catchAsync(async (req, res) => {
  const { campId, startDate, endDate } = req.query;

  if (endDate < startDate)
    return res.status(400).json({ message: 'INVALID_DATA' });

  const availableZone = await productService.getAvailableCampingZone(
    campId,
    startDate,
    endDate
  );

  let availableZoneNames = availableZone.campingZones.map(
    (zoneNames) => zoneNames.zoneName
  );

  const unavailableZone = await productService.getUnavailableCampingZone(
    campId,
    availableZoneNames
  );

  return res.status(200).json({
    availableZones: availableZone.campingZones,
    unavailableZones: unavailableZone.campingZones,
  });
});

const getCampById = catchAsync(async (req, res) => {
  const {
    params: { campId },
  } = req;
  const campDetail = await productService.getCampById(campId);

  return res.status(200).json({ message: 'SUCCESS', data: campDetail });
});
const getCategories = catchAsync(async (req, res) => {
  await productService.getCategories;
  return res.json({ result });
});

module.exports = {
  getProductList,
  getAllZoneByCampId,
  getAvailableCampingZone,
  getCampById,
  getCategories,
};
