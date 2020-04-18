import React, { Component } from "react";
import Stats from "./pokemonHelper/Stats";
import Profile from "./pokemonHelper/Profile";
import Evolution from "./pokemonHelper/Evolution";
import Headers from "../Headers";
import { css } from "@emotion/core";
import RingLoader from "react-spinners/RingLoader";
import './styles/Pokemon.css';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import {pokemonImage,getPokemonEvolution,getPokeData,getPokeSpecies} from "./apiServices/pokeAPI";
import {TYPE_COLORS} from "./constants/pokemonConstants";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  transform: translateY(50%);
`;

class Pokemon extends Component {

  constructor(props){
    super(props);
    this.state = {
      name: "",
      pokemonIndex: this.props.match.params.pokemonIndex,
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
      imageLoading: true,
      pokemonLoaded : false
    }; 
  }

  componentDidMount = () => this.updatePokemon(this.props.match.params.pokemonIndex)
  
  updatePokemon = async (pokemonIndex) => {
    try {
      this.setState({pokemonLoaded: false, imageLoading: true})
      const pokemon = (await getPokeData(pokemonIndex)).data;
      const speciesData =  await getPokeSpecies(pokemonIndex).then(response => response.json());
      this.props.history.push(`/Pokemon/${pokemonIndex}`);
  
        
      this.setUpPokeState(pokemon,speciesData);
    } catch (error) {
      (process.env.NODE_ENV.trim() !== 'production') && console.log("Invalid pokemon ID");//front end
      (process.env.NODE_ENV.trim() !== 'production') && console.log(error);
    }
  };

  capitalize_firstLetter = string =>
            string
              .toLowerCase()
              .charAt(0)
              .toUpperCase() + string.slice(1);

    setUpPokeState = async(pokemon,speciesData) => {
  
    const types = pokemon.types.map(type => type.type.name);
    const themeColor = `${TYPE_COLORS[types[types.length - 1]]}`;
        
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

    const evs = pokemon.stats
            .filter(stat => (stat.effort > 0 ? true : false))
            .map(
              stat =>
                `${stat.effort} ${stat.stat.name
                  .toLowerCase()
                  .split("-")
                  .map(s => this.capitalize_firstLetter(s))
                  .join(" ")}`
            )
            .join(", ");

    const eggGroups = speciesData.egg_groups.map(x =>
            this.capitalize_firstLetter(x.name)
          );
    const abilities = pokemon.abilities.map(x =>
            x.ability.name
              .split("-")
              .map(s => this.capitalize_firstLetter(s))
              .join(" ")
          );
    const habitat = (speciesData.habitat != null) ? this.capitalize_firstLetter(speciesData.habitat.name) : "Not Available" ;
    const hatchSteps = 255 * speciesData.hatch_counter;
    const evolution_url = speciesData.evolution_chain.url;
    const evolution_data =
            evolution_url !== ""
              ? await getPokemonEvolution(evolution_url)
              : "not found";

    const data_json = evolution_url !== "" && evolution_data.data.chain ;
    const stage1 = this.capitalize_firstLetter(data_json.species.name);
    const stage1ID = data_json.species.url.split("/")[6];
    const stage2 = (data_json.evolves_to[0] != null) ? this.capitalize_firstLetter(data_json.evolves_to[0].species.name) : "None";
    const stage2ID = (data_json.evolves_to[0] != null) ? data_json.evolves_to[0].species.url.split("/")[6] : 0;
    const stage3 = (data_json.evolves_to[0] != null) ? (( (data_json.evolves_to[0].evolves_to[0] != null) ) ? this.capitalize_firstLetter(
    data_json.evolves_to[0].evolves_to[0].species.name) : "None") : "None" ;
    const stage3ID = (data_json.evolves_to[0] != null) ? (( (data_json.evolves_to[0].evolves_to[0] != null) ) ? data_json.evolves_to[0].evolves_to[0].species.url.split(
    "/")[6] : 0) : 0 ;
    
    this.setState({
                pokemonIndex : pokemon.id,
                name : this.capitalize_firstLetter(pokemon.name),
                height: pokemon.height * 10,
                weight: Math.round(pokemon.weight * (2.20462 / 10)),
                imageUrl: pokemonImage(pokemon.id),
                stats: pokemon.stats,
                hp: pokemon.stats[5].base_stat,
                attack: pokemon.stats[4].base_stat,
                defense: pokemon.stats[3].base_stat,
                specialAttack: pokemon.stats[2].base_stat,
                specialDefense: pokemon.stats[1].base_stat,
                speed: pokemon.stats[0].base_stat,
                types : pokemon.types,
                themeColor,
                description, 
                catchRate : Math.round(speciesData.capture_rate * (100 / 255)),
                eggGroups,
                habitat,
                hatchSteps,
                abilities,
                genderRatioFemale : 12.5 * speciesData.gender_rate,
                genderRatioMale : 12.5 * (8 - speciesData.gender_rate),
                evolution_url,
                evolution_data: JSON.stringify(data_json),
                stage1,
                stage2,
                stage3,
                stage1ID,
                stage2ID,
                stage3ID,
                evs,
                pokemonLoaded : true
              });
  };

  render = () =>  {

    const filterGenderRatio = ratio => {
      if(ratio > 100)
          return 100;
      else if(ratio < 0)
          return 0;
      else return ratio;
    };

    const gender_ratio = (
      <div className="gender-progress"  style={{
        width: '100%',
      }}>
        <div
          className="female-progress-bar"
          role="progressbar"
          style={{
            width: `${filterGenderRatio(this.state.genderRatioFemale)}%`,
            backgroundColor: "#FF69B4"
          }}
          aria-valuenow="15"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <small>{filterGenderRatio(this.state.genderRatioFemale)} %</small>
        </div>
        <div
          className="male-progress-bar"
          role="progressbar"
          style={{
            width: `${filterGenderRatio(this.state.genderRatioMale)}%`,
            backgroundColor: "#1976d2"
          }}
          aria-valuenow="30"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <small>{filterGenderRatio(this.state.genderRatioMale)} %</small>
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
      <div>
        <Headers linkTo = "#/Pokemon" headerTitle="Pokedex"/>
        <div className="pokemon-data">
          <div className="card">
            {this.state.imageLoading && (
                <div className="pokemon__loading">
                    <RingLoader
                      css={override}
                      size={250}
                      color={"#123abc"}
                      loading={this.state.imageLoading}
                    />  
                </div>
              )
            }
            {this.state.pokemonLoaded === true && (
            <div className="card">
              <div className="pokemon__info card-header">
                  <div className="poke_index row">Pokedex #{this.state.pokemonIndex}</div>
                  
                  <div className="prev__next__poke row"> 
                      <button id="toggle__pokemon__btn" onClick={() => this.updatePokemon((pokeIndex >= 2) ? pokeIndex - 1 : 807 )}  className= "previous_pokemon"> prev</button>
                      <button id="toggle__pokemon__btn" onClick={() => this.updatePokemon((pokeIndex < 807) ? pokeIndex + 1 : 1) }  className= "next_pokemon"> next</button>
                  </div>
                    
                  <div className="pokemon_pill row">
                          {this.state.types.map((x, key) => (
                            <span
                              key={key}
                              className="badge badge-pill mr-1"
                              style={{
                                backgroundColor: `#${TYPE_COLORS[x.type.name]}`,
                                color: "white",
                                borderRadius: "100px",
                                width: "100px",
                                height: "25px"
                              }}
                            >
                              {x.type.name}
                            </span>
                          ))}
                  </div>
                
              </div>

                <div className="pokemon_card_body">
                  <div className="pokemon_with_stats">
                    <div className="pokemon_shown">
                      <img
                        src={this.state.imageUrl}
                        alt={"A Photograph of a Pokemon"}
                        onLoad={() => this.setState({ imageLoading: false })}
                        className="card-img-top"
                      />
                    </div>
                    <div className="pokemon_shown_name">
                      <h4 className="mx-auto">
                        {this.state.name}
                      </h4>
                      {allStats}
                    </div>
                  </div>
                  <p className="pokemon__description">{this.state.description}</p> 
                </div>
                <div className="pokemon_card_body">
                  <div className="poke_profile_title">
                    <h5 id="poke">Profile</h5>
                  </div>  
                <div className="pokemon_profile row">
                  <div className="pokemon_profile_left col-sm">
                    <div className="poke_left_content">
                      {leftProfile}
                    </div>
                  </div>  
                  <div className="pokemon_profile_right col-sm">
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
            )}
          </div>
        </div>
      </div>
    );
  };
};

const mapStateToProps = state => { 
  const pokemonProps  = state.PokemonReducer.defaultPokemonStates; 
  const {pokemon,speciesData,pokemonIndex} = pokemonProps;

  return {pokemon,speciesData,pokemonIndex};
};

export default withRouter(connect(mapStateToProps)(Pokemon));

