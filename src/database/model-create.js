const { Pokemon, Spawn, Evolution, Stream } = require("./models");

async function createModels() {
    await Pokemon.sync({ force: true });
    await Spawn.sync({ force: true });
    await Evolution.sync({ force: true });
    await Stream.sync({ force: true })
}

createModels();