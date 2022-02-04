require("dotenv").config();

module.exports = {
    DISCORD_TOKEN: process.env.DISCORD_TOKEN,
    PG_DATABASE: process.env.PG_DATABASE,
    PG_HOST: process.env.PG_HOST,
    PG_PASSWORD: process.env.PG_DATABASE,
    PG_PORT: process.env.PG_PORT,
    PG_USER: process.env.PG_USER,
    SHEETS_KEY: process.env.SHEETS_KEY,
    GUILD_ID: process.env.GUILD_ID,
    CLIENT_ID: process.env.CLIENT_ID
}