require('dotenv').config();
const cheerio = require('cheerio');
const request = require('request-promise');
const emitter = require('events').EventEmitter;

const FantasizrID = process.env.FANTASIZR_ID;

/* Fetches the current standings */
async function getStandings() {
    let URL = 'http://www.fantasizr.com/league/' + FantasizrID;

    try {
        const response = await request(URL);
        let $ = cheerio.load(response);
        let msg = '';

        $('#statdetail table.table-striped tr').each(function(i, elem) {
            msg += $(this).children('td').text() + '\n';
        });
        return Promise.resolve(msg);
    }
    catch (error) {
        emitter.emit('error', new Error(error));
    }
};    


/* Fetches the roster for a given team */
function getTeamRoster(arg) {
    let URL = 'http://www.fantasizr.com/league/' + FantasizrID;

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


/* Given a name returns who has that character. */
function whoHas(arg) {
    let URL = 'http://www.fantasizr.com/league/' + FantasizrID;
    bot.postMessageToChannel(channel, msg, params);

    request(URL, function(error, response, body) {
        if (error) {
            bot.postMessageToChannel(channel, error, params);
        } else {
            let $ = cheerio.load(body);
            let msg = '';
            let results = $('#drafthistory table a:contains("'+arg+'")').parents('tr');
            if (results.length != 0) {
                $(results).each(function(i, elem) {
                    msg += '*' + $(elem).children('td').eq(1).text().trim() + '*\n';
                    msg += $(elem).children('td').eq(2).text().trim() + '\n';
                    console.log(msg);
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





module.exports = {
    getStandings,
    getTeamRoster,
    postTeamRoster,
    whoTheFuckis,
    whoHas,
    getCharacterStats,
};
