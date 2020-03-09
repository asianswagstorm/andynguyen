import React, { Component } from "react";
import Stats from "./pokemonHelper/Stats";
import Profile from "./pokemonHelper/Profile";
import Evolution from "./pokemonHelper/Evolution";
import Axios from "axios";
import spinner from './spinner.gif';
import './styles/Pokemon.css';
import {getPokeData,getPokeSpecies,pokemonImage} from "./apiServices/pokeAPI";
import {TYPE_COLORS} from "./constants/pokemonConstants";

export default class Pokemon extends Component {
  state = {
    name: "",
    pokemonIndex: "",
    imageUrl: "",
    types: [],
    description: "",
    stats: {
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      specialAttack: "",
      specialDefense: ""
    },
    height: "",
    weight: "",
    eggGroups: "",
    catchRate: "",
    abilities: "",
    genderRatioMale: "",
    genderRatioFemale: "",
    evs: "",
    hatchSteps: "",
    habitat: "",
    evolution_url: "",
    evolution_data: "",
    stage1: "",
    stage1ID: "",
    stage2: "",
    stage2ID: "",
    stage3: "",
    stage3ID: "",
    themeColor: "#EF5350",
    imageLoading: true
  };

  componentDidMount = () => this.updatePokemon(this.props.match.params.pokemonIndex)

  updatePokemon = async (pokemonIndex) => {
    try {
      this.props.history.push(`/Pokemon/${pokemonIndex}`);

      let capitalize_firstLetter = string =>
        string
          .toLowerCase()
          .charAt(0)
          .toUpperCase() + string.slice(1);

      const pokeData =  await getPokeData(pokemonIndex);
      const speciesData = await getPokeSpecies(pokemonIndex).then(response => response.json());
      
      const poke = pokeData.data;
      const types = poke.types.map(type => type.type.name);
      const themeColor = `${TYPE_COLORS[types[types.length - 1]]}`;
      const pokemon_name = capitalize_firstLetter(poke.name);
      (process.env.NODE_ENV.trim() !== 'production') && console.log(poke);
      (process.env.NODE_ENV.trim() !== 'production') && console.log(speciesData);
      let description = "A Description";
      speciesData.flavor_text_entries.some(x => {
        if (
          x.language.name === "en" &&
          x.language.url === "https://pokeapi.co/api/v2/language/9/"
        ) {
          description = x.flavor_text;
        }
        return null;
      });

      const catchRate = Math.round(speciesData.capture_rate * (100 / 255));
      const femaleRate = speciesData.gender_rate;
      const genderRatioFemale = 12.5 * femaleRate;
      const genderRatioMale = 12.5 * (8 - femaleRate);

      const evs = poke.stats
        .filter(stat => (stat.effort > 0 ? true : false))
        .map(
          stat =>
            `${stat.effort} ${stat.stat.name
              .toLowerCase()
              .split("-")
              .map(s => capitalize_firstLetter(s))
              .join(" ")}`
        )
        .join(", ");

      const egg_groups = speciesData.egg_groups.map(x =>
        capitalize_firstLetter(x.name)
      );
      const abilities = poke.abilities.map(x =>
        x.ability.name
          .split("-")
          .map(s => capitalize_firstLetter(s))
          .join(" ")
      );
      let habitat = (speciesData.habitat != null) ? capitalize_firstLetter(speciesData.habitat.name) : "Not Available" ;
      const hatchSteps = 255 * speciesData.hatch_counter;

      const evolution_url = speciesData.evolution_chain.url;
      const evolution_data =
        evolution_url !== ""
          ? await Axios.get(
              `https://cors-anywhere.herokuapp.com/${evolution_url}`
            )
          : "not found";

          const data_json =
        evolution_url !== "" ? evolution_data.data.chain : pokemon_name;
      (process.env.NODE_ENV.trim() !== 'production') &&  console.log(data_json);

      const stage1 = capitalize_firstLetter(data_json.species.name);
      (process.env.NODE_ENV.trim() !== 'production') && console.log("stage1 " + stage1);
      const stage1ID = data_json.species.url.split("/")[6];

      const stage2 = (data_json.evolves_to[0] != null) ? capitalize_firstLetter(data_json.evolves_to[0].species.name) : "None";
      (process.env.NODE_ENV.trim() !== 'production') && console.log("stage2 " + stage2);
      const stage2ID = (data_json.evolves_to[0] != null) ? data_json.evolves_to[0].species.url.split("/")[6] : 0;

      
      const stage3 = (data_json.evolves_to[0] != null) ? (( (data_json.evolves_to[0].evolves_to[0] != null) ) ? capitalize_firstLetter(
        data_json.evolves_to[0].evolves_to[0].species.name) : "None") : "None" ;
      (process.env.NODE_ENV.trim() !== 'production') && console.log("stage3 " + stage3);
      const stage3ID = (data_json.evolves_to[0] != null) ? (( (data_json.evolves_to[0].evolves_to[0] != null) ) ? data_json.evolves_to[0].evolves_to[0].species.url.split(
        "/")[6] : 0) : 0 ;

      poke.length === 0
        ? this.setState({ message: "No such Pokemon Found" })
        : this.setState({
            pokemonIndex: poke.id,
            name: pokemon_name,
            height: poke.height * 10,
            weight: Math.round(poke.weight * (2.20462 / 10)),
            imageUrl: pokemonImage(pokemonIndex),
            stats: poke.stats,
            hp: poke.stats[5].base_stat,
            attack: poke.stats[4].base_stat,
            defense: poke.stats[3].base_stat,
            speed: poke.stats[0].base_stat,
            specialAttack: poke.stats[2].base_stat,
            specialDefense: poke.stats[1].base_stat,
            types: poke.types,
            themeColor: themeColor,
            description: description, //speciesData.flavor_text_entries[9].flavor_text
            catchRate: catchRate,
            eggGroups: egg_groups,
            habitat: habitat,
            hatchSteps: hatchSteps,
            abilities: abilities,
            genderRatioFemale: genderRatioFemale,
            genderRatioMale: genderRatioMale,
            evolution_url: evolution_url,
            evolution_data: JSON.stringify(data_json),
            stage1: stage1,
            stage2: stage2,
            stage3: stage3,
            stage1ID: stage1ID,
            stage2ID: stage2ID,
            stage3ID: stage3ID,
            evs: evs
          });
    } catch (error) {
      (process.env.NODE_ENV.trim() !== 'production') && console.log("Invalid pokemon ID");//front end
      (process.env.NODE_ENV.trim() !== 'production') && console.log(error);
    }
  };

