const command = require('../lib/text-commands');
const should = require('chai').should();


describe('getLastWords()', () => {
    it('should return a string that contains "Episode"', () => {
        command.getLastWords().should.be.a('string').that.does.include('Episode');
    });
});


describe('displayHelp()', () => {
    it('should return a string that includes "Hodor Commands"', () => {
        command.displayHelp().should.be.a('string').that.does.include('Hodor Commands');
    });
});
