const http = require('https');
const fs = require('fs');

export default (config = { basePath: '/tmp/' }) => {
	const downloadFile = (url, fileName) => new Promise((resolve, reject) => {
		const file = fs.createWriteStream(`${config.basePath}${fileName}.csv`);

		http.get(url, function (response) {
			response.pipe(file);
			resolve();
		}).on('error', function (err) { // Handle errors
			fs.unlink(dest); // Delete the file async. (But we don't check the result)
			reject(err);
		});
	});

	return new Promise((resolve, reject) => {
		Promise.all([
			downloadFile('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv', 'confirmed'),
			downloadFile('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv', 'deaths'),
			downloadFile('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Recovered.csv', 'recovered')
		]).then(() => resolve()).catch(reject);
	});
};