const reviewService = require('../services/reviewService');
const { catchAsync } = require('../middlewares/error');
const upload = multer({ dest: 'uploads/'});
const multer  = require('multer');

const profileImageUpload = catchAsync(async (req, res) => {
  const {image} = req.body;

  await reviewService.profileImageUpload(image);

  return res.status(201).json({ message: `SUCCESS CREATE` });
})

module.exports = {
  profileImageUpload,
}