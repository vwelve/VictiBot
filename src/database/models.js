const { PG_HOST, PG_DATABASE, PG_USER, PG_PASSWORD }= require("../config");
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(PG_DATABASE, PG_USER, PG_PASSWORD, {
    storage: PG_HOST,
    dialect: 'postgres'
});

const league = Sequelize.ENUM("GL", "LC", "ML", "UL")

const Pokemon = sequelize.define('pokemon', {
    pokemon_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    rank: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    level: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    league: {
        type: league,
        allowNull: false
    },
    species: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    iv: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cp: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    att: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    def: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    sta: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    stat_product: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
}, {
    indexes: [{
        unique: true,
        fields: ["rank", "species", "league"]
    }]
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
        },
        allowNull: true
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
        references: {
            model: Pokemon,
            key: 'pokemon_id'
        }
    },
    pokemon_id: {
        type: DataTypes.UUID,
        references: {
            model: Pokemon,
            key: 'pokemon_id'
        }
    },
    league: {
        type: league,
        allowNull: false
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['evolution_id', 'pokemon_id', 'league']
        }
    ]
});

module.exports = { Pokemon, Spawn, Evolution }