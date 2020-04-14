import React, { useState, useEffect }  from 'react';
import {fetchGlobalCases, fetchCanadianCases} from "./coronavirusAPI";
import {rounded} from "./MapChart";
import quebecData from "./manualCases/casesInQuebec.json";
import montrealData from "./manualCases/casesInMontreal.json";

const WorldWideCases = (props) => {

    const [worldCases, setWorldCases] = useState({population: "7.594B", confirmed: 0, recovered: 0, deaths: 0 });
    const getWorldCases = async () => setWorldCases({...worldCases, ...(await fetchGlobalCases())});
    const getCanadianCases = async () => setWorldCases({...worldCases, ...(await fetchCanadianCases())});
    const getQuebecCases = async () => setWorldCases({population: "8.4854M", confirmed: quebecData.Total.confirmed, recovered: "NA", deaths: quebecData.Total.deaths });
    const getMontrealCases = async () => setWorldCases({population: "1.78M", confirmed: montrealData.Total.confirmed, recovered: "NA", deaths: "NA" });

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

    return (
    <div className= "covid19__world"> 
         <ul className="unordered__global">
            <li>
                <span id="global__covid__label">Population:</span> {worldCases.population}
             </li>
             <li>
                <span id="global__covid__label">Total Confirmed Cases:</span> {rounded(worldCases.confirmed)}
             </li>
             <li>
                <span id="global__covid__label">Total Deaths Cases:</span> {rounded(worldCases.deaths)}
             </li>
             <li>
                <span id="global__covid__label">Total Recovered Cases:</span> {rounded(worldCases.recovered)}
             </li>
         </ul>
    </div>
    )
}

export default WorldWideCases;
