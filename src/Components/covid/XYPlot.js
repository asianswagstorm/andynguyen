import React, {useEffect} from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import Chart from 'react-google-charts';

import Loading from "./Loading";
const XYPlot = ({props,selectedCountry,worldCases,caseType,label,newCase,newDeath,totalCases,totalDeath}) => {
    const {dispatch} = props;
    const {fetchCountryGraphData} = props.action_props.covid_action;
    const getNewCases = async () => await dispatch(fetchCountryGraphData(selectedCountry,"newCase")); 
    const geTotalCases = async() => await dispatch(fetchCountryGraphData(selectedCountry,"totalCases")); 
    const getNewDeaths = async() => await dispatch(fetchCountryGraphData(selectedCountry,"newDeath")); 
    const getTotalDeaths = async() => await  dispatch(fetchCountryGraphData(selectedCountry,"totalDeath")); 

    const stringDateToDate = (array) => {
        array.forEach(subArray => 
            subArray[0] = new Date(subArray[0])
        )

        if(worldCases[selectedCountry]){
            if(caseType === "totalCases") array.push([new Date(Date.now()) ,worldCases[selectedCountry].confirmed]);
            if(caseType === "totalDeath") array.push([new Date(Date.now()) ,worldCases[selectedCountry].deaths]);
        } 
        return array;
    };

    useEffect( () => {
        if(newCase.loaded === false){
            getNewCases();
        }
        if (newDeath.loaded === false){
            getNewDeaths();
        }
        if (totalCases.loaded === false){
            geTotalCases();
        }
        if (totalDeath.loaded === false){
            getTotalDeaths();
        }
        return () =>  null;
        //eslint-disable-next-line
      }, []);

    const dataToreturn = {
              "newCase" : newCase,
              "totalCases" : totalCases,
              "newDeath" : newDeath,
              "totalDeath" : totalDeath
    };
    
    return(
          <div>
            { dataToreturn[caseType].data.length > 1 ? 
                <Chart
                    width={'100%'}
                    height={'400px'}
                    chartType="LineChart"
                    loader={<Loading/>}
                    data={stringDateToDate(dataToreturn[caseType].data)}
                    options={{
                    hAxis: {
                        title: 'Day',
                    },
                    vAxis: {
                        title: label,
                    },
                    }}
                    rootProps={{ 'data-testid': '1' }}
                /> 
                : <Loading/>
            } 
          </div>
        
      )
};

const mapStateToProps = state => { 
    const covidProps  = state.covidReducer.defaultCovidStates; 
    const {worldCases,selectedCountry,newCase,newDeath,totalCases,totalDeath} = covidProps;
  
    return {worldCases,selectedCountry,newCase,newDeath,totalCases,totalDeath};
};
  
export default withRouter(connect(mapStateToProps)(XYPlot));
  

