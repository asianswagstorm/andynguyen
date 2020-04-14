import React, {useState,useEffect} from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from "react-simple-maps";
import canada from "./topojsons/canada.topojson";
import quebec from "./topojsons/quebec.json";
import quebecData from "./manualCases/casesInQuebec.json";
import montreal from "./topojsons/montreal.topojson";
import montrealData from "./manualCases/casesInMontreal.json";
import ReactTooltip from "react-tooltip";
import {fetchDetailedNumberOfCasesByCountry} from "./coronavirusAPI";
import Headers from "../Headers";
//try to get if not then not available. 
//make a chart color fill!!! 
const CanadaMap =  () => { 
    const [content, setTooltipContent] = useState("");
    const [regionType, setRegionType] =  useState({name: "Canada" , topojson: canada, data: {}});

    const getDetailedCountryCases = async () => setRegionType({name: "Canada" , topojson: canada, data: await fetchDetailedNumberOfCasesByCountry("Canada")});
    const updateMap = (name) => {
        if(name === "Canada")
            setRegionType({name: "Quebec" , topojson: quebec, data : quebecData});
        else if(name === "Quebec")
            setRegionType({name: "Montreal" , topojson: montreal, data : montrealData});
        else if(name === "Montreal")
            getDetailedCountryCases()
    };

    useEffect( () => {
        getDetailedCountryCases()
    }, []);
    
    return (
    <div>
    <Headers linkTo = "#/Covid" headerTitle={`Covid19 cases in ${regionType.name}`}/>  
    <div className= "covid19">  
    <ComposableMap data-tip="" projectionConfig={{ scale: 180 }}>
        <ZoomableGroup>
          <Geographies geography={regionType.topojson}>
            {({ geographies }) =>
             geographies.map((geo) => {
                  return(
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={async () => {
                    const {NAME} = geo.properties;
                    setTooltipContent(NAME);
                    let stringBuilder = NAME;
                    const confirmed = regionType.data[[NAME]] ? regionType.data[[NAME]].confirmed : 0;
                    stringBuilder = `${stringBuilder}—Confirmed: ${confirmed}`;
                    if(regionType.name === "Canada"){
                    const recovered = regionType.data[[NAME]] ? regionType.data[[NAME]].recovered : 0;
                    const deaths = regionType.data[[NAME]] ? regionType.data[[NAME]].deaths : 0; 
                    stringBuilder = `${stringBuilder}—Deaths: ${deaths}—Recovered: ${recovered}`;
                   }
                    setTooltipContent(stringBuilder);
                }}
                  onClick= {() => updateMap(regionType.name)}
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
                      outline: "none",
                      stroke: "black",
                      strokeWidth: '0.1px',
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none"
                    }
                  }}
                />
                )})
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap> 
      {content !== "" && 
      <ReactTooltip place="top" type="dark" effect="float">
              <ul> 
                  {content.split("—").map((data, key) => 
                  <li key= {key}>  
                    {data} 
                   </li>)}
              </ul>
     </ReactTooltip>
    }
      </div>
    </div>
      ) 
}

export default CanadaMap;

