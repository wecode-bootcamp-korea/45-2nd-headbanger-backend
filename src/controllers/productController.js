const productService = require('../services/productService');
const { catchAsync } = require('../middlewares/error');

const getProductList = catchAsync(async (req, res) => {
  const { regionId, amenityId, themeId, orderBy, campName, limit, offset } =
    req.query;
  const products = await productService.getProductList(
    regionId,
    amenityId,
    themeId,
    orderBy,
    campName,
    limit,
    offset
  );
  return res.status(200).json({ data: products });
});

const getZoneByCampId = catchAsync(async (req, res) => {
  const { campId } = req.params;

  const result = await productService.getZoneByCampId(campId);

  if (!result.zoneInfo) {
    const error = new Error('INVALID_DATA');
    error.statusCode = 400;
    throw error;
  }

  return res.status(200).json({ message: 'GET SUCCESS', result});
});


const getCampingZone = catchAsync(async (req, res) => {
  const { campId, startDate, endDate } = req.query;

  if(endDate < startDate) return res.status(400).json({message: 'INVALID_DATA'})

  const availableZone = await productService.getAvailableCampingZone(campId, startDate, endDate);

  let availableZoneNames = availableZone.campingZones.map(zoneNames => zoneNames.zoneName)

  const unavailableZone = await productService.getUnavailableCampingZone(campId, availableZoneNames);

  return res.status(200).json({
    availableZones: availableZone.campingZones,
    unavailableZones: unavailableZone.campingZones
  });
});

module.exports = {
  getProductList,
  getZoneByCampId,
  getCampingZone
};
