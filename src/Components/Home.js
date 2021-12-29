import React, { Component } from "react";
import "../css/Home.css";
import "../css/font-awesome.min.css";
import ListOfProjects from "./ListOfProjects";
import { Wave } from 'react-animated-text';
import Typist from 'react-typist';
import { popUpNotification,sanitize } from "./constants/HelperFunction/Functions";

const languages = [
  { languages: "All" },
  { languages: "Work Experience" },
  { languages: "JavaScript" },
  { languages: "Python" }
];

const socials = [
  {
    link: "https://www.linkedin.com/in/😄-andy-nguyen-84818b15b/",
    type: "LinkedIn"
  },
  {
    link: "https://github.com/asianswagstorm",
    type: "Github"
  },
  {
    link: "https://www.instagram.com/asianswagstorm/?hl=en",
    type: "Instagram"
  }
];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterOption: "",
      isToggleOn: true,
      loaded:false,
      contactInfo: {name: "", _replyto: "", message: ""},
      hasEmpty: true
    };
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount = () => {
    this.state.loaded === false && setTimeout(() => this.setState({loaded: true}) , 1000)
  }

  //use redux props clean this up
//<script type="application/text"> console.log("hello") </script>

  submitForm = (event) => {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    
    if(!this.state.hasEmpty){
      const xhr = new XMLHttpRequest();
      const {name, _replyto, message} = this.state.contactInfo;
      data.set("name", name);
      data.set("_replyto", _replyto);
      data.set("message", message);

      xhr.open(form.method, form.action);
      xhr.setRequestHeader("Accept", "application/json");
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status === 200) {
          //form.reset();
          popUpNotification('success', "Thanks for reaching out, I will get back to you shortly." )
        } else {
            popUpNotification('error', "Sorry, there was an error while submitting the form." )
        }
      };
      xhr.send(data);
      this.setState({ hasEmpty: true } );
    }
    
  };

  filter = type => {
    this.setState({ filterOption: type });
  };

  setContactInfo = (event) => {
    const {name,value} = event.target;
    const contactInfo = {...this.state.contactInfo, [name] : sanitize(value)} 
    const hasEmpty = Object.values(contactInfo).some(variable => variable.trim(" ") === "")
    this.setState({ contactInfo, hasEmpty } );
  }

  render = () => {
    //use props from redux.
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
                I am a computer science graduate, who's always on the pursuit of knowledge and self improvement. 
              </p>
              <p id="about-me">
                Software development is one of my life passions, because I find value in turning creative ideas into reality.  
                Finding solutions to client facing / challenging problems sparks joy within me.
                I am seeking to join a dynamic, passionate, fun and energetic team whom can provide mentorship opportunities, to help extend my knowledge in software development to greater lengths.
                While having a blast creating awesome software.
                 Looking forward to working with you.
              </p>
              <p id="about-me">
              Outside of coding, I hold a personal training certification and I compete in the 
               <a
                  href="https://www.fqd-quebec.com/athletes/528"
                  target="_blank"
                  rel="noopener noreferrer"
                > Quebec Powerlifting Federation.</a>
                 My passion for fitness has taught me dedication and confidence that directly translates to everything I do in life. 
                 Other hobbies include being an amature chef, a dog enthusiast and a tech admirer.  
              </p>

              <h3>My Socials</h3>
              <ul className="icons">
                {
                socials.map(social => 
                 <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href= {social.link}
                      className={`icon fa-${social.type.toLowerCase()}`}
                    >
                      <span className="label">{social.type}</span>
                    </a>
                </li>
                )  
              }
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
                  <input name="name" id="name" type="text" placeholder="Name" onChange={this.setContactInfo}/>
                  </label>
                </div>
                <div className="field half">
                  <label htmlFor="_replyto">Email
                  <input
                    name="_replyto"
                    id="_replyto"
                    type="email"
                    placeholder="example@example.com"
                    onChange={this.setContactInfo}
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
                    onChange={this.setContactInfo}
                  />
                  </label>
                </div>
              
                <ul className="actions">
                  <li>
                    <input
                      value="Send Message"
                      className="button"
                      type="submit"
                      disabled={this.state.hasEmpty}
                    />
                  </li>
                </ul> 
              </form>
            </div>
          </section>
        </section>
        </div>
    );
  };
};

export default Home;