  render() {
    const gender_ratio = (
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{
            width: `${this.state.genderRatioFemale}%`,
            backgroundColor: "#FF69B4"
          }}
          aria-valuenow="15"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <small>{this.state.genderRatioFemale}</small>
        </div>
        <div
          className="progress-bar"
          role="progressbar"
          style={{
            width: `${this.state.genderRatioMale}%`,
            backgroundColor: "#1976d2"
          }}
          aria-valuenow="30"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <small>{this.state.genderRatioMale}</small>
        </div>
      </div>
    );

    const statsData = [
      {
        stats_type: "HP",
        stats_size: this.state.hp,
      },
      {
        stats_type: "Speed",
        stats_size: this.state.speed,
      },
      {
        stats_type: "Attack",
        stats_size: this.state.attack,
      },
      {
        stats_type: "Defense",
        stats_size: this.state.defense,
      },
      {
        stats_type: "Special Attack",
        stats_size: this.state.specialAttack,
      },
      {
        stats_type: "Special Defense",
        stats_size: this.state.specialDefense,
      }
    ];

    const profileData = [
      {
        profile_type: "Height:",
        profile_value: `${this.state.height} cm.`,
        genderRatioTrue: false
      },
      {
        profile_type: "Weight:",
        profile_value: `${this.state.weight} lbs`,
        genderRatioTrue: false
      },
      {
        profile_type: "Capture Rate:",
        profile_value: `${this.state.catchRate} %`,
        genderRatioTrue: false
      },
      {
        profile_type: "Gender Ratio:",
        profile_value: gender_ratio,
        genderRatioTrue: true
      },
      {
        profile_type: "Egg Group:",
        profile_value: `${this.state.eggGroups}`,
        genderRatioTrue: false
      },
      {
        profile_type: "Hatch Steps:",
        profile_value: `${this.state.hatchSteps}`,
        genderRatioTrue: false
      },
      {
        profile_type: "Habitat:",
        profile_value: `${this.state.habitat}`,
        genderRatioTrue: false
      },
      {
        profile_type: "Abilities:",
        profile_value: `${this.state.abilities}`,
        genderRatioTrue: false
      },
      {
        profile_type: "Effort Values:",
        profile_value: `${this.state.evs}`,
        genderRatioTrue: false
      }
    ];

