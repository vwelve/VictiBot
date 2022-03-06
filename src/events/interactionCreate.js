const { Client, Interaction } = require("discord.js");

module.exports = {
    eventName: "interactionCreate",
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    execute: async (client, interaction) => {
        if (interaction.isCommand()) {
            let cmd = client.interactions.get(interaction.commandName);
            cmd(client, interaction);
        }
    }
}