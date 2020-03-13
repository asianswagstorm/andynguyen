import React, { Component } from "react";
import "../css/Home.css";
import "../css/font-awesome.min.css";
import Card from "./Card";
import {tiles} from "./constants/Tiles";
import { Wave } from 'react-animated-text';
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
    this.escapeFunction = this.escapeFunction.bind(this);
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

  escapeFunction = event => {
    if (event.keyCode === 27) {
      window.history.go(-1);
    }
  };

  render = () => {
    //use props from redux.
    const { status } = this.state;

    const lifeList = tiles.map((value, index) => {
      if (
        value.type.includes(this.state.filterOption) ||
        this.state.filterOption === ""
      ) {
        return (
          <Card
            key={index}
            href={value.href}
            imgSrc={value.src}
            alt=""
            title={value.title}
          />
        );
      }
      return false;
    });

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
                  <Wave text="Hey! I'm " iterations={this.state.loaded === false ? 1 : 0} /> 
                </h1> {/** redux function set timeout */}
                { this.state.loaded === true && 
                <h1 className="intro_name">
                  <Wave text="Andy." iterations={1}/>
                </h1> 
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

              <div className="content">{lifeList}</div>
            </div>
          </section>

          <section id="contact">
            <div className="social column">
              <h3>About Me</h3>
              <p id="about-me">
                My name is Andy Nguyen, a Montreal based software developer. A
                recent Computer Science graduate, but am always learning. I chose this field because finding solutions to problems and developing quality software 
                excites me. I am looking for mentorship opportunities within a diverse team, that can challenge me and help develop my skills as a software developer 
                even further. I look forward to working with you.
              </p>
              <p id="about-me">
                Outside of coding, I hold a personal training certification and I {" "} 
                <a
                  href="http://www.fqd-quebec.com/lifter/528"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  compete in powerlifting
                </a>
                {" "} within the Quebec Powerlifting Federation. My other interest include cooking, mixology, photography and of course petting dogs.
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
                    placeholder="Email"
                  />
                  </label>
                </div>
                <div className="field">
                  <label htmlFor="message">Message
                  <textarea
                    name="message"
                    id="message"
                    rows="6"
                    placeholder="Message"
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
