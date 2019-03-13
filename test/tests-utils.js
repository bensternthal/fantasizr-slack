const utils = require('../lib/utils');
const should = require('chai').should();
const assert = require('assert');

describe('Test Last Words', () => {
    it('should return a string', () => {
        utils.getLastWords().should.be.a('string');
    });
});


describe('Test Help Text', () => {
    it('should return a string', () => {
        utils.displayHelp().should.be.a('string');
    });
});
