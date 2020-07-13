import React, { useState,useEffect }  from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import WorldMapChart from "./WorldMapChart";
import CanadaMap from "./CanadaCovid";
import ReactTooltip from "react-tooltip";
import Headers from "../Headers";
import WorldWideCases from "./WorldWideCases"
import canada from "./topojsons/canada.topojson";
import quebec from "./topojsons/quebec.json";
import montreal from "./topojsons/montreal.topojson";
import SeverityChart from "./SeverityChart";
import CovidTable from "./CovidTable";
import XYPlot from "./XYPlot";
import Loading from "./Loading";

const CovidComponent = (props) => {
    const {dispatch} = props;
    const {fetchWorldCases,fetchCanadaCases,fetchQuebecCasesAction,fetchMontrealCasesAction} = props.action_props.covid_action;
    const [content, setContent] = useState("");
    const [regionType, setRegionType] =  useState({name: "World",data: {}});
    const [selectedRegion, setSelectedRegion] = useState(   {  
                                                                "World" : "World",
                                                                "Canada" : "Canada",
                                                                "Quebec" : "Total",
                                                                "Montreal" : "Total for Montréal"     
                                                            });

    const getAllCountry = () => {
      setRegionType({name: "World"});
      if(props.apiLoaded["World"] === false)
        dispatch(fetchWorldCases(props.apiLoaded));
    };
    const getDetailedCountryCases = () => {
      setRegionType({name: "Canada" , topojson: canada, mapSize : {centerX : -10, centerY: 498, zoom:3, maxZoom: 3}});
      if(props.apiLoaded["Canada"] === false)
        dispatch(fetchCanadaCases(props.apiLoaded,props.canadianGraphLoaded));
    };
    const getQuebecCases = () => {
      setRegionType({name: "Quebec" , topojson: quebec, mapSize : {centerX : -68, centerY: 50, zoom:8, maxZoom: 8}});
      if(props.apiLoaded["Quebec"] === false)
        dispatch(fetchQuebecCasesAction(props.canadaCases,props.apiLoaded));
    };
    const getMontrealCases = () => {
      setRegionType({name: "Montreal" , topojson: montreal, mapSize : {centerX : -25, centerY: 500, zoom:3, maxZoom: 3}});
      if(props.apiLoaded["Montreal"] === false)
        dispatch(fetchMontrealCasesAction(props.apiLoaded));
    };
   
    const getProperData = {
      "World" : {
        header : "Global SARS CoV2 Cases",
        data : props.worldCases.records,
        next : () => getDetailedCountryCases(),
        nextMap: "Canada",
        severityLevel : {
          "high" : 1000000,
          "mediumHigh" : 100000,
          "medium" : 50000,
          "mediumLow" : 10000,
          "low" : 1000,
          "veryLow" : 1
        }
      },
      "Canada" : {
        header : "Covid 19 Cases in Canada",
        data : props.canadaCases.records,
        next : () => getQuebecCases(),
        nextMap: "Quebec",
        severityLevel : {
          "high" : 10000,
          "mediumHigh" : 5000,
          "medium" : 1000,
          "mediumLow" : 250,
          "low" : 100,
          "veryLow" : 1
        }
      },
      "Quebec" : {
        header : "Covid 19 Cases in Quebec",
        data : props.quebecCases.records,
        next : () => getMontrealCases(),
        nextMap: "Montreal",
        severityLevel : {
          "high" : 5000,
          "mediumHigh" : 2000,
          "medium" : 1000,
          "mediumLow" : 100,
          "low" : 50,
          "veryLow" : 1
        }
      },
      "Montreal" : {
        header : "Covid 19 Cases in Montreal",
        data : props.montrealCases.records,
        next :  () => getAllCountry(),
        nextMap: "World",
        severityLevel : {
          "high" : 2000,
          "mediumHigh" : 1000,
          "medium" : 500,
          "mediumLow" : 100,
          "low" : 50,
          "veryLow" : 1
        }
      }
    };

    const SeverityLevelsChart = (confirmedCase) => {
      const {name} = regionType;
      //(confirmed.toString().includes(",") ? parseInt(confirmed.replace(",", "")) : parseInt(confirmed))
    
      if(confirmedCase.toString().includes(","))
        confirmedCase =  confirmedCase.replace(",", "");
      if(confirmedCase.toString().includes(" "))
        confirmedCase =  confirmedCase.replace(" ", "");
      
      confirmedCase = parseInt(confirmedCase);
      
      if(confirmedCase > getProperData[name].severityLevel.high)
          return "high";
      else if(confirmedCase < getProperData[name].severityLevel.high && confirmedCase >= getProperData[name].severityLevel.mediumHigh)
          return "mediumHigh";
      else if(confirmedCase < getProperData[name].severityLevel.mediumHigh && confirmedCase >= getProperData[name].severityLevel.medium)
          return "medium";
      else if(confirmedCase < getProperData[name].severityLevel.medium && confirmedCase >= getProperData[name].severityLevel.mediumLow)
          return "mediumLow";
      else if(confirmedCase < getProperData[name].severityLevel.mediumLow && confirmedCase >= getProperData[name].severityLevel.low)
          return "low";
      else if(confirmedCase < getProperData[name].severityLevel.low && confirmedCase >= getProperData[name].severityLevel.veryLow)
          return "veryLow";
      else return "noCases";
    };
    
    const fillColor = geo => {
      const {NAME} = geo.properties;
      const {data} = getProperData[regionType.name];
      const confirmed = data[[NAME]] ? data[[NAME]].confirmed : 0;
    
      const level = SeverityLevelsChart(confirmed);
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

    const colorFill = (geo) => (
        {
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
          }
    );
    
    useEffect( () => {
      window.scrollTo(0, 0);
      getAllCountry();
      return () =>  null;
      //eslint-disable-next-line
    }, []);
    
    return (
        <div>
            <Headers linkTo = "#/" headerTitle= {getProperData[regionType.name].header}/>   
            <div className= "covid19"> 
             { props.apiLoaded[regionType.name] === true ?  
                (<div>   
                    <div className="world__cases">
                        <WorldWideCases mapType= {regionType.name} worldCases = {props.worldCases} quebecCases = {props.quebecCases}/>
                        <button className="nextMap__button" onClick = {getProperData[regionType.name].next} > {regionType.name !== "Montreal" ? `See cases in ${getProperData[regionType.name].nextMap}` : "See World Cases"} </button>
                    </div>
          
                    <div className = "covid__table">
                      <CovidTable props = {props}  data = {getProperData[regionType.name].data} regionType = {regionType.name} worldCases = {props.worldCases} setSelectedRegion = {setSelectedRegion}/>
                    </div>
                   
                    <XYPlot props = {props} data = {getProperData[regionType.name].data} regionType = {regionType.name}  worldCases = {props.worldCases} selectedRegion = {selectedRegion} setSelectedRegion = {setSelectedRegion} />     
                    <SeverityChart region = {regionType.name}/>
                    {regionType.name === "World" ?
                      <WorldMapChart setTooltipContent={setContent} data={getProperData[regionType.name].data} colorFill={colorFill} />
                      : 
                      <CanadaMap setTooltipContent={setContent} data = {getProperData[regionType.name].data} regionType={regionType} colorFill={colorFill}/>
                    }
                  </div>) :
                  <Loading/>
            }
                { content !== "" && 
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

const mapStateToProps = state => { 
  const covidProps  = state.covidReducer.defaultCovidStates; 
  const {worldCases,canadaCases,quebecCases,montrealCases, apiLoaded,canadianGraphLoaded} = covidProps;

  return {worldCases,canadaCases,quebecCases,montrealCases,apiLoaded,canadianGraphLoaded};
};

export default withRouter(connect(mapStateToProps)(CovidComponent));
