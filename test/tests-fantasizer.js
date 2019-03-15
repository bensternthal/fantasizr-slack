const fantasizer = require('../lib/fantasizer');
const should = require('chai').should();
const chaiAsPromised = require('chai-as-promised');

// test id 6629648014245888

describe('getStandings()', function() {
    this.timeout(5000);
    it('should return a string', async function() {
        const result = await fantasizer.getStandings();
        result.should.be.a('string');
    });
});


describe('getTeamID()', function() {
    this.timeout(5000);
    it('should return an array', async function() {
        const result = await fantasizer.getTeamID('The');
        result.should.be.an('array');
    });
});


describe('getTeamRoster()', function() {
    it('should return a string', async function() {
        const result = await fantasizer.getTeamRoster('4566005129936896');
        result.should.be.a('string');
    });
});


describe('getWhoIs()', function() {
    it('should return a string containing "Cersei Lannister" when Cersei is arg', async function() {
        const result = await fantasizer.getWhoIs('Cersei');
        result.should.be.a('string').that.does.include('Cersei Lannister');
    });
});

describe('getWhoHas()', function() {
    this.timeout(5000);
    it('should return a string', async function() {
        const result = await fantasizer.getWhoHas('cersei');
        result.should.be.a('string');
    });
});

describe('getCharacterStats()', function() {
    it('should return a string containing "Cersei" when cersei is arg', async function() {
        const result = await fantasizer.getCharacterStats('cersei');
        result.should.be.a('string').that.does.include('Cersei');
    });
});



