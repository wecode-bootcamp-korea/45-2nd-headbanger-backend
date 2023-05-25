const productService = require('../services/productService');
const { catchAsync } = require('../middlewares/error');

const getProductList = catchAsync(async (req, res) => {
  const { region, amenity, theme, orderBy, campName, limit, offset } =
    req.query;
  const products = await productService.getProductList(
    region,
    amenity,
    theme,
    orderBy,
    campName,
    limit,
    offset
  );
  return res.status(200).json({ data: products });
});

module.exports = {
  getProductList,
};
