const { CommandInteraction } = require("discord.js");
const { Stream } = require("../database/models");
const { UniqueConstraintError } = require('sequelize');

module.exports = {
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