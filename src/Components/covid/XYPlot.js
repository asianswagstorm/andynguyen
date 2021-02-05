import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import Chart from 'react-google-charts';
import {filterExclude} from "./covidFunction";

import Loading from "./Loading";
const XYPlot = ({props,worldCases,canadaCases,quebecCases,regionType,montrealCases,apiLoaded,data,canadianGraphLoaded, selectedRegion, setSelectedRegion}) => {

    const stringDateToDate = (array) => {
        array.forEach(subArray => {
            if(typeof subArray[0] === "string"){
                const dateArray = subArray[0].split("-");
                const year = parseInt(dateArray[0]);
                const month = parseInt(dateArray[1]) - 1;
                const day = parseInt(dateArray[2]);
                subArray[0] = new Date(year, month, day);
            }
        })
        
        return array;
    };

    const handleRegionSelect = (event) => {
        const region = event.target.value;
        if(regionType === "Canada" && region !== "Canada" &&  canadianGraphLoaded[region] === false){
            const {dispatch} = props;
            const {updateCanadianRegionGraph} = props.action_props.covid_action;
          
            dispatch(updateCanadianRegionGraph(canadianGraphLoaded,canadaCases, regionType, region));
        }

        if(regionType === "World" && region !== "World" &&  worldCases.graph[region].loaded === false){
            const {dispatch} = props;
            const {updateWorldGraph} = props.action_props.covid_action;//update worldGraph!!! 
          
            dispatch(updateWorldGraph(worldCases, region));
        }

        setSelectedRegion(prevState => ({...prevState, [regionType] : region}))
    }

    const caseTypes = [
        {
            name : "newCase", label: "New Cases"
        },
        {
            name : "newDeath", label: "New Deaths"
        },
        {
            name : "totalCases", label: "Total Cases"
        },
        {
            name : "totalDeath", label: "Total Deaths"
        }
    ];

    const myGraphByRegionType = (type) => {
        if(type === "World")
            return {records: () => filterExclude(regionType,Object.values(data),worldCases.latest), data: worldCases.graph  ? worldCases.graph[selectedRegion[regionType]].graph : [[]], loaded: selectedRegion[regionType] === "World" ? apiLoaded.World : worldCases.graph[selectedRegion[regionType]].loaded} 
        if (type === "Canada")     
            return {records: () => filterExclude(regionType,Object.values(data),worldCases.records["Canada"]),data: canadaCases.graph ? canadaCases.graph[selectedRegion[regionType]] : [[]] ,
                loaded:(selectedRegion[regionType] === "Canada" ? apiLoaded.Canada : canadianGraphLoaded[selectedRegion[regionType]])} 
        if (type === "Quebec")     
                return {records: () => filterExclude(regionType,Object.values(data), {}).splice(0,17).reverse(), data: quebecCases.graph ? quebecCases.graph[selectedRegion[regionType]] : [[]], loaded: apiLoaded.Quebec}
        if (type === "Montreal")     
                return {records: () => filterExclude(regionType,Object.values(data), {}).splice(0,34).reverse(), data:  montrealCases.graph ? montrealCases.graph[selectedRegion[regionType]] : [[]], loaded: apiLoaded.Montreal}
    };

    const selectGraph = <select className="region__selection mdb-select md-form" onChange = { event => handleRegionSelect(event)} value = {selectedRegion[regionType]} >
                            {
                                    (myGraphByRegionType(regionType).records()).map((region,key) => <option key = {key} value={region.locationName}> {region.locationName}</option>)
                            }
                        </select>
    return(
        <div>
            {(myGraphByRegionType(regionType)) && selectGraph }
            {
                caseTypes.map((caseType, key) => 
                    (myGraphByRegionType(regionType).loaded === true && myGraphByRegionType(regionType).data && myGraphByRegionType(regionType).data[caseType.name] && myGraphByRegionType(regionType).data[caseType.name].length > 1)  ? 
                        <div className="covid__chart" key = {key}>
                            <Chart
                                width = {'100%'}
                                height = {'400px'}
                                chartType = "LineChart"
                                loader = {<Loading/>}
                                data = {stringDateToDate(myGraphByRegionType(regionType).data[caseType.name])}
                                options =   {
                                                {
                                                    hAxis: {
                                                        title: 'Day',
                                                    },
                                                    vAxis: {
                                                        title: caseType.label,
                                                    },
                                                    backgroundColor: {
                                                        fill : '#f1f1f1'
                                                    }
                                                }
                                            }   
                                rootProps={{ 'data-testid': '1' }}
                            /> 
                        </div>
                        : <Loading key = {key}/>
                )
            }
        </div>
    );  
};

const mapStateToProps = state => { 
    const covidProps  = state.covidReducer.defaultCovidStates; 
    const {worldCases,canadaCases,quebecCases,montrealCases,selectedCountry,apiLoaded ,canadianGraphLoaded} = covidProps;
 
    return {worldCases,canadaCases,quebecCases,montrealCases,selectedCountry,apiLoaded,canadianGraphLoaded};
};
  
export default withRouter(connect(mapStateToProps)(XYPlot));
  

