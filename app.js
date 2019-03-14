require('dotenv').config();
const cheerio = require('cheerio');
const request = require('request');
const SlackBot = require('slackbots');
const fantasizr = require('./lib/fantasizer');

// Create & Configure Slackbot
let bot = new SlackBot({
    token: process.env.SLACK_API_TOKEN,
    name: process.env.SLACK_BOT_NAME,
});
let channel = process.env.SLACK_CHANNEL;
let params = {icon_emoji: ':hodor:'};

// Watch for any mentions of @hodor
bot.on('message', (data) => {
    if (data.content != undefined) {
        if (data.content.includes(`@${process.env.SLACK_BOT_NAME}`)) {
            let action = parseContent(data.content);
            processAction(action);
        };
    }
});

bot.on('error', (data) => {
    console.log(data);
});

/* Bot Stuff TODO
    let msg = '_Hodor is thinking..._';
    bot.postMessageToChannel(channel, msg, params);
*/

/* All the things hodor can do! */
function processAction(action) {
    switch (action.command) {
        case 'help':
            fantasizr.displayHelp();
            break;
        case 'standings':
            fantasizr.getStandings();
            break;
        case 'whoison':
            .getTeamRoster(action.arg);
            break;
        case 'whothefuckis':
            whoTheFuckis(action.arg);
            break;
        case 'whohas':
            whoHas(action.arg);
            break;
        case 'stats':
            getCharacterStats(action.arg);
            break;
        case 'lastwords':
            getLastWords();
            break;
        default:
            displayHelp();
  };
};

/* [ 'booboobenny:', '@hodor', 'command', 'arg' ] */
function parseContent(msgContent) {
    msgContent.trim();
    let contents = msgContent.split(' ');
    return {
        'command': contents[2],
        'arg': contents[3],
    };
};

function postMessage(msg) {
    bot.postMessageToChannel(channel, msg, params);
}

