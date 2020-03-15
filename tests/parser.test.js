import parser from '../src/csv-reader/parser';

test('csv reader getTimeData', (done) => {
	parser.getTimeData({ basePath: 'data/' }).then((data) => {
		console.log(Object.keys(data));

		let keys = Object.keys(data);
		expect(keys).toContain('recovered');
		expect(keys).toContain('confirmed');
		expect(keys).toContain('deaths');

		done();
	});
});
