import React from "react";

const severityLevel = [
    {level : "high" , color : "#661a00" }, 
    {level : "med-high" , color : "#cc2900" }, 
    {level : "med" , color : "#ff4000" }, 
    {level : "med-low" , color : "#ff9900" }, 
    {level : "low" , color : "#ffff00" }, 
    {level : "lower" , color : "#ffff99" }, 
    {level : "no cases reported" , color : "#D6D6DA" }
]

const SeverityChart = () => 
    <div className= "container">
        <div className ="row severity__chart" >
            {
                severityLevel.map((levelDiv , key) => 
                <div className = "severity__level col-sm-5" key = {key} style={{backgroundColor : levelDiv.color, color: `${key < 3 ? "white" : "black"}`, textShadow: `0.5px 0.5px ${key < 3 ? "black" : "white"}`, }}>
                    {levelDiv.level}
                </div>)
            }
        </div>
    </div>

export default SeverityChart;