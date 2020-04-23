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
import WorldWideCases from "./WorldWideCases";
import SeverityChart from "./SeverityChart";
import {addComma} from "./covidFunction";

const CanadaMap =  () => { 

    const [content, setTooltipContent] = useState("");
    const [enteredMap, setEnteredMap] = useState(false);
    const [regionType, setRegionType] =  useState({name: "Canada" , topojson: canada, data: {}, mapSize : {centerX : 0, centerY: 498, zoom:3, maxZoom: 5}});
    const getDetailedCountryCases = async () => setRegionType({name: "Canada" , topojson: canada, data: await fetchDetailedNumberOfCasesByCountry("Canada"), mapSize : {centerX : 0, centerY: 498, zoom:3, maxZoom: 5}});
    const updateMap = (name) => {
        if(name === "Canada")
            setRegionType({name: "Quebec" , topojson: quebec, data : quebecData , mapSize : {centerX : -68, centerY: 45, zoom:6, maxZoom: 15}});
        else if(name === "Quebec")
            setRegionType({name: "Montreal" , topojson: montreal, data : montrealData , mapSize : {centerX : -29, centerY: 500, zoom:3, maxZoom: 5}});
        else if(name === "Montreal")
            getDetailedCountryCases()
    };

    const nextMap = (name) => {
        if(name === "Canada")
            return "Quebec";
        else if(name === "Quebec")
            return"Montreal";
        else if(name === "Montreal")
            return "Canada";
    };

    useEffect( () => {
        window.scrollTo(0, 0);
        getDetailedCountryCases()
        return () =>  null;
    }, []);
    
    const handleEvent = async (geo) => {
        setEnteredMap(true);
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
    const CanadaSeverityLevels = (confirmedCase) => {
      const {name} = regionType;

      const severityLevels =  {
        "Canada" : {
          "high" : 10000,
          "mediumHigh" : 5000,
          "medium" : 1000,
          "mediumLow" : 250,
          "low" : 100,
          "veryLow" : 1
        },
         "Quebec" : {
          "high" : 5000,
          "mediumHigh" : 2000,
          "medium" : 1000,
          "mediumLow" : 100,
          "low" : 50,
          "veryLow" : 1
        },
         "Montreal" : {
          "high" : 500,
          "mediumHigh" : 250,
          "medium" : 100,
          "mediumLow" : 50,
          "low" : 10,
          "veryLow" : 1
        }
      };

      if(confirmedCase > severityLevels[name].high)
          return "high";
      else if(confirmedCase < severityLevels[name].high && confirmedCase >= severityLevels[name].mediumHigh)
          return "mediumHigh";
      else if(confirmedCase < severityLevels[name].mediumHigh && confirmedCase >= severityLevels[name].medium)
          return "medium";
      else if(confirmedCase < severityLevels[name].medium && confirmedCase >= severityLevels[name].mediumLow)
          return "mediumLow";
      else if(confirmedCase < severityLevels[name].mediumLow && confirmedCase >= severityLevels[name].low)
          return "low";
      else if(confirmedCase < severityLevels[name].low && confirmedCase >= severityLevels[name].veryLow)
          return "veryLow";
      else return "noCases";
    };

    const fillColor = geo => {
      const {NAME} = geo.properties;
      const confirmed = regionType.data[[NAME]] ? regionType.data[[NAME]].confirmed : 0;
      const level = CanadaSeverityLevels(confirmed);
      switch(level){
        case "high":
          return "#661a00"
        case "mediumHigh":
          return "#cc2900"
        case "medium":
          return "#ff4000"
        case "mediumLow":
          return "#ff9900"
        case "low":
          return "#ffff00"
        case "veryLow":
          return "#ffff99"
        default:
          return "#D6D6DA"
      }
    };

    return (
    <div>
    <Headers linkTo = "#/Covid" headerTitle={`Covid19 cases in ${regionType.name}`}/>  
    
    <div className= "covid19Canada">  
    
      <div className="world__cases">
          <WorldWideCases mapType= {regionType.name} />
          <button className="nextMap__button" onClick = {() => updateMap(regionType.name) }>  {`See cases in ${nextMap(regionType.name)}`} </button>
      </div>

    <SeverityChart region = {regionType.name}/>
    
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
                    setEnteredMap(false);
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
      {enteredMap === true &&
        <ReactTooltip place="top" type="dark" effect="float">
          {( content === "" )  ?
                "loading" :
                <ul> 
                {content.split("—").map((data, key) => 
                  <li key= {key}>  
                    {data} 
                  </li>)}
                </ul>
          }
      </ReactTooltip>
    }

      </div>
    </div>
      ) 
}

export default CanadaMap;

