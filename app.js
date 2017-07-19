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
let fantasizrUrl = process.env.FANTASIZR_URL;

// Post to slack we are starting up...
bot.postMessageToChannel(channel, 'Hodor is in the house.', params);

// Watch for any mentions of @hodor
bot.on('message', (data) => {
    if (data.content != undefined) {
        if (data.content.includes('@hodor')) {
            let message = data.content.split('@hodor', 2);
            processCommand(message[1].trim());
        };
    }
});

bot.on('error', (data) => {
    console.log(data);
});

function processCommand(command) {
    switch (command) {
        case 'help':
            botHelp();
            break;
        case 'standings':
            botStandings();
            break;
        // soon
        case 'stats':
            botStats();
            break;
        default:
            botHelp();
  };
};

function botHelp() {
    let msg = 'Hodor helps! Commands are "help", "standings"';
    bot.postMessageToChannel(channel, msg, params);
};

function botStandings() {
    let msg = 'Hodor is thinking... ';
    bot.postMessageToChannel(channel, msg, params);

    request(fantasizrUrl, function(error, response, body) {
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

// function botStats() {
//     request(fantasizrUrl, function(error, response, body) {
//         if (error) {
//             bot.postMessageToGroup(channel, error, params);
//         } else {
//             /* Parse Body & Store Title */
//             let $ = cheerio.load(body);
//             let msg = '';
//     
//             $('#statdetail table.table-striped tr').each(function(i, elem) {
//                 msg += $(this).children('td').text() + '\n';
//             });
//     
//             // console.log(msg);
//             bot.postMessageToGroup(channel, msg, params);
//         }
//     });
// };

