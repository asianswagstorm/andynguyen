import React,{useState,useEffect} from "react";
import { withRouter } from "../../helpers";
import { connect } from 'react-redux';
import {addComma,stringToInt,filterExclude} from "./covidFunction"
const CovidTable = ({props,canadaCases,canadianGraphLoaded, regionType, data, setSelectedRegion,worldCases}) => { 
    const sortingCondition = {  byCase :    {   confirmed: "decrease",
                                                recovered: "decrease",
                                                deaths: "decrease"},
                                alphabetical: "decrease"}
    const [cases, setCases] = useState(() => filterExclude(regionType,Object.values(data)));
    const [increaseDecrease, setIncreaseDecrease] = useState({ "World" : sortingCondition,
                                                               "Canada" : sortingCondition,
                                                               "Quebec" : sortingCondition,
                                                               "Montreal" : sortingCondition});
    useEffect( () => {
        let myData = {};
        if(regionType === "World")
            myData = worldCases.latest;
        else if(regionType === "Canada")
            myData = worldCases.records["Canada"];
    
        setCases(() => filterExclude(regionType, Object.values(data),myData));
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
        
        setCases((increaseDecrease[regionType].alphabetical === "decrease") ? sortedCases : sortedCases.reverse());
        (increaseDecrease[regionType].alphabetical === "decrease") ?
        setIncreaseDecrease({...increaseDecrease, [regionType] : {...increaseDecrease[regionType], alphabetical : "increase"}} ) :
        setIncreaseDecrease({...increaseDecrease, [regionType] : {...increaseDecrease[regionType], alphabetical : "decrease"}} );
    };
    
    const sortTableByType = (dataType) => {
        const sortedCases =   (increaseDecrease[regionType].byCase[dataType] === "decrease") ? mergeSort(cases,dataType) : mergeSort(cases,dataType).reverse();
        setCases(sortedCases);
        (increaseDecrease[regionType].byCase[dataType] === "decrease") ?
        setIncreaseDecrease({...increaseDecrease, [regionType] : {...increaseDecrease[regionType], byCase : {...increaseDecrease[regionType].byCase, [dataType] : "increase" } }} ) :
        setIncreaseDecrease({...increaseDecrease, [regionType] : {...increaseDecrease[regionType], byCase : {...increaseDecrease[regionType].byCase, [dataType] : "decrease" } }} );
    };
    
    const tableHeadContent = () => {
        let contentHeadArray = [
            {
                table_id : "country__number" , class_name : "covid__th", click_function : () => null, name: "#"
            },
            {
                table_id : "country__name" , class_name : "covid__th", click_function : () => sortByAreaName(), name: "Area"
            },
            {
                table_id : "" , class_name : "table-primary covid__th", click_function : () => sortTableByType("confirmed"), name: "Confirmed"
            }
        ];

        if(regionType === "World")
            contentHeadArray.push(
                {
                    table_id : "" , class_name : "table-success covid__th", click_function : () => sortTableByType("recovered"), name: "Recovered"
                }
            );

            contentHeadArray.push(
                {
                    table_id : "" , class_name : "table-danger covid__th", click_function : () => sortTableByType("deaths"), name: "Deaths"
                }
        );

        if(regionType === "Montreal" ){
            contentHeadArray.push(
                {
                    table_id : "" , class_name : "table-info covid__th", click_function : () => sortTableByType("newCase"), name: "New Cases"
                }
            );
            contentHeadArray.push(
                {
                    table_id : "" , class_name : "table-warning covid__th", click_function : () => sortTableByType("newDeath"), name: "New Deaths"
                }
            );
        };

        return contentHeadArray;
    };

    const updateGraph = (region) => {
        if(regionType === "Quebec" && region !== "Quebec" && Object.keys(props.quebecCases.graph[region]).length <= 0){
            const {dispatch} = props;
            const {updateCanadianRegionGraph2} = props.action_props.covid_action;
          
            dispatch(updateCanadianRegionGraph2(props.quebecCases, "Canada", regionType, region));
        }

        if(regionType === "Canada" && region !== "Canada" &&  canadianGraphLoaded[region] === false){
            const {dispatch} = props;
            const {updateCanadianRegionGraph} = props.action_props.covid_action;
          
            dispatch(updateCanadianRegionGraph(canadianGraphLoaded,canadaCases, regionType, region, props.apiLoaded));
        }

        if(regionType === "World" && region !== "World" &&  worldCases.graph[region].loaded === false){
            const {dispatch} = props;
            const {updateWorldGraph} = props.action_props.covid_action;
          
            dispatch(updateWorldGraph(worldCases, region));
        }

        setSelectedRegion(prevState => ({...prevState, [regionType] : region}))
    };


    const tableDataContent = (area,key) => {
        let contentDataArray = [
            {
                table_id : "country__number" , class_name : "covid__td", data: key+1, click_function: () => null
            },
            {
                table_id : "country__name" , class_name : "covid__td", data: area.locationName, click_function: () => updateGraph(area.locationName)
            },
            {
                table_id : "country__data" , class_name : "table-primary covid__td", data: addComma(area.confirmed), click_function: () => null
            }
        ];

        if(regionType === "World")
            contentDataArray.push(
                {
                    table_id : "country__data" , class_name : "table-success covid__td", data: addComma(area.recovered), click_function: () => null
                }
            );

            contentDataArray.push(
                {
                    table_id : "country__data" , class_name : "table-danger covid__td",  data: addComma(area.deaths), click_function: () => null
                }
        );

        if(regionType === "Montreal"){
            contentDataArray.push(
                {
                    table_id : "country__data" , class_name : "table-info covid__td", data: addComma(area.newCase), click_function: () => null
                }
            );
            contentDataArray.push(
                {
                    table_id : "country__data" , class_name : "table-warning covid__td",  data: addComma(area.newDeath), click_function: () => null
                }
            );
        };
        return contentDataArray;
    };

    return(
        <div className="covidTable table-responsive">
            <table className="table-sm table-striped covidTable">
                <thead>
                    <tr className ="countryCase__Head">
                        {
                           tableHeadContent().map((table_head, key) => <th key={key} className={table_head.class_name} id={table_head.table_id} onClick = {table_head.click_function}> {table_head.name} </th>)
                        }
                    </tr>
                </thead>
                <tbody className="covid__data">
                {cases.filter(area => area.locationName).map((area, key) => (
                    <tr className ="countryCase" key={key}>
                      {
                          tableDataContent(area, key).map((table_data, key1) => <td key={key1} className={table_data.class_name} id={table_data.table_id} onClick = {table_data.click_function}> {table_data.data} </td>)
                      }
                    </tr>)
                    )
                }
                </tbody>
            </table>
        </div>
    );
};

const mapStateToProps = state => { 
    const covidProps  = state.covidReducer.defaultCovidStates; 
    const {canadaCases ,canadianGraphLoaded, apiLoaded, quebecCases} = covidProps;
 
    return {canadaCases,canadianGraphLoaded,quebecCases,apiLoaded};
};
  
export default withRouter(connect(mapStateToProps)(CovidTable));
