const { PG_HOST, PG_DATABASE, PG_USER, PG_PASSWORD }= require("../config");
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(PG_DATABASE, PG_USER, PG_PASSWORD, {
    storage: PG_HOST,
    dialect: 'postgres'
});

const Pokemon = sequelize.define('pokemon', {
    pokemon_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    rank: DataTypes.INTEGER,
    level: DataTypes.FLOAT,
    league: DataTypes.STRING,
    species: DataTypes.STRING,
});

const Spawn = sequelize.define('spawn', {
    spawn_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    pokemon_id: {
        type: DataTypes.UUID,
        references: {
            model: Pokemon,
            key: 'pokemon_id'
        }
    },
    location: DataTypes.STRING,
    cord: DataTypes.STRING,
    dsp: DataTypes.DATE,
    candy: DataTypes.INTEGER,
    xl_candy: DataTypes.INTEGER,
    dust: DataTypes.INTEGER,
    cp: DataTypes.INTEGER,
    pu_cp: DataTypes.INTEGER,
    pu_lvl: DataTypes.FLOAT,
    iv: DataTypes.STRING
}, {
    timestamps: true,
    updatedAt: false
});

const Evolution = sequelize.define('evolution', {
    evolution_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
            model: Pokemon,
            key: 'pokemon_id'
        }
    },
    pokemon_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
            model: Pokemon,
            key: 'pokemon_id'
        }
    }
});

module.exports = { Pokemon, Spawn, Evolution }