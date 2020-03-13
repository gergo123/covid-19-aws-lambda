// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({ region: 'eu-west-3' });

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
// Could produce lower build output size, but cant set region on S3 client itself
//const s3 = new require('aws-sdk/clients/s3');

const storage = (function () {
  const save = (data, key) => {
    var uploadParams = { Bucket: 'covid-19-data', Key: key, Body: JSON.stringify(data) };
    return new Promise((resolve, reject) => {
      s3.upload(uploadParams, function (err, data) {
        if (err) {
          console.log("Error", err);
          reject();
        } if (data) {
          resolve();
          console.log("Upload Success", data.Location);
        }
      });
    });
  };

  return {
    save
  };
})();

export default storage;
