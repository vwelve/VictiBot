//========================
// deps
//========================
const gameMaster = require("pokemongo-game-master");

//=======================
// ignore list
// ======================
// Title Case
let ignoreList = ["Shadow", "shadow", "purified","normal", "Purified","Normal", "2019", "2020","2021","2018", "2017"];

//========================
// main
//========================
async function getRawData() {
  //prettier-ignore
  console.log("Getting latest data from https://github.com/pokemongo-dev-contrib/pokemongo-game-master");

  let rawData = await gameMaster
    .getVersion("latest", "json") //last version used: 1608378319559
    .then((rawData) => rawData.template);
  console.log("Data downloaded");
  //console.log(JSON.stringify(rawData, 2));

  // rawPokemon data
  let rawPokemon = {};
  rawData.forEach((item) => {
    //check if the data contains a pokemon
    if (!item.data.pokemon) return;

    //prettier-ignore
    let pokemonName = item.templateId.replace(/^.*POKEMON_/, '').replace('_', ' ');
    pokemonName = titleCase(pokemonName);

    //ignore pokemon transoformations in the ignoreList
    for (const str of ignoreList) {
      if (pokemonName.split(" ").length > 1 && pokemonName.split(" ")[1].endsWith(str)) return;
    }
    rawPokemon[pokemonName] = item.data.pokemon;
  });
  return rawPokemon;
}

module.exports = getRawData;

function titleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
