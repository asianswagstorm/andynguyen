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
import {addComma,rounded} from "./covidFunction";

const WorldMapChart =  ({ setTooltipContent,allCountry, colorFill }) =>{
  const handleEvent = async (geo) => {
    const { NAME, POP_EST, ISO_A2 } = geo.properties;
    const data = allCountry[NAME] ;
    const recovered = data ? data.recovered : 'unknown';
    const confirmed = data ? data.confirmed : 'unknown';
    const deaths = data ? data.deaths : 'unknown'; 
    
    setTooltipContent(`${NAME}—Population: ${rounded(POP_EST)}—Confirmed: ${addComma(confirmed)}—Deaths: ${addComma(deaths)}—Recovered: ${addComma(recovered)}—${ISO_A2}`);
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
