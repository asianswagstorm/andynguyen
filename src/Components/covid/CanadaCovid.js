import React, {useState,useEffect} from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from "react-simple-maps";
import ReactTooltip from "react-tooltip";
import {fetchDetailedNumberOfCasesByCountry} from "./coronavirusAPI";
import Headers from "../Headers";
//try to get if not then not available. 
const canadaTopoJSON = 'https://raw.githubusercontent.com/rkini/Topojsons/master/canada.topojson'
const filterCanadianProvinces = (abbreviation) => {
    switch(abbreviation){
        case "QC":
            return "Quebec";
        case "ON":
            return "Ontario";
        case "AB":
            return "Alberta";
        case "BC":
            return "British Columbia";
        case "NS":
            return "Nova Scotia";
        case "SK":
            return "Saskatchewan";
        case "MB":
            return "Manitoba";
        case "NL":
            return "Newfoundland and Labrador";
        case "NB":
            return "New Brunswick";
        case "PE":
            return "Prince Edward Island";
        case "YT":
            return "Yukon";
        case "NT":
            return "Northwest Territories";
        case "NU":
            return "Nunavut";
        default:
            return abbreviation;
    }
}

const CanadaMap =  () => { 
    const [content, setTooltipContent] = useState("");
    const [data, setCountryCases] = useState({})
    useEffect( () => {
        const getDetailedCountryCases = async () => setCountryCases(await fetchDetailedNumberOfCasesByCountry("Canada"))
        getDetailedCountryCases()
    }, []);
    return (
    <div>
    <Headers linkTo = "#/Covid" headerTitle="Covid19 cases in Canada"/>  
    <div className= "covid19">  
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
        <ZoomableGroup>
          <Geographies geography={canadaTopoJSON}>
            {({ geographies }) =>
              geographies.map(geo => {
                  return(
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={async () => {
                    const NAME = filterCanadianProvinces(geo.properties.NAME);
                    const recovered = data[[NAME]] ? data[[NAME]].recovered : 0;
                    const confirmed = data[[NAME]] ? data[[NAME]].confirmed : 0;
                    const deaths = data[[NAME]] ? data[[NAME]].deaths : 0; 
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
                />)
                })
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
