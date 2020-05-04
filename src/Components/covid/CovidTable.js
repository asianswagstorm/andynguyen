import React from "react";
import {addComma} from "./covidFunction";
const CovidTable = ({regionType, data}) => {
    const areas = Object.keys(data);
    const cases = Object.values(data);

    return(
        <div className="covidTable table-responsive">
            <table className="table-sm table-striped covidTable">
                <thead>
                    <tr className ="countryCase__Head">
                        <th id="country__number" className="covid__th">#</th>
                        <th id="country__name" className="covid__th">Area</th>
                        <th className="table-primary covid__th">Confirmed</th>
                        { regionType === "World" &&
                        <th className="table-success covid__th">Recovered</th>
                        }
                        <th className="table-danger covid__th">Deaths</th>
                    </tr>
                </thead>
                <tbody>
                {areas.map((area, key) => (
                    <tr className ="countryCase" key={key}>
                        <th id="country__number" className="covid__th" >{key+1}</th>
                        <th id="country__name" className="covid__th" >{area}</th>
                        <td className="table-primary covid__td">{addComma(cases[key].confirmed)}</td>
                        {regionType === "World" &&
                        <td className="table-success covid__td">{addComma(cases[key].recovered)}</td>
                        }
                        <td className="table-danger covid__td ">{cases[key].deaths ? addComma(cases[key].deaths) : "NA"}</td>
                        
                    </tr>)
                    )
                }
                </tbody>
            </table>
        </div>
    );
};

export default CovidTable;