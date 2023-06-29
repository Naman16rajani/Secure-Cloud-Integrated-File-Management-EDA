const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const util = require('./util');
const bucketName = 'my-file-upload-bucket-storage';
const s3Subfolder = 'data';

async function process(requestBody) {
  if (!requestBody) {
    throw new Error('Request body is null or undefined');
  }

  const requestBodyLines = requestBody.split('\r\n');

  if (requestBodyLines.length < 5) {
    throw new Error('Invalid request body format');
  }

  const fileNameLine = requestBodyLines[1];
  const fileContentLine = requestBodyLines[4];

  const fileNameParts = fileNameLine.split(';');
  if (fileNameParts.length < 3) {
    throw new Error('Invalid file name format');
  }
  const fileName = fileNameParts[2].split('=')[1].replace(/^"|"$/g, '').trim();

  let fileContent = fileContentLine.trim();
  fileContent += `\n\nProcess Timestamp: ${new Date().toISOString()}`;

  const params = {
    Bucket: bucketName,
    Key: `${s3Subfolder}/${fileName}`,
    Body: fileContent
  };

  await s3.putObject(params).promise();
  return util.buildResponse(200);
}

module.exports.process = process;
