import React from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from "react-simple-maps";

import {addComma} from "./covidFunction";

const CanadaMap =  ({data,regionType,setTooltipContent,colorFill}) => { 
    const handleEvent = async (geo) => {
      const {NAME} = geo.properties;
      setTooltipContent(NAME);
      let stringBuilder = NAME;
      const confirmed = data[[NAME]] ? data[[NAME]].confirmed : 0;
      stringBuilder = `${stringBuilder}—Confirmed: ${addComma(confirmed)}`;
      const deaths = data[[NAME]] ? data[[NAME]].deaths : 0; 
      stringBuilder = `${stringBuilder}—Deaths: ${addComma(deaths)}`;
      
      if(regionType.name === "Canada"){
          const recovered =data[[NAME]] ? data[[NAME]].recovered : 0;
          stringBuilder = `${stringBuilder}—Recovered: ${addComma(recovered)}`;
      }
      setTooltipContent(stringBuilder);
    }

    return (
  
      <ComposableMap data-tip="">  
          <ZoomableGroup center={[ regionType.mapSize.centerX, regionType.mapSize.centerY ]}  zoom = {regionType.mapSize.zoom} minZoom = {regionType.mapSize.zoom} maxZoom = {regionType.mapSize.maxZoom}>
            <Geographies geography={regionType.topojson}>
              {({ geographies }) =>
              geographies.map((geo) => {
                    return(
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => handleEvent(geo)}
                    onMouseEnter={() => handleEvent(geo)}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}

                    style={colorFill(geo)}
                  />
                  )})
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap> 
      ) 
};

export default CanadaMap;

