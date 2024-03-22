const AWS = require('aws-sdk');
require('dotenv').config();
AWS.config.update({
  accessKeyId: process.env.YOUR_AWS_ACCESS_KEY,
  secretAccessKey: process.env.YOUR_AWS_SECRET_KEY,
  region: process.env.YOUR_AWS_REGION,
});

const s3 = new AWS.S3();
const bucketName = process.env.YOUR_BUCKET_NAME;

module.exports = {
  uploadFile: async (files) => {
    console.log(files, "filesssssss");
    const sourceBuffer = files.buffer;

    const paramsSource = {
      Bucket: bucketName,
      Key: `source/${files.originalname}`,
      Body: sourceBuffer,
    };

    const uploadSourcePromise = s3.upload(paramsSource).promise();

    const [ sourceResult] = await Promise.all([
      uploadSourcePromise,
    ]);

    return {
      source: sourceResult,
    };
  },
};