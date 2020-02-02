import React, { Component } from 'react';
import {metso} from "./constants/Jobs";
class Metso extends Component {
    // make it a modal 
    render = () => {
        const {job_detail, product_explanation, tech_stack} = metso.job_overview;

        return (
            <section id="main">
                <div className ="inner">
                    <div className = "job-section">
                        <h1>Overview Of Internship</h1> {/* can have this like a prop in a constant file */}
                   
                        <p className="job-description">{job_detail}</p>
                        <p className="job-description">{product_explanation}</p>
                        <h2>Stack Used</h2>
                        <div className="stack-used">
                            <ul className="stack-logo">
                        {//Clean this up in one line (css)
                            [...tech_stack].map((tech, key) => (
                                    <li key = {key}>
                                    <a href={tech.link} target="_blank" > <img src = {tech.image} alt={tech.name} style={{height: '80px', width: '80px', marginBottom: '10px',marginRight: '10px'}} ></img></a>
                                    <span className="tech-stack">  {tech.description} </span>
                                    </li>
                            
                            ))  
                            }
                            </ul>
                        </div>
                
                    
                        {/* <p className="job-description">{tech_stack}</p> */}


                        <h2>Tasks Performed</h2>
                        <ul>
                            { metso.tasks_performed.map((task,key) => 
                            <li key = {key}>
                            <h3> {task.title} </h3>
                            <p className="job-description">{task.detail} </p>
                            </li>
                            )
                            }
                        </ul>
                    </div>
                </div>
            </section>
         );
                 }
                    }

export default Metso;