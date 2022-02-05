const { Pokemon, Spawn, Evolution } = require("./models-create");

function createModels() {
    Pokemon.sync({ force: true });
    Spawn.sync({ force: true });
    Evolution.sync({ force: true });
}

module.exports = createModels