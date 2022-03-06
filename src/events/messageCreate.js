const { Message, Client } = require("discord.js");
const { Input } = require("../database/models");
const dataFields = ["species", "emoji", "frm", "gndr", "prcnt", "idv", "ldvl", "cdp", "cty", "cntry", "flg", "mvs", "crds", "dsp", "source"];

function isGoodNP(pokeData) {

}

module.exports = {
    eventName: "messageCreate",
    /**
     * 
     * @param {Client} _ 
     * @param {Message} msg
     */
    execute: async (_, msg) => {
        if (msg.guild) {
            const isFeed = await Input.findOne({
                where: {
                    channel_id: msg.guild.id
                }
            }) ? true : false;
        
            /*if (isFeed) {
                let pokeData = {};
    
                dataFields.forEach(field => {
                    const fieldDataMatch = message.content.match(new RegExp(`(?<=${field} = ).*`));
                    pokeData[field] = fieldDataMatch ? fieldDataMatch[0] : null;
                });
                
                if (isGoodNP(pokeData)) {
                    main.broadcastReducer(pokeData, null, true);
                }
            }*/
        }
    }
}