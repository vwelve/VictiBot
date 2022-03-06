const { Pokemon, Spawn, Evolution, Input, Broadcast } = require("./models");

async function createModels() {
    await Pokemon.sync({ force: true });
    await Spawn.sync({ force: true });
    await Evolution.sync({ force: true });
    await Input.sync({ force: true });
    await Broadcast.sync({ force: true });
}

createModels();