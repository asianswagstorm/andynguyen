import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import Chart from 'react-google-charts';

import Loading from "./Loading";
const XYPlot = ({worldCases,canadaCases,quebecCases,regionType,montrealCases,apiLoaded}) => {
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

    const caseTypes = [
        {
            name : "newCase", label: "New Cases"
        },
        {
            name : "totalCases", label: "Total Cases"
        },
        {
            name : "newDeath", label: "New Deaths"
        },
        {
            name : "totalDeath", label: "Total Deaths"
        }
    ];

    const myGraphByRegionType = {
        "World" : {data: worldCases.graph , loaded: apiLoaded.World} ,
        "Canada" : {data: canadaCases.graph , loaded: apiLoaded.Canada} ,
        "Quebec" : {data:  quebecCases.graph ? quebecCases.graph["Total"] : [[]], loaded: apiLoaded.Quebec},
        "Montreal" : {data:  montrealCases.graph ? montrealCases.graph["Total for Montréal"] : [[]], loaded: apiLoaded.Montreal}
    };

    return(
        <div>
            {
                caseTypes.map((caseType, key) => 
                    (myGraphByRegionType[regionType].loaded === true && myGraphByRegionType[regionType].data[caseType.name].length) > 1 ? 
                        <div className="covid__chart" key = {key}>
                            <Chart
                                width = {'100%'}
                                height = {'400px'}
                                chartType = "LineChart"
                                loader = {<Loading/>}
                                data = {stringDateToDate(myGraphByRegionType[regionType].data[caseType.name])}
                                options =   {
                                                {
                                                    hAxis: {
                                                        title: 'Day',
                                                    },
                                                    vAxis: {
                                                        title: caseType.name,
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
    const {worldCases,canadaCases,quebecCases,montrealCases,selectedCountry,apiLoaded } = covidProps;
 
    return {worldCases,canadaCases,quebecCases,montrealCases,selectedCountry,apiLoaded};
};
  
export default withRouter(connect(mapStateToProps)(XYPlot));
  

