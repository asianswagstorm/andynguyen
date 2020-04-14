import React, {useState,useEffect} from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from "react-simple-maps";
import canada from "./topojsons/canada.topojson";
import quebec from "./topojsons/quebec.json";
import montreal from "./topojsons/montreal.topojson";
import ReactTooltip from "react-tooltip";
import {fetchDetailedNumberOfCasesByCountry} from "./coronavirusAPI";
import Headers from "../Headers";
//try to get if not then not available. 

const CanadaMap =  () => { 
    const [content, setTooltipContent] = useState("");
    // const [data, setCountryCases] = useState({});
    // const [regionType, setRegionType] = "provincial";



    useEffect( () => {
        // console.log(quebec)
        // const getDetailedCountryCases = async () => setCountryCases(await fetchDetailedNumberOfCasesByCountry("Canada"))
        // getDetailedCountryCases()
    }, []);
    return (
    <div>
    <Headers linkTo = "#/Covid" headerTitle="Covid19 cases in Canada"/>  
    <div className= "covid19">  
    <ComposableMap data-tip="" projectionConfig={{ scale: 180 }}>
        <ZoomableGroup>
          <Geographies geography={canada}>
            {({ geographies }) =>
             geographies.map((geo) => {
                  return(
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={async () => {
                    setTooltipContent((geo.properties && geo.properties.NAME) ? geo.properties.NAME : geo.id);
                    // const {NAME} = geo.properties;
                    // const recovered = data[[NAME]] ? data[[NAME]].recovered : 0;
                    // const confirmed = data[[NAME]] ? data[[NAME]].confirmed : 0;
                    // const deaths = data[[NAME]] ? data[[NAME]].deaths : 0; 
                    // setTooltipContent(NAME);
                    // setTooltipContent(`${NAME}—Confirmed: ${confirmed}—Deaths: ${deaths}—Recovered: ${recovered}`);  
                }}
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
              {/* <ul> 
                  {content.split("—").map((data, key) => 
                  <li key= {key}>  
                    {data} 
                   </li>)}
              </ul> */}
              {content}
     </ReactTooltip>
    }
      </div>
    </div>
      ) 
}

export default CanadaMap;


/*
    const [content, setTooltipContent] = useState("");
    const [data, setCountryCases] = useState({});
    const [regionType, setRegionType] = "provincial";

    useEffect( () => {
        // console.log(quebec)
        const getDetailedCountryCases = async () => setCountryCases(await fetchDetailedNumberOfCasesByCountry("Canada"))
        getDetailedCountryCases()
    }, []);
    return (
    <div>
    <Headers linkTo = "#/Covid" headerTitle="Covid19 cases in Canada"/>  
    <div className= "covid19">  
    <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
        <ZoomableGroup>
          <Geographies geography={canada}>
            {({ geographies }) =>
             geographies.map((geo, key) => {
                  return(
                <Geography
                  key={key}
                  geography={geo}
                  onMouseEnter={async () => {
                    // setTooltipContent((geo.properties && geo.properties.NAME) ? geo.properties.NAME : geo.id);
                    const {NAME} = geo.properties;
                    const recovered = data[[NAME]] ? data[[NAME]].recovered : 0;
                    const confirmed = data[[NAME]] ? data[[NAME]].confirmed : 0;
                    const deaths = data[[NAME]] ? data[[NAME]].deaths : 0; 
                    setTooltipContent(NAME);
                    setTooltipContent(`${NAME}—Confirmed: ${confirmed}—Deaths: ${deaths}—Recovered: ${recovered}`);  
                }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}

                  style={{
                    default: {
                      fill: "#D6D6DA",
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
                )})
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap> 
      {content !== "" && 
      <ReactTooltip place="top" type="dark" effect="float">
              { <ul> 
                  {content.split("—").map((data, key) => 
                  <li key= {key}>  
                    {data} 
                   </li>)}
              </ul> }
            
     </ReactTooltip>
    }
      </div>
    </div>
      ) 
*/