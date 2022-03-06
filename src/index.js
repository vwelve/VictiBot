const { Client, Intents } = require('discord.js');
const { DISCORD_TOKEN } = require("./config");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

require("./handlers/event.handler")(client);

client.login(DISCORD_TOKEN);