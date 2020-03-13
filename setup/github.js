//https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv

var fileUlr = process.argv[2];

const http = require('https');
const fs = require('fs');

const file = fs.createWriteStream("file.csv");
const request = http.get(fileUlr, function (response) {
	console.log(response)
	response.pipe(file);
});