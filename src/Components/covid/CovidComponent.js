import React, { useState,useEffect }  from 'react';
import WorldMapChart from "./WorldMapChart";
import CanadaMap from "./CanadaCovid";
import ReactTooltip from "react-tooltip";
import Headers from "../Headers";
import WorldWideCases from "./WorldWideCases"
import canada from "./topojsons/canada.topojson";
import quebec from "./topojsons/quebec.json";
import montreal from "./topojsons/montreal.topojson";
import {fetchAllCountries,fetchDetailedNumberOfCasesByCountry,fetchMontrealCases,fetchQuebecCases} from "./coronavirusAPI";
import SeverityChart from "./SeverityChart";

const getFlagByCountryCode =(country) => {
    return country.toUpperCase().replace(/./g, char => String.fromCodePoint(char.charCodeAt(0)+127397));
}

//montrealData
const nextMap = (name) => {
    if (name === "World")
        return "Canada";
    else if(name === "Canada")
        return "Quebec";
    else if(name === "Quebec")
        return"Montreal";
    else if(name === "Montreal")
        return "World";
};

const CovidComponent = (props) => {
    const [content, setContent] = useState("");
    const [regionType, setRegionType] =  useState({name: "World",data: {}});
    const getAllCountry = async () => {setRegionType({name: "World", data: await fetchAllCountries()});};
    const getDetailedCountryCases = async () => setRegionType({name: "Canada" , topojson: canada, data: await fetchDetailedNumberOfCasesByCountry("Canada"), mapSize : {centerX : 0, centerY: 498, zoom:3, maxZoom: 5}});
    const getMontrealCases = async () => setRegionType({name: "Montreal" , topojson: montreal, data : await fetchMontrealCases() , mapSize : {centerX : -29, centerY: 500, zoom:3, maxZoom: 3}});
    const getQuebecCases = async () => setRegionType({name: "Quebec" , topojson: quebec, data : await fetchQuebecCases() , mapSize : {centerX : -68, centerY: 45, zoom:6, maxZoom: 15}});

    const updateMap = (name) => {
        if(name === "World")
            getDetailedCountryCases()
        else if(name === "Canada")
            getQuebecCases()
        else if(name === "Quebec")
            getMontrealCases()
        else if(name === "Montreal")
            getAllCountry()
    };

    
    const SeverityLevelsChart = (confirmedCase) => {
      const {name} = regionType;
    
      const severityLevels =  {
        "World":{
            "high" : 1000000,
            "mediumHigh" : 100000,
            "medium" : 50000,
            "mediumLow" : 10000,
            "low" : 1000,
            "veryLow" : 1
        },
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
    
      const level = SeverityLevelsChart((confirmed.toString().includes(",") ? parseInt(confirmed.replace(",", "")) : parseInt(confirmed)));
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
    
    useEffect( () => {
        window.scrollTo(0, 0);
        getAllCountry();
        return () =>  null;
    }, []);
    return (
        <div>
            <Headers linkTo = "#/" headerTitle="Global SARS CoV2 Cases"/>   
            <div className= "covid19"> 
                    <div className="world__cases">
                        <WorldWideCases mapType= {regionType.name}/>
                        <button className="nextMap__button" onClick = {() => updateMap(regionType.name) } > {regionType.name !== "Montreal" ? `See cases in ${nextMap(regionType.name)}` : "See World Cases"} </button>
                    </div>
            
            <SeverityChart region = {regionType.name}/>
              
                { regionType.name === "World" ?
                    <WorldMapChart setTooltipContent={setContent} allCountry = {regionType.data} fillColor={fillColor} />
                    : 
                    <CanadaMap setTooltipContent={setContent} regionType={regionType} fillColor={fillColor}/>
                }
                { content !== "" && 
                <ReactTooltip place="top" type="dark" effect="float">
                    <ul> 
                        {content.split("—").map((data, key) => 
                        <li key= {key}> {(key !== 5) ? data : 
                            regionType.name === "World" && getFlagByCountryCode(data)
                        } </li>)}
                    </ul>
                    </ReactTooltip>
                }
            </div>
    </div>
    )
}

export default CovidComponent;

 