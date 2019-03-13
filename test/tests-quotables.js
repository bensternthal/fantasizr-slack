const lastwords = require('../lib/quotables');
const should = require('chai').should();
const assert = require('assert');

describe('Test Last Words', () => {
    it('should return a string', () => {
        lastwords.getLastWords().should.be.a('string');
    });
});