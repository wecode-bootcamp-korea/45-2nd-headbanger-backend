const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const s3 = new AWS.S3({
  accessKeyId: process.env.MY_ACCESS_KEY_ID,
  secretAccessKey: process.env.MY_SECRET_ACCESS_KEY,
  region: process.env.MY_AWS_S3_BUCKET_REGION
})

const uploadKey = uuidv4();

const uploadFile = async (profileImage) => {
  try{
    const uploadImage = await s3.upload({
    Bucket: "wecode-headbanger",
    Key: uploadKey,
    Body: profileImage.buffer,
  }).promise();

  return uploadImage.Location
  } catch (error) {
    error = new Error('FILE UPLOAD FAIL');

  }
};

module.exports = {
  uploadFile
}