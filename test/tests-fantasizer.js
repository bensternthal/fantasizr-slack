const fantasizer = require('../lib/fantasizer');
const should = require('chai').should();
const chaiAsPromised = require("chai-as-promised");

// test id 6629648014245888


/* Most tests are unique to each persons setup, and I dont want to mock becaue who knows whats gonna 
  happen with fantasize r*/


describe('getStandings()', function() {
    it('should return a string including "Cerseiously" ', async function() {
        const result =  await fantasizer.getStandings();
        result.should.be.a('string').that.does.include('Cerseiously');
    });
});

describe('getTeamID()', function() {
    it('should return an array that includes 4566005129936896 for "Cerseiously"', async function() {
        const result =  await fantasizer.getTeamID('Cerseiously');
        result.should.be.an('array').that.does.include('4566005129936896');
    });
});

describe('getTeamRoster()', function() {
    it('should return a string"', async function() {
        const result =  await fantasizer.getTeamRoster('4566005129936896');
        result.should.be.a('string');
    });
});


describe('getWhoIs()', function() {
    it('should return a string containing "Cersei Lannister" when Cersei is arg', async function() {
        const result =  await fantasizer.getWhoIs('Cersei');
        result.should.be.a('string').that.does.include('Cersei Lannister');
    });
});

describe('getWhoHas()', function() {
    this.timeout(5000);
    it('should return a string containing "Hold The Doorr" when cersei is arg', async function() {
        const result =  await fantasizer.getWhoHas('cersei');
        result.should.be.a('string').that.does.include('Hold The Door');
    });
});

describe('getCharacterStats()', function() {
    it('should return a string containing "Cersei" when cersei is arg', async function() {
        const result =  await fantasizer.getCharacterStats('cersei');
        result.should.be.a('string').that.does.include('Cersei');
    });
});



