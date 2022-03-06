const { readdirSync, lstatSync } = require("fs");
const { CLIENT_ID, GUILD_ID, DISCORD_TOKEN } = require("../config.js");
const { Routes } = require("discord-api-types/v9");
const { REST } = require("@discordjs/rest");
const commands = [];

readdirSync('./src/interactions').forEach(name => {
    if (lstatSync(`..interactions/${name}`).isFile()) {
      let { data, run } = require(`../interactions/${name}`);

      if (data) {
          interactions.set(data.name, run);
          commands.push(data);

          console.log(`Loaded ${data.name} interaction.`);
      }
    }
});

const registerSlashCommands = async (client) => {
    client.interactions = new Map();
    const rest = new REST({ version: '9' }).setToken(DISCORD_TOKEN);

    try {
        console.log('Started refreshing application (/) commands.');
    
        await rest.put(
          Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
          { body: commands },
        );
    
        console.log('Successfully reloaded application (/) commands.');
      } catch (error) {
        console.error(error);
      }    
}

module.exports = async (client) => {
    await registerSlashCommands();

    readdirSync("./src/events").forEach(name => {
        let { eventName, execute } = requre(`./events/${name}`);

        client.on(eventName, (...args) => execute(client, ...args));
    });
}