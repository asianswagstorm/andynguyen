import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Sphere
} from "react-simple-maps";
import "./styles/corona.css";
import worldTopo from "./topojsons/world.topojson";
import {addComma} from "./covidFunction";

const WorldMapChart =  ({ setTooltipContent,data, colorFill }) =>{
  const handleEvent = async (geo) => {
    const { NAME } = geo.properties;
    const country = data[NAME] ;
    const recovered = country ? country.recovered : 'unknown';
    const confirmed = country ? country.confirmed : 'unknown';
    const deaths = country ? country.deaths : 'unknown'; 
    const population = country ? country.population : 'unknown'; 
    
    setTooltipContent(`${NAME}—Population: ${addComma(population)}—Confirmed: ${addComma(confirmed)}—Deaths: ${addComma(deaths)}—Recovered: ${addComma(recovered)}`);
  }
  return (
    <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
      <Sphere stroke="#DDD" />
      <Graticule stroke="#DDD" />
        <Geographies geography={worldTopo}>
          {({ geographies }) =>
            geographies.map(geo => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={() => handleEvent(geo)}
                onMouseDown={() => handleEvent(geo)}
                onMouseLeave={() => {
                  setTooltipContent("");
                }}
                style={colorFill(geo)}
              />
            ))
          }
        </Geographies>
  </ComposableMap>)
} 
    
export default WorldMapChart;
