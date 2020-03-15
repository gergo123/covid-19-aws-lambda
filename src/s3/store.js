// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({ region: 'eu-west-3' });

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
// Could produce lower build output size, but cant set region on S3 client itself
//const s3 = new require('aws-sdk/clients/s3');

const storage = (function () {
	/**
	 * Uploads a file to S3 storage.
	 * @param {*} data Data to be stored in string format
	 * @param {*} key File identifier
	 */
	const save = (data, key) => {
		var uploadParams = {
			Bucket: 'covid-19-data',
			Key: key,
			Body: JSON.stringify(data),
			ACL: 'public-read'
		};
		return new Promise((resolve, reject) => {
			s3.putObject(uploadParams)
				.promise().then(resolve).catch(reject);
		});
	};

	return {
		save
	};
})();

export default storage;
