const fs = require('fs')
const neatCsv = require('neat-csv');

const service = (function () {
	let config;

	let results = {};

	const handleResut = ({ type, res }) => {
		results[type] = res;
	};

	const parse = (type) => {
		let fileName = type;
		return new Promise((resolve, rejects) => {
			fs.readFile(`${config.basePath}${fileName}.csv`, async (err, data) => {
				if (err) {
					rejects(err);
					return;
				}
				let res = await neatCsv(data);
				resolve({
					res,
					type
				});
			});
		});
	};

	/** Parses a previously downloaded csv file for further processing. */
	const getTimeData = (cfg = { basePath: '/tmp/' }) => {
		if (cfg) {
			config = cfg;
		}
		return Promise.all([
			parse('confirmed').then(handleResut),
			parse('deaths').then(handleResut),
			parse('recovered').then(handleResut)
		]).then(() => results);
	};

	return {
		getTimeData,
	};
})();


export default service;