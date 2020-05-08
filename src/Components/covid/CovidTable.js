import React,{useState,useEffect} from "react";
import {addComma,stringToInt} from "./covidFunction";
const CovidTable = ({regionType, data}) => {
    const sortingCondition = {  byCase :    {   confirmed: "decrease",
                                                recovered: "decrease",
                                                deaths: "decrease"},
                                alphabetibal: "decrease"}
    const [cases, setCases] = useState(Object.values(data));
    const [increaseDecrease, setIncreaseDecrease] = useState({ "World" :    sortingCondition,
                                                               "Canada" :   sortingCondition,
                                                               "Quebec" :   sortingCondition,
                                                               "Montreal" : sortingCondition});
    useEffect( () => {
        setCases(Object.values(data));
        return () =>  null;
    // eslint-disable-next-line react-hooks/exhaustive-deps   
    }, [regionType]);

    const merge = (a,b, dataType) => {
        let result = [];
        while (a.length >0 && b.length >0)
            result.push(stringToInt(a[0][dataType]) < stringToInt(b[0][dataType])? a.shift() : b.shift());
        return result.concat(a.length? a : b);
    };
      
    const mergeSort = (arr,dataType) => {
        if (arr.length < 2) 
          return arr;
        const mid = Math.floor(arr.length /2);
        const subLeft = mergeSort(arr.slice(0,mid),dataType);
        const subRight = mergeSort(arr.slice(mid),dataType);
        return merge(subLeft, subRight,dataType);
    };

    const sortByAreaName = () => {
        const sortedCases = cases.sort( (a,b) => { 
            if(a.locationName < b.locationName) { return -1; }
            if(a.locationName > b.locationName) { return 1; }
            return 0;} )
        
        setCases((increaseDecrease[regionType].alphabetibal === "decrease") ? sortedCases : sortedCases.reverse());
        (increaseDecrease[regionType].alphabetibal === "decrease") ?
        setIncreaseDecrease({...increaseDecrease, [regionType] : {...increaseDecrease[regionType], alphabetibal : "increase"}} ) :
        setIncreaseDecrease({...increaseDecrease, [regionType] : {...increaseDecrease[regionType], alphabetibal : "decrease"}} );
    };
    
    const sortTableByType = (dataType) => {
        const sortedCases =   (increaseDecrease[regionType].byCase[dataType] === "decrease") ? mergeSort(cases,dataType) : mergeSort(cases,dataType).reverse();
        setCases(sortedCases);
        (increaseDecrease[regionType].byCase[dataType] === "decrease") ?
        setIncreaseDecrease({...increaseDecrease, [regionType] : {...increaseDecrease[regionType], byCase : {...increaseDecrease[regionType].byCase, [dataType] : "increase" } }} ) :
        setIncreaseDecrease({...increaseDecrease, [regionType] : {...increaseDecrease[regionType], byCase : {...increaseDecrease[regionType].byCase, [dataType] : "decrease" } }} );
    };

    return(
        <div className="covidTable table-responsive">
            <table className="table-sm table-striped covidTable">
                <thead>
                    <tr className ="countryCase__Head">
                        <th id="country__number" className="covid__th">#</th>
                        <th id="country__name" className="covid__th" onClick = {() => sortByAreaName()} >Area</th>
                        <th className="table-primary covid__th" onClick = {() => sortTableByType("confirmed")}>Confirmed</th>
                        { regionType === "World" &&
                        <th className="table-success covid__th" onClick = {() => sortTableByType("recovered")}>Recovered</th>
                        }
                        <th className="table-danger covid__th" onClick = {() => sortTableByType("deaths")}>Deaths</th>
                    </tr>
                </thead>
                <tbody>
                {cases.filter(area => area.locationName).map((area, key) => (
                    <tr className ="countryCase" key={key}>
                        <th id="country__number" className="covid__th" >{key+1}</th>
                        <th id="country__name" className="covid__th" >{area.locationName}</th>
                        <td className="table-primary covid__td">{addComma(area.confirmed)}</td>
                        {regionType === "World" &&
                        <td className="table-success covid__td">{addComma(area.recovered)}</td>
                        }
                        <td className="table-danger covid__td ">{cases[key].deaths ? addComma(area.deaths) : "NA"}</td>
                        
                    </tr>)
                    )
                }
                </tbody>
            </table>
        </div>
    );
};

export default CovidTable;