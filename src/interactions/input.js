const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction } = require("discord.js");
const { run: add } = require("./input.add.js");
const { run: remove } = require("./input.remove.js");
const { run: list } = require("./input.list.js");

const data = new SlashCommandBuilder()
    .setName("input")
    .setDescription("Adjust/view input stream list")
    .addSubcommand(subcommand =>
        subcommand
            .setName("add")
            .setDescription("Add to the list of input feeds.")
            .addChannelOption(option => option.setName("channel").addChannelType(0).setDescription("channel to add").setRequired(true))
        )
    .addSubcommand(subcommand => 
        subcommand
            .setName("remove")
            .setDescription("Remove to the list of input feeds.")
            .addChannelOption(option => option.setName("channel").addChannelType(0).setDescription("channel to remove").setRequired(true))
        )
    .addSubcommand(subcommand => 
        subcommand
            .setName("list")
            .setDescription("List of input feeds.")
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