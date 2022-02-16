const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Intents } = require('discord.js');
const { readdirSync } = require("fs");
const { CLIENT_ID, GUILD_ID, DISCORD_TOKEN } = require("./config");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const interactions = new Map();
const commands = [];

readdirSync('./src/interactions').forEach(name => {
    let interaction = require(`./interactions/${name}`);

    interactions.set(interaction.name, interaction.run);
    commands.push({
        name: interaction.name,
        description: interaction.description,
        options: interaction.options
    });

    console.log(`Loaded ${interaction.name} interaction.`);
});

const registerSlashCommands = async () => {
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

client.on('ready', async () => {
    await registerSlashCommands();
    
    console.log(`Logged in as ${client.user.tag}!`);
});
  
client.on('interactionCreate', async interaction => {
    if (interaction.isCommand()) {
        let cmd = interactions.get(interaction.commandName);
        cmd(interaction);
    }
});

client.on('messageCreate', async msg => {
    //if (!npInputFeeds.includes(`<#${groupId}>`)) {
    //    let input = message.content.match(/(?<==\s).*/gm);
    //    if (!input || input.length < 7) return;
    //    const dataFields = ["species", "emoji", "frm", "gndr", "prcnt", "idv", "ldvl", "cdp", "cty", "cntry", "flg", "mvs", "crds", "dsp", "source"];
    /*    const inputPokeData = {};
        dataFields.forEach(field=>{
            const fieldDataMatch = message.content.match(new RegExp(`(?<=${field} = ).*`));
            inputPokeData[field] = fieldDataMatch?fieldDataMatch[0]:null;
        });
        if (!isGoodNP(inputPokeData)) return;
        main.broadcastReducer(inputPokeData, null, true);
    }*/
});
  
client.login(DISCORD_TOKEN);