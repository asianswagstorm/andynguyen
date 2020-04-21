import React from "react";
import Particles from 'react-particles-js';

const CustomParticles = () => 
<Particles
    params={{
        particles: {
            number: {
                value: (window.innerWidth  <= 400) ? 50 : 200,
                density: {
                    enable: false
                }
            },
            color :  {
                value: "#FFFFFF"
                
            },
            size: {
                value: 10,
                random: true
            },
            line_linked: {
                enable: true,
                opacity: 1
            },
            move: {
                random: true,
                speed: 2,
                direction: "top",
                out_mode: "out"
            }
        },
        interactivity: {
            events: {
                onhover: {
                    enable: true,
                    mode: "repulse"
                },
                onclick: {
                    enable: true,
                    mode: "repulse"
                }
            },
            modes: {
                remove: {
	                particles_nb: 10
	            }
            }
        }
    }} style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '0',
        left: '0'    
      }}
      />

export default CustomParticles;