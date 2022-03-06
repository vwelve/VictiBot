const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction } = require("discord.js");
const { run: add } = require("./broadcast.add.js");
const { run: remove } = require("./broadcast.remove.js");
const { run: list } = require("./broadcast.list.js");

const data = new SlashCommandBuilder()
    .setName("broadcast")
    .setDescription("Adjust/view broadcast stream list")
    .addSubcommand(subcommand =>
        subcommand
            .setName("add")
            .setDescription("Add to the list of broadcast feeds.")
            .addChannelOption(option => option.setName("channel").addChannelType(0).setDescription("channel to add").setRequired(true))
            .addStringOption(option => option.setName("league").setDescription("league to broadcast").addChoices([
                ["Great League", "GL"],
                ["Ultra League", "UL"],
                ["Master League", "ML"],
                ["Any", "any"]
            ]).setRequired(true))
        )
    .addSubcommand(subcommand =>
        subcommand
            .setName("remove")
            .setDescription("Remove from the list of broadcast feeds.")
            .addChannelOption(option => option.setName("channel").addChannelType(0).setDescription("channel to remove").setRequired(true))
            .addStringOption(option => option.setName("league").setDescription("league to broadcast").addChoices([
                ["Great League", "GL"],
                ["Ultra League", "UL"],
                ["Master League", "ML"],
                ["Any", "any"]
            ]).setRequired(true))
        )
    .addSubcommand(subcommand => 
        subcommand
            .setName("list")
            .setDescription("List of broadcast feeds.")
            .addStringOption(option => option.setName("league").setDescription("league types to list").addChoices([
                ["Great League", "GL"],
                ["Ultra League", "UL"],
                ["Master League", "ML"],
                ["Any", "any"]
            ]))
        )

/**
 * 
 * @param {Client} _ 
 * @param {CommandInteraction} interaction 
 */
async function run(_, interaction) {
    const subcommand = interaction.options.getSubcommand();

    switch (subcommand) {
        case "add":
            add(interaction);
            break;
        case "remove":
            remove(interaction);
            break;
        case "list":
            list(interaction);
            break;
    }
}

module.exports = {
    data,
    run
}