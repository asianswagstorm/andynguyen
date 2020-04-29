import React from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from "react-simple-maps";

import {addComma} from "./covidFunction";

const CanadaMap =  ({regionType,setTooltipContent,fillColor}) => { 
    const handleEvent = async (geo) => {
      const {NAME} = geo.properties;
      setTooltipContent(NAME);
      let stringBuilder = NAME;
      const confirmed = regionType.data[[NAME]] ? regionType.data[[NAME]].confirmed : 0;
      stringBuilder = `${stringBuilder}—Confirmed: ${addComma(confirmed)}`;
      if(regionType.name !== "Montreal"){
          const deaths = regionType.data[[NAME]] ? regionType.data[[NAME]].deaths : 0; 
          stringBuilder = `${stringBuilder}—Deaths: ${addComma(deaths)}`;
      }
      if(regionType.name === "Canada"){
          const recovered = regionType.data[[NAME]] ? regionType.data[[NAME]].recovered : 0;
          stringBuilder = `${stringBuilder}—Recoved: ${addComma(recovered)}`;
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

                    style={{
                      default: {
                        fill: fillColor(geo),
                        stroke: "black",
                        strokeWidth: '0.1px',
                        outline: "none"
                      },
                      hover: {
                        fill: fillColor(geo),
                        outline: "none",
                        stroke: "black",
                        strokeWidth: '0.1px',
                        opacity: "0.3"
                      },
                      pressed: {
                        fill: "#E42",
                        outline: "none",
                        opacity: "0.3"
                      }
                    }}
                  />
                  )})
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap> 
      ) 
};

export default CanadaMap;

