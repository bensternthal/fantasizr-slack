const command = require('../lib/text-commands');
const should = require('chai').should();


describe('getLastWords()', function() {
    it('should return a string that contains "Episode"', function() {
        command.getLastWords().should.be.a('string').that.does.include('Episode');
    });
});


describe('displayHelp()', function() {
    it('should return a string that includes "Hodor Commands"', function() {
        command.displayHelp().should.be.a('string').that.does.include('@hodor help');
    });
});
