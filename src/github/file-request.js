const http = require('https');
const fs = require('fs');

/** Downloads the csv data files into a temporary folder */
export default (config = { basePath: '/tmp/' }) => {
	const downloadFile = (url, fileName) => new Promise((resolve, reject) => {
		const file = fs.createWriteStream(`${config.basePath}${fileName}.csv`);

		http.get(url, response => {
			var data = [];
			response.on('data', function (chunk) {
				data.push(chunk);
			}).on('end', function () {
				//at this point data is an array of Buffers
				//so Buffer.concat() can make us a new Buffer
				//of all of them together
				var buffer = Buffer.concat(data);
				file.write(buffer.toString())
				resolve();
			});
		}).on('error', err => { // Handle errors
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