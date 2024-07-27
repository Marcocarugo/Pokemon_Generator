const typeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

let url = "https://pokeapi.co/api/v2/pokemon/";

function getPokeData() {
  return new Promise((resolve, reject) => {
    let id = Math.floor(Math.random() * 150) + 1;
    let finalurl = url + id;
    fetch(finalurl)
      .then((response) => {
        if (!response.ok) {
          reject(new Error("Pokemon not found"));
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);

        let type1 = data.types[0].type.name;
        let type2 = data.types[1].type.name;

        let type1Color = typeColors[type1];
        let type2Color = typeColors[type2];

        let mainType = data.types[0].type.name.toLowerCase();
        let typeColor = typeColors[mainType];

        const hp = data.stats[0].base_stat;
        const imgSrc = data.sprites.other.dream_world.front_default;
        const pokemonName = data.name;
        const attack = data.stats[1].base_stat;
        const defense = data.stats[2].base_stat;
        const speed = data.stats[5].base_stat;

        let card = document.getElementById("card");
        card.style.background = `radial-gradient(circle at 50% 0%, ${typeColor} 50%, #ffff 6%)`;

        card.innerHTML = `
          <p id="hp">
            <span>HP</span>
            ${hp}
          </p>
          <img src="${imgSrc}" id="image">
          <h2 id="title">${pokemonName}</h2>
          <div id="types">
            <span class ="first" style = "background-color: ${type1Color}" >${type1}</span>
            <span class ="second" style = "background-color: ${type2Color}" >${type2}</span>
          </div>
          <div id="stats">
            <div>
              <h3>${attack}</h3>
              <p>Attack</p>
            </div>
            <div>
              <h3>${defense}</h3>
              <p>Defense</p>
            </div>
            <div>
              <h3>${speed}</h3>
              <p>Speed</p>
            </div>
          </div>
        `;

        resolve();
      })
      .catch((error) => reject(error));
  });
}

let generateButton = document.getElementById("generate");
generateButton.addEventListener("click", function () {
  getPokeData().catch((error) => console.log(error));
});
