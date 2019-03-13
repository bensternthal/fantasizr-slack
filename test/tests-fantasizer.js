const lastwords = require('../lib/quotables');
const should = require('chai').should();
const assert = require('assert');


// displayHelp,
// getStandings,
// getTeamRoster,
// postTeamRoster,
// whoTheFuckis,
// whoHas,
// getCharacterStats,
// getLastWords,

describe('Test Last Words', () => {
    it('should return a string', () => {
        lastwords.getLastWords().should.be.a('string');
    });
});