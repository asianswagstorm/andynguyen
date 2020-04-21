import React, { Component } from "react";
import "../css/Home.css";
import "../css/font-awesome.min.css";
import ListOfProjects from "./ListOfProjects";
import { Wave } from 'react-animated-text';
import Typist from 'react-typist';
import CustomParticles from "./CustomParticles";
import { popUpNotification } from "./constants/HelperFunction/Functions";


const languages = [
  { languages: "All" },
  { languages: "Work Experience" },
  { languages: "JavaScript" },
  { languages: "Python" }
];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterOption: "",
      isToggleOn: true,
      status: "",
      loaded:false
    };
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount = () => {
    this.state.loaded === false && setTimeout(() => this.setState({loaded: true}) , 1000)
  }

  //use redux props clean this up
  submitForm = (event) => {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        this.setState({ status: "SUCCESS" });
      } else {
        this.setState({ status: "ERROR" });
      }
    };
    xhr.send(data);
  };

  filter = type => {
    this.setState({ filterOption: type });
  };

  render = () => {
    //use props from redux.
    const { status } = this.state;

    const language_buttons = languages.map((x, index) => {
      return (
        <li key={index}>
          <button
            onClick={() => this.filter(x.languages !== "All" ? x.languages : "")}
            data-tag={x.languages}
            className="language_button"
          >
            {x.languages}
          </button>
        </li>
      );
    });

    return (
     <div>
        <section id="main">
          <section id="banner">
            
          <CustomParticles />
            <div className="inner">
              <div className="heyThere">
                <h1 className="intro-andy">
                  <Wave text="Hey! " iterations={this.state.loaded === false ? 1 : 0} /> 
                </h1> {/** redux function set timeout */}
                { this.state.loaded === true && 
                <span>
                <h1 className="intro_name">
                  <Wave text="I'm " iterations={1}/>
                
                  <Typist cursor={{ show: false }}  startDelay={800}>
                    Andy.
                  </Typist>
                </h1>
                </span>
                }
             </div>
            </div>
          </section>

          <header id="header" />
          <section id="galleries">
            <div className="gallery">
              <header>
                <h1>Projects / Experience</h1>
                <ul id="tabs">{language_buttons}</ul>
              </header>

              <ListOfProjects filterOption={this.state.filterOption}/>
            </div>
          </section>

          <section id="contact">
            <div className="social column">
              <h3>About Me</h3>
              <p id="about-me">
                My name is Andy Nguyen, a Montreal native software developer. 
                I am a computer science graduate, always on the pursuit of knowledge and self improvement. 
              </p>
              <p id="about-me">
                Software development is one of my life passions, because I find value in turning ideas into reality.  
                Finding solutions to client facing problems sparks joy.
                I am seeking to join a dynamic, passionate and energetic team that can provide me mentorship opportunities, to extend my knowledge in software development to greater lengths. Looking forward to working with you.
              </p>
              <p id="about-me">
              Outside of coding, I hold a personal training certification and I compete in the  
               <a
                  href="http://www.fqd-quebec.com/lifter/528"
                  target="_blank"
                  rel="noopener noreferrer"
                > Quebec Powerlifting Federation.</a>
                 My passion for fitness has taught me dedication and confidence that directly translate to everything I do.  
              </p>

              <h3>My Socials</h3>
              <ul className="icons">
                <li>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.linkedin.com/in/andy-nguyen-84818b15b/"
                    className="icon fa-linkedin"
                  >
                    <span className="label">LinkedIn</span>
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/asianswagstorm"
                    className="icon fa-github"
                  >
                    <span className="label">Github</span>
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.instagram.com/asianswagstorm/?hl=en"
                    className="icon fa-instagram"
                  >
                    <span className="label">Instagram</span>
                  </a>
                </li>
              </ul>
            </div>
          
            <div className="column">
              <h3>Get in Touch with Me</h3>
              <form
                onSubmit={this.submitForm}
                action="https://formspree.io/xjvyddlb"
                method="POST"
              >
                <div className="field half first">
                  <label htmlFor="name">Name
                  <input name="name" id="name" type="text" placeholder="Name" />
                  </label>
                </div>
                <div className="field half">
                  <label htmlFor="_replyto">Email
                  <input
                    name="_replyto"
                    id="email"
                    type="email"
                    placeholder="example@example.com"
                  />
                  </label>
                </div>
                <div className="field">
                  <label htmlFor="message">Message
                  <textarea
                    name="message"
                    id="message"
                    rows="6"
                    placeholder="i.e I like Dogs!"
                  />
                  </label>
                </div>
                {status === "SUCCESS" ?  popUpNotification('success', "Thanks for reaching out, I will get back to you shortly." ) : 
                <ul className="actions">
                  <li>
                    <input
                      value="Send Message"
                      className="button"
                      type="submit"
                    />
                  </li>
                </ul> }
                {status === "ERROR" && popUpNotification('error', "Sorry, there was an error while submitting the form." )}
              </form>
            </div>
          </section>
        </section>
        </div>
    );
  };
};

export default Home;
