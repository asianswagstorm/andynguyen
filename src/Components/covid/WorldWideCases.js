import React, { useState, useEffect }  from 'react';
import {fetchGlobalCases, fetchCanadianCases,fetchQuebecCases,fetchMontrealCases} from "./coronavirusAPI";

import CovidCard from "./CovidCard";

const WorldWideCases = (props) => {

    const [worldCases, setWorldCases] = useState({population: "7,594,000,000", confirmed: 0, recovered: 0, deaths: 0 });
    const getWorldCases = async () => setWorldCases({...worldCases, ...(await fetchGlobalCases())});
    const getCanadianCases = async () => setWorldCases({...worldCases, ...(await fetchCanadianCases())});
    const getQuebecCases = async () => setWorldCases({population: "8,485,400", ...(await fetchQuebecCases()).Total });
    const getMontrealCases = async () => setWorldCases({population: "1,704,694", ...(await fetchMontrealCases()).Total });

    useEffect( () => {
        if( props.mapType === "World")
            getWorldCases()
        else if( props.mapType === "Canada")
            getCanadianCases()
        else if( props.mapType === "Quebec")
            getQuebecCases()
        else if( props.mapType === "Montreal")
            getMontrealCases()

        return () =>  null;
    // eslint-disable-next-line react-hooks/exhaustive-deps   
    }, [worldCases]);
   
    const CovidItems = (props) => {
        let listItems = [ 
            {className : "icon fa-users" , itemLabel: "Population:", itemValue: worldCases.population , background :"secondary" },
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
