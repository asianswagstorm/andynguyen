import React, { useState, useEffect }  from 'react';
import {fetchGlobalCases, fetchCanadianCases} from "./coronavirusAPI";
import quebecData from "./manualCases/casesInQuebec.json";
import montrealData from "./manualCases/casesInMontreal.json";
import CovidCard from "./CovidCard";

const WorldWideCases = (props) => {

    const [worldCases, setWorldCases] = useState({population: "7.594B", confirmed: 0, recovered: 0, deaths: 0 });
    const getWorldCases = async () => setWorldCases({...worldCases, ...(await fetchGlobalCases())});
    const getCanadianCases = async () => setWorldCases({...worldCases, ...(await fetchCanadianCases())});//modify Quebec
    const getQuebecCases = async () => setWorldCases({population: "8.4854M", confirmed: quebecData.Total.confirmed, recovered: quebecData.Total.recovered, deaths: quebecData.Total.deaths, intensiveCare: quebecData.Total.intensiveCare, hospitalized: quebecData.Total.hospitalized });
    const getMontrealCases = async () => setWorldCases({population: "1.78M", confirmed: montrealData.Total.confirmed, recovered: "NA", deaths: montrealData.Total.deaths });

    useEffect( () => {
        if( props.mapType === "world")
            getWorldCases()
        else if( props.mapType === "Canada")
            getCanadianCases()
        else if( props.mapType === "Quebec")
            getQuebecCases()
        else if( props.mapType === "Montreal")
            getMontrealCases()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [worldCases]);
   
    const CovidItems = (props) => {
        let listItems = [ 
            {className : "" , itemLabel: "Population:", itemValue: worldCases.population , background :"secondary" },
            {className : "" , itemLabel: "Confirmed Cases:", itemValue: worldCases.confirmed , background :"primary" },
            {className : "covid__death" , itemLabel: "Deaths:", itemValue: worldCases.deaths , background :"danger"},
            {className : "icon fa-heart" , itemLabel: "Recovered:", itemValue: worldCases.recovered , background :"success"}
        ]

        if(props.mapType === "Quebec")
            listItems = [...listItems, 
                {className : "icon fa-heartbeat" , itemLabel: "Intensive Care:", itemValue: worldCases.intensiveCare , background :"warning"},
                {className : "icon fa-hospital-o" , itemLabel: "Hospitalized:", itemValue: worldCases.hospitalized, background :"info" }
            ]
        
        return( 
            <CovidCard listItems = {listItems}/>
        );
    }   

    return (
    <div className= "covid19__world"> 
        <CovidItems mapType={props.mapType}/>
    </div>
    )
}

export default WorldWideCases;
