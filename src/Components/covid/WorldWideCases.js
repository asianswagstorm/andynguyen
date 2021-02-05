import React, { useState, useEffect }  from 'react';
import {addComma} from "./covidFunction";
import CovidCard from "./CovidCard";

const WorldWideCases = ({mapType,worldCases, quebecCases}) => {
    const latestWorld = worldCases.latest;
    const [covidCases, setCovidCases] = useState({population: "7,594,000,000", confirmed: 0, recovered: 0, deaths: 0 });
    const getWorldCases = () => setCovidCases({population: "7,594,000,000", confirmed: latestWorld.confirmed, recovered: latestWorld.recovered, deaths: latestWorld.deaths});
    const getCanadianCases = () => setCovidCases({population: addComma(worldCases.records["Canada"].population), confirmed:  addComma(worldCases.records["Canada"].confirmed), recovered: worldCases.records["Canada"].recovered, deaths: worldCases.records["Canada"].deaths });
    const getQuebecCases = async () => setCovidCases({population: "8,485,400", recovered: "22,213", ...quebecCases.records["Total"] });
    const getMontrealCases = () => setCovidCases({population: "1,704,694", confirmed: quebecCases.records["Montréal"].confirmed, recovered: "NA", deaths: quebecCases.records["Montréal"].deaths  });

    useEffect( () => {
        if( mapType === "World")
            getWorldCases()
        else if( mapType === "Canada")
            getCanadianCases()
        else if(mapType === "Quebec")
            getQuebecCases()
        else if( mapType === "Montreal")
            getMontrealCases()
        return () =>  null;
    // eslint-disable-next-line react-hooks/exhaustive-deps   
    }, [covidCases]);
   
    const CovidItems = () => {
        let listItems = [ 
            {className : "icon fa-users" , itemLabel: "Population:", itemValue: covidCases.population , background :"secondary" },
            {className : "" , itemLabel: "Confirmed Cases:", itemValue: covidCases.confirmed , background :"primary" },
            {className : "covid__death" , itemLabel: "Deaths:", itemValue: covidCases.deaths , background :"danger"},
            {className : "icon fa-heart" , itemLabel: "Recovered:", itemValue: covidCases.recovered , background :"success"}
        ]

        if(mapType === "Quebec")
            listItems = [...listItems, 
                {className : "icon fa-heartbeat" , itemLabel: "Intensive Care:", itemValue: covidCases.intensiveCare , background :"warning"},
                {className : "icon fa-hospital-o" , itemLabel: "Hospitalized:", itemValue: covidCases.hospitalized, background :"info" }
            ]
        
        return( 
            <CovidCard listItems = {listItems}/>
        );
    }   

    return (
    <div className= "covid19__world"> 
        <CovidItems mapType={mapType}/>
    </div>
    )
}

export default WorldWideCases;

