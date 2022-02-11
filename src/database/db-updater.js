const getRawData = require("../utils/getRawData");
const calculator = require("../utils/calculator");
const { Pokemon, Evolution } = require('./models.js');
const { UniqueConstraintError } = require('sequelize')

let {
  leagues: LEAGUES,
  numOfRanks: NUM_OF_RANKS,
  minLevel: MIN_LEVEL,
  maxLevel: MAX_LEVEL,
  customEvolutions,
} = require("../utils/database-config.json");

/**
 * Saves the ranking of pokemon into
 * a database
 * @param {String} leagueName name of the league
 * @param {Number} leagueCP from database-config.json
 * @param {*} rawPokemon data from getRawData()
 */
async function saveRanks(leagueName, leagueCP, rawPokemon) {
    for (let [pokemon, data] of Object.entries(rawPokemon)) {
        if (!Object.keys(data.stats).length) {
            continue;
        }

        let baseatk = data.stats.baseAttack;
        let basedef = data.stats.baseDefense;
        let basesta = data.stats.baseStamina;
        let floor = 0;
    
        //calculator returns 4096, we need top 25
        let allRanks = calculator(baseatk, basedef, basesta, leagueCP, floor, MIN_LEVEL, MAX_LEVEL);
        let highestRanks = formatData(Object.entries(allRanks).slice(0, NUM_OF_RANKS));

        for (let rank of highestRanks) {
            await Pokemon.build({
                rank: Number(rank["Rank"]),
                level: Number(rank["Level"]),
                league: leagueName,
                species: pokemon,
                iv: rank["IVs (A/D/S)"],
                cp: rank.CP,
                att: rank.Att,
                def: rank.Def,
                sta: rank.Sta,
                stat_product: rank["Stat Product"]
            }).save().catch(UniqueConstraintError, err => {});
        }
    }
}
  
//======================
// HELPER FUNCTIONS
// =====================
/*
* {
*  IVs: { A: 14, D: 12, S: 15, star: '3*' },
*  battle: { A: 138.30250203609472, D: 119.33530175685888, S: 127 },
*  L: 40,
*  CP: 1704
*}
*/
function formatData(highestRanks) {
    let i = 0;
    let formatted = [];
  
    highestRanks.forEach((ranks) => {
        let Rank = ++i;
        
        let round = (num) => (Math.round(num * 10) / 10).toFixed(1);

      //2(or more) ranks with the same CP
        let rank = ranks[1][0];
        let Level = rank.L;
        let IVs = `${rank.IVs.A} / ${rank.IVs.D} / ${rank.IVs.S}`;
        let Att = round(rank.battle.A);
        let Def = round(rank.battle.D);
        let Sta = round(rank.battle.S);
        let CP = rank.CP;
        let statProd = ranks[0].split(".")[0];
    
        formatted.push({
            Rank,
            Level,
            "IVs (A/D/S)": IVs,
            CP,
            Att,
            Def,
            Sta,
            "Stat Product": statProd
        });
    });
    
    return formatted;
}

/**
 * Save the evolutions into the database
 */
async function saveEvolutions() {
    for (let league of Object.keys(customEvolutions)) {
        for (let pokemon of Object.keys(customEvolutions[league])) {
            for (let evol of Object.keys(customEvolutions[league][pokemon])) {
                let evolution_id = (await Pokemon.findOne({ 
                    where: {
                        species: evol,
                        league
                    } 
                }))?.pokemon_id

                let pokemon_id = (await Pokemon.findOne({
                    where: {
                        species: pokemon,
                        league
                    }
                }))?.pokemon_id
                
                if (evolution_id && pokemon_id) {
                    await Evolution.build({
                        evolution_id,
                        pokemon_id,
                        league
                    }).save().catch(UniqueConstraintError, err => {});
                }
            }
        }
    }
}

/**
 * Sets up the database
 */
async function start() {
  let rawData = await getRawData();
  for (let [leagueName, leagueCP] of Object.entries(LEAGUES)) {
        await saveRanks(
            leagueName,
            leagueCP,
            rawData
        );
        
        await saveEvolutions();
  }
}

start();