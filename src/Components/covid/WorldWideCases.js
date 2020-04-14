import React, { useState, useEffect }  from 'react';
import {fetchGlobalCases} from "./coronavirusAPI";
import {rounded} from "./MapChart";
const WorldWideCases = (props) => {

    const [worldCases, setWorldCases] = useState({population: "7.594B", confirmed: 0, recovered: 0, deaths: 0 });
    useEffect( () => {
        const getWorldCases = async () => setWorldCases({...worldCases, ...(await fetchGlobalCases())})
        getWorldCases()
    }, []);

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
