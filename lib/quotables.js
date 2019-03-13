/* Outputs random "last words" */
const lastwords = require('../data/lastwords.json');

function getLastWords() {
    let numquotes = lastwords.length;
    let diceRoll = Math.floor(Math.random() * (numquotes - 0)) + 0;
    let msg = '';

    msg += '_"' + lastwords[diceRoll].quote + '"_'+ '\n';
    msg += '*' + lastwords[diceRoll].who + ' in ' + lastwords[diceRoll].source + '*\n';
    msg += lastwords[diceRoll].note + '\n';

    return (msg);
}

module.exports = {
    getLastWords,
};