    const allStats = statsData.map((x, index) => {
      return (
        <Stats
          key={index}
          stats_type={x.stats_type}
          stats_size={x.stats_size}
          themeColor={this.state.themeColor}
        />
      );
    });

    const leftProfile = profileData
      .slice(0, profileData.length / 2)
      .map((x, index) => {
        return (
          <Profile
            key={index}
            profile_type={x.profile_type}
            profile_value={x.profile_value}
            genderRatioTrue={x.genderRatioTrue}
          />
        );
      });

    const rightProfile = profileData
      .slice(profileData.length / 2, profileData.length)
      .map((x, index) => {
        return (
          <Profile
            key={index}
            profile_type={x.profile_type}
            profile_value={x.profile_value}
            genderRatioTrue={x.genderRatioTrue}
          />
        );
      });

    const pokeIndex = parseInt(this.props.match.params.pokemonIndex,10);

    return (
      <div className="col">
        <header className="MyHeader"> 
            <h1 id="my-games">
                <a href="#/"> Pokedex </a>
            </h1>
        </header>

        <div className="pokemon-data">
        <div className="card">
          <div className="pokemon_info">
            <div className="row">
              <div className="poke_index">{pokeIndex}</div>
              <div className="col-7">
                  
                <button onClick={() => this.updatePokemon((pokeIndex >= 2) ? pokeIndex - 1 : 807 )}  className= "previous_pokemon"> prev</button>
                <button onClick={() => this.updatePokemon((pokeIndex < 807) ? pokeIndex + 1 : 1) }  className= "next_pokemon"> next</button>
               
                <div className="pokemon_pill">
                  {this.state.types.map(x => (
                    <span
                      key={x.type.name}
                      className="badge badge-pill mr-1"
                      style={{
                        backgroundColor: `#${TYPE_COLORS[x.type.name]}`,
                        color: "white"
                      }}
                    >
                      {x.type.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pokemon_card_body">
            <div className="pokemon_with_stats">
              <div className="pokemon_shown">
                {this.state.imageLoading ? (
                <img
                    src={spinner}
                    alt={"loading gif"}
                    style={{ width: '5em', height: '5em' }}
                    className="card-img-top rounded mx-auto d-block mt-2"
                />
                ) : null}
                    <img
                    src={this.state.imageUrl}
                    alt={"A Photograph of a Pokemon"}
                    onLoad={() => this.setState({ imageLoading: false })}
                    className="card-img-top rounded mx-auto mt-2"
                    />
              </div>
              <div className="pokemon_shown_name">
                <h4 className="mx-auto">
                  {this.state.name}
                </h4>
                {allStats}
              </div>
            </div>
            <div className="row mt-1">
              <div className="pokemon_description">
                <p className="">{this.state.description}</p>
              </div>
            </div>
          </div>

          <div className="pokemon_card_body">
            <div className="poke_profile_title">
              <h5 id="poke">Profile</h5>
            </div>  
            <div className="pokemon_profile">
              <div className="pokemon_profile_left">
                <div className="poke_left_content">
                  {leftProfile}
                </div>
              </div>  
              <div className="pokemon_profile_right">
                <div className="poke_right_content">
                  {rightProfile}
                </div>
              </div>
            </div>
          </div>

          <div className="pokemon_card_body">
            <div className="poke_evolution_title">
              <h5 id="poke">Evolution</h5>
            </div>
            
            <div className= "evolution-chart"  style={{alignContent: "end"}}>
                {this.state.evolution_data ? (
                  <Evolution
                    updatePokemon = {(id) => this.updatePokemon(id)}
                    stage1={this.state.stage1}
                    stage2={this.state.stage2}
                    stage3={this.state.stage3}
                    stage1ID={this.state.stage1ID}
                    stage2ID={this.state.stage2ID}
                    stage3ID={this.state.stage3ID}
                  />
                ) : (
                  <div
                    className="loader"
                    style={{ width: "50px", height: "50px" }}
                  />
                )}
                
             </div>
          </div>
          <div className="pokemon_card_footer">
            Pokemon Data Obtained From
            <a
              href="https://pokeapi.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="poke_card_link"
            >
              PokeAPI.co
            </a>
          </div>
        </div>
        </div>
      </div>
    );
  };
};
