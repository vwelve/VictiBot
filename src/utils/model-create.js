const { Pokemon, Spawn, Evolution } = require("./models");

async function createModels() {
    await Pokemon.sync({ force: true });
    await Spawn.sync({ force: true });
    await Evolution.sync({ force: true });
}

createModels();