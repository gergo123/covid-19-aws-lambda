import fReq from '../src/github/file-request';

test('parser parse data', async (done) => {
	await fReq({ basePath: 'data/tmp/' });
	done();
});
