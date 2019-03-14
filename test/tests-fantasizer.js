const fantasizer = require('../lib/fantasizer');
const should = require('chai').should();
const chaiAsPromised = require("chai-as-promised");





describe('getStandings()', function() {
    it('should return a string including "Cerseiously" ', async function() {
        const result =  await fantasizer.getStandings();
        result.should.be.a('string').that.does.include('Cerseiously');
    });
});


// do this next
describe('getTeamRoster()', function() {
    it('should return a string', async function() {
        const result =  await fantasizer.getStandings();
        result.should.be.a('string');
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



