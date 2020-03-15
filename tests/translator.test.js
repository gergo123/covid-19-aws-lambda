import miner from '../src/data-translate/translator';
import data from '../data/covid-data'

test('data miner test', (done) => {
	let results = miner.readData(data)
	expect(results.confirmed.dates[0]).toBe('1/22/20');
	expect(results.confirmed.dates[51]).toBe('3/13/20');
	expect(results.confirmed.rows[0].Country).toBe('Thailand');
	expect(results.confirmed.rows[0].numOf[0]).toBe(2)
	expect(results.confirmed.rows[0].numOf[51]).toBe(75)
	done();
});
