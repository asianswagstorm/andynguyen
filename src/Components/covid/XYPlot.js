import React, {useEffect} from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import Chart from 'react-google-charts';

import Loading from "./Loading";
const XYPlot = ({props,selectedCountry,worldCases,graphData,regionType,quebecGraphData,montrealGraphData}) => {
    const {dispatch} = props;
    const {fetchCountryGraphData,fetchQuebecGraphData, fetchMontrealGraphData} = props.action_props.covid_action;
    const getCases = async () => await dispatch(fetchCountryGraphData(selectedCountry)); 
    const getQuebecCases = async () => await dispatch(fetchQuebecGraphData()); //Total DNW!!!!
    const getMontrealCases = async () => await dispatch(fetchMontrealGraphData()); //Total for Montréal  DNW!!!! 

    const stringDateToDate = (array,caseType) => {
        array.forEach(subArray => 
            subArray[0] = new Date(subArray[0])
        )

        if(regionType === "Canada"  && worldCases[selectedCountry]){
            if(caseType === "totalCases") array.push([new Date(Date.now()) ,worldCases[selectedCountry].confirmed]);
            if(caseType === "totalDeath") array.push([new Date(Date.now()) ,worldCases[selectedCountry].deaths]);
        } 
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
                            data={stringDateToDate(myGraphByRegionType[regionType].data[caseType.name], caseType.name)}
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
    const {worldCases,selectedCountry,graphData,quebecGraphData,montrealGraphData } = covidProps;
  
    return {worldCases,selectedCountry,graphData,quebecGraphData,montrealGraphData};
};
  
export default withRouter(connect(mapStateToProps)(XYPlot));
  

