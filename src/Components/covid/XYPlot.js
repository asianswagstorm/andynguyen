import React, {useEffect} from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import Chart from 'react-google-charts';

import Loading from "./Loading";
const XYPlot = ({props,selectedCountry,worldCases,graphData,regionType,quebecGraphData,montrealGraphData,canadian_graph_updated}) => {
    const {dispatch} = props;
    const {fetchCountryGraphData,fetchQuebecGraphData, fetchMontrealGraphData,modifiedCanadianGraph} = props.action_props.covid_action;
    const getCases = async () => await dispatch(fetchCountryGraphData(selectedCountry)); 
    const getQuebecCases = async () => await dispatch(fetchQuebecGraphData()); 
    const getMontrealCases = async () => await dispatch(fetchMontrealGraphData()); 

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

        if(regionType === "Canada"  && worldCases[selectedCountry] && (canadian_graph_updated["totalCases"] === false && canadian_graph_updated["totalDeath"] === false)){
            graphData.data["totalCases"][graphData.data["totalCases"].length -1][1] = worldCases[selectedCountry].confirmed;
            graphData.data["totalDeath"][graphData.data["totalDeath"].length -1][1] = worldCases[selectedCountry].deaths;
            dispatch(modifiedCanadianGraph({ "totalCases": true, "totalDeath" : true }, graphData));
        }; 
        
        return array;
    };

    useEffect( () => {
        if(graphData.loaded === false && regionType === "Canada" ){
            getCases();
        }
        if(quebecGraphData.loaded === false && regionType === "Quebec" ){
            getQuebecCases();
        }
        if(montrealGraphData.loaded === false && regionType === "Montreal" ){
            getMontrealCases();
        }
        return () =>  null;
        //eslint-disable-next-line
      }, []);

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
        "Canada" : {data: graphData.data , loaded: graphData.loaded} ,
        "Quebec" : {data: quebecGraphData.allData["Total"], loaded: quebecGraphData.loaded},
        "Montreal" : {data: montrealGraphData.allData["Total for Montréal"], loaded: montrealGraphData.loaded}
    };

    return(
        <div>
            {
                caseTypes.map((caseType, key) => 
                    (myGraphByRegionType[regionType].loaded === true && myGraphByRegionType[regionType].data[caseType.name].length) > 1 ? 
                        <Chart
                            key = {key}
                            width={'100%'}
                            height={'400px'}
                            chartType="LineChart"
                            loader={<Loading/>}
                            data={stringDateToDate(myGraphByRegionType[regionType].data[caseType.name])}
                            options={{
                            hAxis: {
                                title: 'Day',
                            },
                            vAxis: {
                                title: caseType.name,
                            },
                            }}
                            rootProps={{ 'data-testid': '1' }}
                        /> 
                        : <Loading key = {key}/>
                )
            }
        </div>
    );  
};

const mapStateToProps = state => { 
    const covidProps  = state.covidReducer.defaultCovidStates; 
    const {worldCases,selectedCountry,graphData,quebecGraphData,montrealGraphData,canadian_graph_updated } = covidProps;
  
    return {worldCases,selectedCountry,graphData,quebecGraphData,montrealGraphData,canadian_graph_updated};
};
  
export default withRouter(connect(mapStateToProps)(XYPlot));
  

