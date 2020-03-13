import cases from 'jest-in-case';

const sum = require('../sum');

test('adds 1 + 2 to equal 3', () => {
	expect(sum(1, 2)).toBe(3);
});

cases('adds(a, b)', opts => {
	expect(sum(opts.a, opts.b)).toBe(opts.summ);
}, {
	'1 + 1 = 2': { a: 1, b: 1, summ: 2 },
	'2 + 1 = 3': { a: 2, b: 1, summ: 3 },
	'3 + 1 = 4': { a: 3, b: 1, summ: 4 },
});
