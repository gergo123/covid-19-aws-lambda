var store = require('../s3/store');
var fileService = require('../github/file-request')
var csvReader = require('../csv-reader/parser');

exports.handler = async (event, context, callback) => {
	await fileService.default();
	var data = await csvReader.default.getTimeData();
	console.log(Object.keys(data))
	await store.default.save(data, 'covid-data.json')
	callback(null, {
		statusCode: 200,
		body: JSON.stringify({
			text: 'well done finished'
		})
	});
};
