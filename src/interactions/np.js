const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction } = require("discord.js");
const { run: add } = require("./np.add.js");
const { run: remove } = require("./np.remove.js");

const data = new SlashCommandBuilder()
    .setName("np")
    .setDescription("Non PVP")
    .addSubcommand(subcommand =>
        subcommand
            .setName("add")
            .setDescription("Add a channel to a broadcast/input feed.")
            .addChannelOption(option => option.setName("channel").addChannelType(0).setDescription("channel to add stream").setRequired(true))
            .addStringOption(option => option.setName("league").setDescription("type of league").addChoices([
                    ["Great League", "GL"],
                    ["Ultra League", "UL"],
                    ["Master League", "ML"]
                ]).setRequired(true))
            .addStringOption(option => option.setName("type").setDescription("type of stream").addChoices([
                    ["Input", "input"],
                    ["Broadcast", "broadcast"]
                ]).setRequired(true))
        )
    .addSubcommand(subcommand =>
        subcommand
            .setName("remove")
            .setDescription("Remove a channel from a broadcast/input feed.")
            .addChannelOption(option => option.setName("channel").addChannelType(0).setDescription("channel to remove stream").setRequired(true))
            .addStringOption(option => option.setName("league").setDescription("type of league").addChoices([
                    ["Great League", "GL"],
                    ["Ultra League", "UL"],
                    ["Master League", "ML"]
                ]).setRequired(true))
            .addStringOption(option => option.setName("type").setDescription("type of stream").addChoices([
                    ["Input", "input"],
                    ["Broadcast", "broadcast"]
                ]).setRequired(true))
        )


/**
 * 
 * @param {CommandInteraction} interaction 
 */
async function run(interaction) {
    const subcommand = interaction.options.getSubcommand();

    switch (subcommand) {
        case "add":
            add(interaction);
            break;
        case "remove":
            remove(interaction);
            break;
    }
}

module.exports = {
    data,
    run
}