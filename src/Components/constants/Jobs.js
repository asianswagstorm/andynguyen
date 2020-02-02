import azure from "../../photos/job/azure.png";
import couch from "../../photos/job/couch.png";
import django from "../../photos/job/django.png";
import docker from "../../photos/job/docker.png";
import react from "../../photos/job/react.png";
import redux from "../../photos/job/redux.png";


export const metso = {

job_overview: { job_detail: `I worked at  Metso Mineral in Lachine Quebec for a period of 7 months between July 2019 to January 2020, assisting the Field Service Department to turn a concept idea into a working application. The application allowed the company to manage and track their many client's mill information during mill inspection visits.
                             My role was to convert the initial static HTML code into dynamic functioning application using modern web framework like React and Django. Working directly with the management of the Field Service Department, I worked in an Agile environment completing weekly sprints 
                             in a timely manner.`,
                product_explanation:`The application built is a progressive web application that can run offline.
                                     The main purpose of the application was to change from traditional PDF written reports into a web based format to make it easier to generate mill inspection reports.`
                                    ,
        

                tech_stack: [
                    {
                        name: "Django",
                        image: django,
                        description: "Used the Django framework on the backend.",
                        link: "https://docs.djangoproject.com/en/3.0/" 
                    }, 
                    {
                        name: "React",
                        image: react,
                        description: "Used React framework to build the UI.",
                        link: "https://reactjs.org/docs/getting-started.html" 
                    },
                    {
                        name: "Redux",
                        image: redux,
                        description: "Used Redux as the state manager.",
                        link: "https://redux.js.org/introduction/getting-started" 
                    },
                    {
                        name: "CouchDB / PouchDB",
                        image: couch,
                        description: "Used CouchDB as the database, PouchDB as an indexed DB (offline mode).",
                        link: "https://docs.couchdb.org/en/stable/" 
                    },
                    {
                        name: "Docker",
                        image: docker,
                        description: "Used Docker to virtualize the frontend and backend into docker images.",
                        link: "https://docs.docker.com/" 
                    },
                    {
                        name: "Azure",
                        image: azure,
                        description: `Used Microsoft Azure services to manage project and hosting service.`,
                        link: "https://docs.microsoft.com/en-us/azure/" 
                    }
                ]
                
            },
                /*
                "The Technology stack used was React JS / Redux on the frontend,
                 Python Django on the Backend, CouchDB / PouchDB as the database, Docker as a container, and Azure App Services as the Cloud host server."     
                */
                
// add logo of tech stack??? 

                tasks_performed: [
    {
        title:"Front End Role:",
        detail:"Designed and implemented the web app using React JS and Redux. Used REST services to request API responses from the backend server. "
    },
    {
        title:"Back End Role:",
        detail:"Using Python Django, I wrote API routes that returned HTTP Responses in JSON format to be used in the frontend server. Wrote CouchDB views to filter information based on the documents on the databse."
    },
    {
        title:"DevOps Role:",
        detail:`Dockerized the project into docker images, pushed the images into Azure Registry Containers.
                Deployed the Front End, Back End and the database registry containers on Azure App Services.`
    },
    {
        title:"Team Lead Role:",
        detail:`Taught my colleague how to code in React. Organize daily Scrum meetings. Organized the weekly sprints.`
    }
]

};