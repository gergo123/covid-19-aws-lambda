var store = require('../s3/store');
var fileService = require('../github/file-request')
var csvReader = require('../csv-reader/parser');
var translator = require('../data-translate/translator');

exports.handler = async (event, context, callback) => {
	// download files from github
	await fileService.default();
	var data = await csvReader.default.getTimeData();
	console.log(Object.keys(data));
	var translated = translator.default.readData(data);

	await store.default.save(translated, 'covid-data.json');
	callback(null, {
		statusCode: 200,
		body: JSON.stringify({
			text: 'well done finished'
		})
	});
};
