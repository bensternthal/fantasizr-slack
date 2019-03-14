const fantasizer = require('../lib/fantasizer');
const should = require('chai').should();
const expect = require('chai').expect();
const chaiAsPromised = require("chai-as-promised");
const assert = require('assert');



// getStandings,
// getTeamRoster,
// postTeamRoster,
// whoTheFuckis,
// whoHas,
// getCharacterStats,
//    bot.postMessageToChannel(channel, msg, params);

//to include

describe('getStandings()', function() {
    it('should return a string including "Cerseiously" ', async function() {
        const result =  await fantasizer.getStandings();
        result.should.be.a('string').that.does.include('Cerseiously');
    });
});


describe('getTeamRoster()', function() {
    it('should return a string', async function() {
        const foo =  await fantasizer.getStandings();
        foo.should.be.a('string');
    });
});

// describe('Test Fantasizr Get Team Roster', () => {
//     it('should...', () => {
//        // utils.getLastWords().should.be.a('string');
//     });
// });

// describe('Test Fantasizr Get Team Roster', () => {
//     it('should...', () => {
//        // utils.getLastWords().should.be.a('string');
//     });
// });

// /* what the hell does this one do */
// describe('Test Fantasizr Post Team Roster', () => {
//     it('should...', () => {
//        // utils.getLastWords().should.be.a('string');
//     });
// });


// describe('Test Fantasizr Who The Fuck Is', () => {
//     it('should...', () => {
//        // utils.getLastWords().should.be.a('string');
//     });
// });

// describe('Test Fantasizr Who Has', () => {
//     it('should...', () => {
//        // utils.getLastWords().should.be.a('string');
//     });
// });

// describe('Test Fantasizr Character Stats', () => {
//     it('should...', () => {
//        // utils.getLastWords().should.be.a('string');
//     });
// });



