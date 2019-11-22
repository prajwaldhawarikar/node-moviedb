const { describe, it } = require('mocha');
const request = require('request');
const chai = require('chai');

const { serverConfig } = require('../../../config');
const testData = require('../../../tests/testData');

const expect = chai.expect;

const appUrl = serverConfig.getApiUrl();
const apiBasePath = serverConfig.getApiBasePath();

describe('API - GET /api/person/:personId/appearances - should fetch person\'s appearances', () => {
    it('should fetch appearances', (done) => {
        request.get({
            url: `${appUrl}${apiBasePath}/person/${testData.valid.personIds[0]}/appearances`,
        }, (err, resp, body) => {
            const result = JSON.parse(body);
            expect(resp.statusCode).to.equal(200);
            // eslint-disable-next-line no-unused-expressions
            expect(result).to.be.an('array').that.is.not.empty;
            expect(result[0]).to.have.any.keys(['name', 'type', 'date']);
            done();
        });
    });

    it('should not fetch person\'s appearances with invalid personId', (done) => {
        request.get({
            url: `${appUrl}${apiBasePath}/person/${testData.invalid.personIds[0]}/appearances`,
        }, (err, resp) => {
            expect(resp.statusCode).to.equal(400);
            done();
        });
    });

    it('should respond appearance not found ', (done) => {
        request.get({
            url: `${appUrl}${apiBasePath}/person/${testData.valid.personIds[1]}/appearances`,
        }, (err, resp) => {
            expect(resp.statusCode).to.equal(404);
            done();
        });
    });
});
