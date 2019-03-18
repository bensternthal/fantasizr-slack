require('dotenv').config();
const SlackBot = require('slackbots');
const fantasizr = require('./lib/fantasizer');
const cmds = require('./lib/text-commands');

// Create & Configure Slackbot
const bot = new SlackBot({
  token: process.env.SLACK_API_TOKEN,
  name: process.env.SLACK_BOT_NAME,
});
const channel = process.env.SLACK_CHANNEL;
const params = {icon_emoji: ':hodor:'};

// Watch for any mentions of @hodor
bot.on('message', (data) => {
  if (data.content != undefined) {
    if (data.content.includes(`@${process.env.SLACK_BOT_NAME}`)) {
      const action = parseContent(data.content);
      processAction(action);
    };
  }
});

bot.on('error', (data) => {
  console.log(data);
});

/* [ 'booboobenny:', '@hodor', 'command', 'arg' ] */
function parseContent(msgContent) {
  msgContent.trim();
  const contents = msgContent.split(' ');
  return {
    'command': contents[2],
    'arg': contents[3],
  };
};

/* The thing that posts a message */
function postMessage(msg) {
  bot.postMessageToChannel(channel, msg, params);
}

/* All the things hodor can do! */
async function processAction(action) {
  let msg = '';
  postMessage('_*Hodor is thinking,...*_');
  switch (action.command) {
  case 'help':
    msg = await cmds.displayHelp();
    break;
  case 'standings':
    msg = await fantasizr.getStandings();
    break;
  case 'whoison':
    const teamIDs = await fantasizr.getTeamID(action.arg);
    for (let i = 0; i < teamIDs.length; i++) {
      msg += '_*' + teamIDs[i][1] + '*_\n' + await fantasizr.getTeamRoster(teamIDs[i][0]);
    }
    break;
  case 'whois':
    msg = await fantasizr.getWhoIs(action.arg);
    break;
  case 'whohas':
    msg = await fantasizr.getWhoHas(action.arg);
    break;
  case 'stats':
    msg = await fantasizr.getCharacterStats(action.arg);
    break;
  case 'lastwords':
    msg = cmds.getLastWords();
    break;
  default:
    msg = cmds.displayHelp();
  };
  if (msg.length > 0) {
    postMessage(msg);
  } else {
    postMessage('No results.');
  }
};

