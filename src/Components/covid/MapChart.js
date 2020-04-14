import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import {fetchNumberOfCasesByCountry} from "./coronavirusAPI";
import "./styles/corona.css";
import worldTopo from "./topojsons/world.topojson";
const geoUrl = worldTopo ;


const filterName = (name) => {
    if(name === "United States of America")
        return "US";
    else 
        return name; 
}

export const rounded = num => {
    if (num > 1000000000) {
      return Math.round(num / 100000000) / 10 + "Bn";
    } else if (num > 1000000) {
      return Math.round(num / 100000) / 10 + "M";
    } else if (num > 1000)  {
      return Math.round(num / 100) / 10 + "K";
    } else {
      return num;
    }
  };


const MapChart =  ({ setTooltipContent }) =>{
  const handleEvent = async (geo) => {
    const { NAME, POP_EST, ISO_A2 } = geo.properties;
    const data = await fetchNumberOfCasesByCountry(filterName(NAME));
    const recovered = data.recovered ? data.recovered.value : 'unknown';
    const confirmed = data.confirmed ? data.confirmed.value : 'unknown';
    const deaths = data.deaths ? data.deaths.value : 'unknown'; 
  
    setTooltipContent(`${NAME}—Population: ${rounded(POP_EST)}—Confirmed: ${rounded(confirmed)}—Deaths: ${rounded(deaths)}—Recovered: ${rounded(recovered)}—${ISO_A2}`);
  }
  return (
    <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
      
    <Geographies geography={geoUrl}>
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
            style={{
              default: {
                fill: "#D6D6DA",
                stroke: "black",
                strokeWidth: '0.1px',
                outline: "none"
              },
              hover: {
                fill: "#F53",
                outline: "none"
              },
              pressed: {
                fill: "#E42",
                outline: "none"
              }
            }}
          />
        ))
      }
    </Geographies>

  </ComposableMap>)
} 
     

export default MapChart;
