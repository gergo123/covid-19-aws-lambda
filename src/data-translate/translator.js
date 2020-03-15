
export default (function () {
	let parsedData = {};
	// Prov/State - Country/Reg - lat - long - [dates]
	// Province/State,Country/Region,Lat,Long,1/22/20,1/23/20,1/24/20,1/25/20,1/26/20,1/27/20,1/28/20,1/29/20,1/30/20,1/31/20,2/1/20,2/2/20,2/3/20,2/4/20,2/5/20,2/6/20,2/7/20,2/8/20,2/9/20,2/10/20,2/11/20,2/12/20,2/13/20,2/14/20,2/15/20,2/16/20,2/17/20,2/18/20,2/19/20,2/20/20,2/21/20,2/22/20,2/23/20,2/24/20,2/25/20,2/26/20,2/27/20,2/28/20,2/29/20,3/1/20,3/2/20,3/3/20,3/4/20,3/5/20,3/6/20,3/7/20,3/8/20,3/9/20,3/10/20,3/11/20
	// Desired end results
	// let results = {
	// 	recovered: {
	// 		dates: [
	// 			'1/22/20', '1/23/20', '1/24/20', '1/25/20'
	// 		],
	// 		rows: [
	// 			{
	// 				State: '',
	// 				Country: 'Hungary',
	// 				Lat: 47.1625,
	// 				Long: 19.5033,
	// 				numOf: [
	// 					0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
	// 				]
	// 			}
	// 		]
	// 	}
	// }
	const transform = (input) => Object.entries(input).map(([key, value]) => ({ key, value }));
	const parseRecovered = (name) => {
		let data = parsedData[name];
		let results = {
			dates: [],
			rows: []
		};
		for (let i = 0; i < data.length; i++) {
			const rowData = transform(data[i]);
			// because of slice modifying the original object
			const copy = [...rowData];
			if (i === 0) {
				// Removing first 4 constant data
				results.dates = rowData.splice(4).map((key, value) => key.key);
			}
			results.rows.push({
				State: rowData[0].value,
				Country: rowData[1].value,
				Lat: rowData[2].value,
				Long: rowData[3].value,
				// taking everything else besides the first 4
				numOf: copy.splice(4).map((key, value) => Number.parseInt(key.value) || 0)
			});
		}

		return results;
	};

	/** Translates the parsed csv file structure into a little bit more convenient format. */
	const readData = (parsedCsvdata) => {
		let results = {};
		parsedData = parsedCsvdata;

		results.recovered = parseRecovered('recovered');
		results.confirmed = parseRecovered('confirmed');
		results.deaths = parseRecovered('deaths');

		return results;
	};


	return {
		readData
	};
})();
