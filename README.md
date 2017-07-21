## About

![Hodor](/hodor.png)

**Hodor** is a simple slack bot to display various stats from the website fantasizr. http://www.fantasizr.com


## Install

1. `npm install`
1. Copy `env.dist` to `.env`
1. Populate `.env` with the correct values.
	1. `FANTASIZR_ID` is the number at the end of your url `http://www.fantasizr.com/league/{id}}`
1. Run with ```node app.js``` or for _production_ use pm2 or similar.

## Usage

Hodor is not very smart, but will respond to some basic commands. All commands are invoked by mentioning
his name `@hodor`. Hodor is case sensitive. Hodor is a sensitive man.

1. `@hodor help`
1. `@hodor standings`
1. `@hodor stats <Character Name>`
1. `@hodor whothefuckis <Character Name>`

