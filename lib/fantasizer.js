require('dotenv').config();
const cheerio = require('cheerio');
const request = require('request-promise');
var Events = require('events');

const FantasizrID = process.env.FANTASIZR_ID;

/* Fetches the current standings */
async function getStandings() {
    const URL = 'http://www.fantasizr.com/league/' + FantasizrID;

    try {
        const response = await request(URL);
        let $ = cheerio.load(response);
        let msg = '';

        $('#statdetail table.table-striped tr').each(function (i, elem) {
            msg += $(this).children('td').text() + '\n';
        });
        return Promise.resolve(msg);
    } catch (error) {
        return new Error(error.name + ': ' + error.message)
    }
};

/* Fetches the ID for a given team, returns array since there can be more than one */
async function getTeamID(arg) {
    const URL = 'http://www.fantasizr.com/league/' + FantasizrID;

    try {
        const response = await request(URL);
        let $ = cheerio.load(response);
        let matchedIDs = new Array();

        $('#home a.teamlink').each(function (i, elem) {
            let name = $(this).attr('name').toLowerCase();;
            let id = $(this).attr('id');
            if (name.includes(arg.toLowerCase())) {
                matchedIDs.push([id, name]);
            }
        });
        return matchedIDs;
    } catch (error) {
        return new Error(error.name + ': ' + error.message)
    }
};

/* Given A Team ID Posts The Roster */
async function getTeamRoster(id) {
    const URL = 'http://www.fantasizr.com/getteammodal?league=' + FantasizrID + '&team=' + id;

    try {
        const response = await request(URL);
        const $ = cheerio.load(response);
        let msg = "";

        // let msg = '*Team \'' + name + '\' has:*\n';
        $('tr.season_stats_row > td:first-child').each(function(i, elem) {
            msg += $(this).text() + '\n';
        });
        return msg;
    } catch (error) {
        return new Error(error.name + ': ' + error.message)
    }
};

/* Given a name returns bio. */
async function getWhoIs(arg) {
    const URL = 'http://www.fantasizr.com/get_player_info_table?league=' + FantasizrID;
    const nameCapitalized = arg.charAt(0).toUpperCase() + arg.slice(1)

    try {
        const response = await request(URL);
        let $ = cheerio.load(response);
        let msg = '';
        let results = $('a:contains("' + nameCapitalized + '")').parents('tr');

        if (results.length != 0) {
            $(results).each(function (i, elem) {
                msg += '*' + $(elem).children('td').eq(0).text() + '*\n';
                msg += $(elem).children('td').eq(1).text() + '\n';
            });
        }
        return msg;
    } catch (error) {
        return new Error(error.name + ': ' + error.message)
    }
};

/* Given a name returns who has that character. */
async function getWhoHas(arg) {
    const URL = 'http://www.fantasizr.com/league/' + FantasizrID;
    const nameCapitalized = arg.charAt(0).toUpperCase() + arg.slice(1)

    try {
        const response = await request(URL);
        let $ = cheerio.load(response);
        let msg = '';
        let results = $('#drafthistory table a:contains("' + nameCapitalized + '")').parents('tr');
        if (results.length != 0) {
            $(results).each(function (i, elem) {
                msg += '*' + $(elem).children('td').eq(1).text().trim() + '*\n';
                msg += $(elem).children('td').eq(2).text().trim() + '\n';
            });
        }
        return msg;
    } catch (error) {
        return new Error(error.name + ': ' + error.message)
    }
};

/* Given a name returns matches/stats of a character */
/* http://www.fantasizr.com/getseasonstats?league= */
/* Name  	Violence   	Sex/Nudity   	Wits   	Status   	Food   	Total */
async function getCharacterStats(arg) {
    const URL = 'http://www.fantasizr.com/getseasonstats?league=' + FantasizrID;
    const nameCapitalized = arg.charAt(0).toUpperCase() + arg.slice(1)

    try {
        let response = await request(URL);
        // add table to response so it can be traverssed
        response = '<table>' + response + '</table>';
        let $ = cheerio.load(response);
        let msg = '';
        const results = $('a:contains("' + nameCapitalized + '")').parents('tr');

        if (results.length != 0) {
            $(results).each(function(i, elem) {
                msg += '*Name*: ' + $(elem).children('td').eq(0).text() + '\n';
                msg += '*Violence:* ' + $(elem).children('td').eq(1).text() + '\n';
                msg += '*Sex/Nudity:* ' + $(elem).children('td').eq(2).text() + '\n';
                msg += '*Wits:* ' + $(elem).children('td').eq(3).text() + '\n';
                msg += '*Status:* ' + $(elem).children('td').eq(4).text() + '\n';
                msg += '*Food:* ' + $(elem).children('td').eq(5).text() + '\n';
                msg += '*Total:* ' + $(elem).children('td').eq(6).text() + '\n\n';
            });
            return msg;
        } else {
            return "No Results";
        }
    } catch (error) {
        return new Error(error.name + ': ' + error.message)
    }

};

module.exports = {
    getStandings,
    getTeamID,
    getTeamRoster,
    getWhoIs,
    getWhoHas,
    getCharacterStats,
};