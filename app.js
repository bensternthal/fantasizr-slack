require('dotenv').config();
const cheerio = require('cheerio');
const request = require('request');
const SlackBot = require('slackbots');
const lastwords = require('./data/lastwords.json');

// Create & Configure Slackbot
let bot = new SlackBot({
    token: process.env.SLACK_API_TOKEN,
    name: process.env.SLACK_BOT_NAME,
});
let channel = process.env.SLACK_CHANNEL;
let params = {icon_emoji: ':hodor:'};
const FantasizrID = process.env.FANTASIZR_ID;

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

/* All the things hodor can do! */
function processAction(action) {
    switch (action.command) {
        case 'help':
            displayHelp();
            break;
        case 'standings':
            getStandings();
            break;
        case 'whoison':
            getTeamRoster(action.arg);
            break;
        case 'whothefuckis':
            whoTheFuckis(action.arg);
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

function displayHelp() {
    let msg = 'Hodor Commands:' +
        '```help\n' +
        'lastwords\n' +
        'standings\n' +
        'stats <charactername>\n' +
        'whoison <team name>\n' +
        'whothefuckis <charactername>```\n';
    bot.postMessageToChannel(channel, msg, params);
};

/* Fetches the current standings */
function getStandings() {
    let msg = '_Hodor is thinking..._';
    let URL = 'http://www.fantasizr.com/league/' + FantasizrID;
    bot.postMessageToChannel(channel, msg, params);

    request(URL, function(error, response, body) {
        if (error) {
            bot.postMessageToChannel(channel, error, params);
        } else {
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

/* Fetches the roster for a given team */
function getTeamRoster(arg) {
    let msg = '_Hodor is thinking..._';
    let URL = 'http://www.fantasizr.com/league/' + FantasizrID;
    bot.postMessageToChannel(channel, msg, params);

    request(URL, function(error, response, body) {
        if (error) {
            bot.postMessageToChannel(channel, error, params);
        } else {
            let $ = cheerio.load(body);
            let found = false;
            $('#home a.teamlink').each(function(i, elem) {
                let name = $(this).attr('name');
                let id = $(this).attr('id');
                if (name.includes(arg)) {
                    postTeamRoster(id, name);
                    found = true;
                }
            });
            if (!found) {
              let msg = 'Couldn\'t find team \'' + arg +'\'';
              bot.postMessageToChannel(channel, msg, params);
            }
        }
    });
};

/* Helper for getTeamRoster - given a team id, posts the roster */
function postTeamRoster(id, name) {
    let URL = 'http://www.fantasizr.com/getteammodal?league=' + FantasizrID;
    URL += '&team=' + id;
    request(URL, function(error, response, body) {
        if (error) {
            bot.postMessageToChannel(channel, error, params);
        } else {
            let $ = cheerio.load(body);
            let msg = '*Team \'' + name + '\' has:*\n';
            $('tr.season_stats_row > td:first-child').each(function(i, elem) {
              msg += $(this).text() + '\n';
            });
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
            let $ = cheerio.load(body);
            let msg = '';
            let results = $('a:contains("'+arg+'")').parents('tr');

            if (results.length != 0) {
                $(results).each(function(i, elem) {
                    msg += '*' + $(elem).children('td').eq(0).text() + '*\n';
                    msg += $(elem).children('td').eq(1).text() + '\n';
                });
                bot.postMessageToChannel(channel, msg, params);
            } else {
                bot.postMessageToChannel(channel, '_No results. Hodor is case sensitive._', params);
            }
        }
    });
};

/* Given a name returns matches/stats of a character */
/* http://www.fantasizr.com/getseasonstats?league= */
/* Name  	Violence   	Sex/Nudity   	Wits   	Status   	Food   	Total */
function getCharacterStats(arg) {
    let URL = 'http://www.fantasizr.com/getseasonstats?league=' + FantasizrID;

    request(URL, function(error, response, body) {
        if (error) {
            bot.postMessageToChannel(channel, error, params);
        } else {
            // add table to response so it can be traverssed
            body = '<table>' + body + '</table>';
            let $ = cheerio.load(body);
            let msg = '';
            let results = $('a:contains("'+arg+'")').parents('tr');

            if (results.length != 0) {
                $(results).each(function(i, elem) {
                    msg += '*Name*: ' + $(elem).children('td').eq(0).text() + '\n';
                    msg += '*Violence:* ' + $(elem).children('td').eq(1).text() + '\n';
                    msg += '*Sex/Nudity:* '+ $(elem).children('td').eq(2).text() + '\n';
                    msg += '*Wits:* ' + $(elem).children('td').eq(3).text() + '\n';
                    msg += '*Status:* ' + $(elem).children('td').eq(4).text() + '\n';
                    msg += '*Food:* ' + $(elem).children('td').eq(5).text() + '\n';
                    msg += '*Total:* ' + $(elem).children('td').eq(6).text() + '\n\n';
                });
                bot.postMessageToChannel(channel, msg, params);
            } else {
                bot.postMessageToChannel(channel, '_No results. Hodor is case sensitive._', params);
            }
        }
    });
};

/* Outputs random "last words" */
function getLastWords() {
    let numquotes = lastwords.length;
    let diceRoll = Math.floor(Math.random() * (numquotes - 0)) + 0;
    let msg = '';

    msg += '_"' + lastwords[diceRoll].quote + '"_'+ '\n';
    msg += '*' + lastwords[diceRoll].who + ' in ' + lastwords[diceRoll].source + '*\n';
    msg += lastwords[diceRoll].note + '\n';

    bot.postMessageToChannel(channel, msg, params);
}


/* [ 'booboobenny:', '@hodor', 'command', 'arg' ] */
function parseContent(msgContent) {
    msgContent.trim();
    let contents = msgContent.split(' ');
    return {
        'command': contents[2],
        'arg': contents[3],
    };
};
