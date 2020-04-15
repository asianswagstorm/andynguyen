import React, { useState, useEffect }  from 'react';
import {fetchGlobalCases, fetchCanadianCases} from "./coronavirusAPI";
import quebecData from "./manualCases/casesInQuebec.json";
import montrealData from "./manualCases/casesInMontreal.json";

const WorldWideCases = (props) => {

    const [worldCases, setWorldCases] = useState({population: "7.594B", confirmed: 0, recovered: 0, deaths: 0 });
    const getWorldCases = async () => setWorldCases({...worldCases, ...(await fetchGlobalCases())});
    const getCanadianCases = async () => setWorldCases({...worldCases, ...(await fetchCanadianCases())});
    const getQuebecCases = async () => setWorldCases({population: "8.4854M", confirmed: quebecData.Total.confirmed, recovered: "NA", deaths: quebecData.Total.deaths, intensiveCare: quebecData.Total.intensiveCare, hospitalized: quebecData.Total.hospitalized });
    const getMontrealCases = async () => setWorldCases({population: "1.78M", confirmed: montrealData.Total.confirmed, recovered: "NA", deaths: montrealData.Total.deaths });

    //const add comma to number

    useEffect( () => {
        if( props.mapType === "world")
            getWorldCases()
        else if( props.mapType === "Canada")
            getCanadianCases()
        else if( props.mapType === "Quebec")
            getQuebecCases()
        else if( props.mapType === "Montreal")
            getMontrealCases()

    }, [worldCases]);
    //make it a styled component

    const CovidItems = (props) => {
        let listItems = [ 
            {className : "" , itemLabel: "Population:", itemValue: worldCases.population },
            {className : "" , itemLabel: "Confirmed Cases:", itemValue: worldCases.confirmed },
            {className : "covid__death" , itemLabel: "Deaths:", itemValue: worldCases.deaths },
            {className : "icon fa-heart" , itemLabel: "Recovered:", itemValue: worldCases.recovered}
        ]

        if(props.mapType === "Quebec")
            listItems = [...listItems, 
                {className : "icon fa-heartbeat" , itemLabel: "Intensive Care:", itemValue: worldCases.intensiveCare },
                {className : "icon fa-hospital-o" , itemLabel: "Hospitalized:", itemValue: worldCases.hospitalized }
            ]
        
        return( 
            <ul className="unordered__global">
                {listItems.map((item,key) => 
                    <li key={key}>
                        <span id="global__covid__label" className={item.className}> {item.itemLabel}</span> {item.itemValue}
                    </li>
                )}
            </ul>
        );
    }   

    return (
    <div className= "covid19__world"> 
        <CovidItems mapType={props.mapType}/>
    </div>
    )
}

export default WorldWideCases;
