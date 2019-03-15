/* Outputs random "last words from a json file" */
const lastwords = require('../data/lastwords.json');

function getLastWords() {
    const numquotes = lastwords.length;
    const diceRoll = Math.floor(Math.random() * (numquotes - 0)) + 0;
    let msg = '';

    msg += '_"' + lastwords[diceRoll].quote + '"_' + '\n';
    msg += '*' + lastwords[diceRoll].who + ' in ' + lastwords[diceRoll].source + '*\n';
    msg += lastwords[diceRoll].note + '\n';

    return msg;
}

/* Returns all the things hodor can do" */
function displayHelp() {
    const msg = '```@hodor help \n' +
        '@hodor standings \n' +
        '@hodor whois <Character Name> \n' +
        '@hodor whoison <team name> \n' +
        '@hodor whohas <Character Name> \n' +
        '@hodor stats <Character Name> \n' +
        '@hodor lastwords```\n';

    return msg;
};

module.exports = {
    getLastWords,
    displayHelp,
};