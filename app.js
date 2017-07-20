require('dotenv').config();
const cheerio = require('cheerio');
const request = require('request');
const SlackBot = require('slackbots');

// Create & Configure Slackbot
let bot = new SlackBot({
    token: process.env.SLACK_API_TOKEN,
    name: process.env.SLACK_BOT_NAME,
});
let channel = process.env.SLACK_CHANNEL;
let params = {icon_emoji: ':hodor:'};
const FantasizrID = process.env.FANTASIZR_ID;

// Post to slack we are starting up...
bot.postMessageToChannel(channel, 'Hodor is in the house.', params);

// Watch for any mentions of @hodor
bot.on('message', (data) => {
    if (data.content != undefined) {
        if (data.content.includes('@hodor')) {
            // let message = data.content.split('@hodor', 2);
            let action = parseContent(data.content);
            processAction(action);
        };
    }
});

bot.on('error', (data) => {
    console.log(data);
});

/* All the things hodor can do! */
function processAction(action) {
    switch (action.command) {
        case 'help':
            displayHelp();
            break;
        case 'standings':
            getStandings();
            break;
        // soon
        case 'whothefuckis':
            whoTheFuckis(action.arg);
            break;
        case 'stats':
            getCharacterStats(action.arg);
            break;
        default:
            displayHelp();
  };
};

function displayHelp() {
    let msg = 'Hodor Help: Commands are "help", "standings", "stats <charactername>", "whothefuckis <charactername>",';
    bot.postMessageToChannel(channel, msg, params);
};

/* Fetches the current standings */
function getStandings() {
    let msg = 'Hodor is thinking... ';
    let URL = 'http://www.fantasizr.com/league/' + FantasizrID;
    bot.postMessageToChannel(channel, msg, params);

    request(URL, function(error, response, body) {
        if (error) {
            bot.postMessageToChannel(channel, error, params);
        } else {
            /* Parse Body & Store Title */
            let $ = cheerio.load(body);
            let msg = '';

            $('#statdetail table.table-striped tr').each(function(i, elem) {
                msg += $(this).children('td').text() + '\n';
            });

            // console.log(msg);
            bot.postMessageToChannel(channel, msg, params);
        }
    });
};

/* Given a name returns matches/descriptions of a character */
function whoTheFuckis(arg) {
    // bot.postMessageToChannel(channel, msg, params);
    let URL = 'http://www.fantasizr.com/get_player_info_table?league=' + FantasizrID;

    request(URL, function(error, response, body) {
        if (error) {
            bot.postMessageToChannel(channel, error, params);
        } else {
            /* Parse Body & Store Title */
            let $ = cheerio.load(body);
            let msg = '';
            let results = $('a:contains("'+arg+'")').parents('tr');

            if (results.length != 0) {
                $(results).each(function(i, elem) {
                    msg += ($(this).text() + '\n\n');
                });
                bot.postMessageToChannel(channel, msg, params);
            } else {
                bot.postMessageToChannel(channel, 'No results. Names are case sensitive.', params);
            }
        }
    });
};

/* Given a name returns matches/stats of a character */
function getCharacterStats() {
    // http://www.fantasizr.com/getseasonstats?league=6629648014245888
    bot.postMessageToChannel(channel, 'Not implemented yet, Hodor has management duties.', params);
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
