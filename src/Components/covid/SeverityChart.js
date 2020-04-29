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
                "World" : "1M+",
                "Canada" : "10K+",
                "Quebec" : "5K+",
                "Montreal" : "500+"
    },
    "med-high" : {
        "World" : "100K to 1M",
        "Canada" : "5K to 10K",
        "Quebec" : "2K to 5K",
        "Montreal" : "250 to 500"
    },
    "med" : {
        "World" : "50K to 100K",
        "Canada" : "1K to 5K",
        "Quebec" : "1K to 2K",
        "Montreal" : "100 to 250"
    },
    "med-low" : {
        "World" : "10K to 50K",
        "Canada" : "250 to 1000 ",
        "Quebec" : "100 to 1K",
        "Montreal" : "50 to 100"
    },
    "low" : {
        "World" : "1K to 10K",
        "Canada" : "100 to 250",
        "Quebec" : "50 to 100",
        "Montreal" : "10 to 50"
    },
    "lower" : {
        "World" : "1 to 1K",
        "Canada" : "1 to 100",
        "Quebec" : "1 to 50",
        "Montreal" : "1 to 10"
    },
    "no cases reported" : {
        "World" : "0",
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