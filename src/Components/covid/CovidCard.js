import React from "react";
import {addComma} from "./covidFunction";
const CovidCard = (props) => {
    return(
        <div className="row d-flex justify-content-center">
             {props.listItems.map((item,key) => 
                <div key ={key} className={`card text-center covidCard bg-${item.background}`} >
                      <div className={`card-body covidCard`}>
                        <h3 className={`text-light card-title ${item.className}`} id="covidCardTitle"> {item.itemLabel} </h3> 
                            <h4 className="covid__number">{addComma(item.itemValue)}</h4> 
                     </div>
                </div>
                )}
        </div>
    )
}
export default CovidCard;

