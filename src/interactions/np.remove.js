const { CommandInteraction } = require("discord.js");
const { Stream } = require("../database/models");

module.exports = {
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    run: async (interaction) => {
        const channel = interaction.options.getChannel("channel");
        const league = interaction.options.getString("league");
        const stream_type = interaction.options.getString("type");

        const stream = await Stream.findOne({
            where: {
                channel_id: channel.id,
                league,
                stream_type
            }
        });

        if (stream) {
            stream.destroy().then(() => {
                interaction.reply({ content: `Removed ${channel} from the ${league} ${stream_type} list.`, ephemeral: true });
            }, reason => {
                interaction.reply({ content: `Something went wrong, try again later.`, ephemeral: true });
                console.log(reason);
            });
        } else {
            interaction.reply({ content: `Nothing to remove.`, ephemeral: true });
        }
    }
}