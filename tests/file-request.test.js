const fs = require('fs');
import fReq from '../src/github/file-request';

test('download files from github url', async (done) => {
	await fReq({ basePath: 'data/tmp/' });

	//passsing directoryPath and callback function
	fs.readdir('data/tmp/', function (err, files) {
		//handling error
		if (err) {
			console.log('Unable to scan directory: ' + err);
		}
		//listing all files using forEach
		var hasConf = files.indexOf('confirmed.csv'),
			deaths = files.indexOf('deaths.csv'),
			recov = files.indexOf('recovered.csv');
		expect(hasConf).toBeGreaterThan(-1);
		expect(deaths).toBeGreaterThan(-1);
		expect(recov).toBeGreaterThan(-1);
		done();
	});
});
