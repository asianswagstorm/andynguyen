import React from "react";

const severityLevel = [
   
    {level : "no cases reported" , color : "#D6D6DA" },
    {level : "lower" , color : "#ffff99" }, 
    {level : "low" , color : "#ffff00" }, 
    {level : "med-low" , color : "#ff9900" }, 
    {level : "med" , color : "#ff4000" }, 
    {level : "med-high" , color : "#cc2900" }, 
    {level : "high" , color : "#661a00" } 
];

const regionSeverityLevels = {
    "high" : {
                "Canada" : "10000+",
                "Quebec" : "5000+",
                "Montreal" : "500+"
    },
    "med-high" : {
        "Canada" : "5000 to 10000",
        "Quebec" : "2000 to 5000",
        "Montreal" : "250 to 500"
    },
    "med" : {
        "Canada" : "1000 to 5000",
        "Quebec" : "1000 to 2000",
        "Montreal" : "100 to 250"
    },
    "med-low" : {
        "Canada" : "250 to 1000 ",
        "Quebec" : "100 to 1000",
        "Montreal" : "50 to 100"
    },
    "low" : {
        "Canada" : "100 to 250",
        "Quebec" : "50 to 100",
        "Montreal" : "10 to 50"
    },
    "lower" : {
        "Canada" : "1 to 100",
        "Quebec" : "1 to 50",
        "Montreal" : "1 to 10"
    },
    "no cases reported" : {
        "Canada" : "0",
        "Quebec" : "0",
        "Montreal" : "0"
    }, 
}

//props.region
const SeverityChart = (props) => 
    <div className= "container">
        <div className ="row severity__chart" >
            {
                severityLevel.map((levelDiv , key) => 
                <div className = "severity__level col-sm-5" key = {key} style={{backgroundColor : levelDiv.color, color: `${key > 3 ? "white" : "black"}`, textShadow: `0.5px 0.5px ${key > 3 ? "black" : "white"}`, }}>
                    {regionSeverityLevels[levelDiv.level][props.region]}
                </div>)
            }
        </div>
    </div>

export default SeverityChart;