const { CommandInteraction } = require("discord.js");
const { Stream } = require("../database/models");
const { UniqueConstraintError } = require('sequelize');

module.exports = {
    name: "add",
    description: "Add a channel to a broadcast/input feed.",
    options: [
        { 
            type: 7,
            name: "channel",
            description: "channel to read",
            required: true,
            channel_types: [0]
        },
        {
            type: 3,
            name: "league",
            description: "type of league",
            choices: [
                {
                    name: "Great League",
                    value: "GL"
                }, 
                {
                    name: "Ultra League",
                    value: "UL"
                },
                {
                    name: "Master League",
                    value: "ML"
                }
            ],
            required: true
        },
        {
            type: 3,
            name: "type",
            description: "type of stream",
            choices: [
                {
                    name: "Input",
                    value: "input"
                }, 
                {
                    name: "Broadcast",
                    value: "broadcast"
                }
            ],
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    run: async (interaction) => {
        const channel = interaction.options.getChannel("channel");
        const league = interaction.options.getString("league");
        const stream_type = interaction.options.getString("type");

        Stream.build({
            channel_id: channel.id,
            league,
            stream_type
        }).save().then(() => {
            interaction.reply({ content: `Added ${channel} to ${league} ${stream_type} list.`, ephemeral: true });
        }, reason => {
            if (reason instanceof UniqueConstraintError) {
                interaction.reply({ content: `${channel} already added.`, ephemeral: true });
            } else {
                interaction.reply({ content: "Something went wrong, try agian later.", ephemeral: true });
            }
        });
    }
}