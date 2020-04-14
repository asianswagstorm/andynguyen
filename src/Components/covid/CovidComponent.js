import React, { useState }  from 'react';
import MapChart from "./MapChart";
import ReactTooltip from "react-tooltip";
import Headers from "../Headers";
import WorldWideCases from "./WorldWideCases"
const getFlagByCOuntryCode =(country) => {
    return country.toUpperCase().replace(/./g, char => String.fromCodePoint(char.charCodeAt(0)+127397));
}

const CovidComponent = (props) => {
    const [content, setContent] = useState("");
    return (
        <div>
              <Headers linkTo = "#/" headerTitle="Global SARS CoV2 Cases"/>   
       
    <div className= "covid19"> 
            <div className="world__cases">
                <WorldWideCases mapType="world"/>
                <button className="nextMap__button" onClick = {() => props.history.push("/CovidCanada")  }  > See cases in Canada </button>
            </div>
          <MapChart  setTooltipContent={setContent} />
         { content !== "" && 
         <ReactTooltip place="top" type="dark" effect="float">
              <ul> 
                  {content.split("—").map((data, key) => 
                  <li key= {key}> {key !== 5 ? data : 
                    getFlagByCOuntryCode(data)
                  } </li>)}
              </ul>
            </ReactTooltip>
        }
    </div>
    </div>
    )
}

export default CovidComponent;

 