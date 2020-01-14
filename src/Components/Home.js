import React, { Component } from "react";
//import logo from '../logo.svg';
import "../css/Home.css";
import "../css/font-awesome.min.css";
import Card from "./Card";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {tiles} from "./constants/Tiles";


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
      specialFooter: false
    };
    this.escapeFunction = this.escapeFunction.bind(this);
  }

  filter = type => {
    this.setState({ filterOption: type });
  };

  escapeFunction = event => {
    if (event.keyCode === 27) {
      window.history.go(-1);
    }
  };

  render = () => {
    const lifeList = tiles.map((value, index) => {
      if (
        this.state.filterOption === value.type ||
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
            className="button"
          >
            {" "}
            {x.languages}{" "}
          </button>
        </li>
      );
    });

    const navbar = <Navbar />;
    const footer = <Footer specialFooter={this.state.specialFooter} />;

    return (
      <div className="page-wrap">
        {navbar}

        <section id="main">
          <section id="banner">
            <div className="inner">
              <h1 className="intro-andy">Hey, I'm Andy</h1>
              <p id="intro">
                I'm a programmer. On the occasion I lift things up and put them
                down.{" "}
              </p>
              <ul className="actions">
                <li>
                  <a 
                    id="cv-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="Andy_Nguyen.pdf"
                    className="button alt scrolly big"
                  >
                    Download My CV
                  </a>
                </li>
              </ul>
            </div>
          </section>

          <header id="header" />
          <section id="galleries">
            <div className="gallery">
              <header>
                <h1>Projects</h1>
                <ul id="tabs">{language_buttons}</ul>
              </header>

              <div className="content">{lifeList}</div>
            </div>
          </section>

          <section id="contact">
            <div className="social column">
              <h3>About Me</h3>
              <p id="about-me">
                My name's Andy Nguyen, a Montreal based software developer. A
                recent Computer Science grad in the Web Services and Application
                domain. I'm a problem solver, solving bugs or learning something
                new fuels me to become a better developer. My interest
                lies in web development, my years in university and my personal
                projects have made me discover my passion for coding. I am
                always learning and growing, looking for mentorship opportunities within a diverse team environment. I look forward to working with you.
              </p>
              <p id="about-me">
                Outside of coding, I am a certified personal trainer and a {" "}
                <a
                  href="http://www.fqd-quebec.com/lifter/528"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  competitive powerlifter{" "}
                </a>{" "}
                in the -83kg class part of the Quebec Powerlifting Federation. I
                enjoy cooking delicious meals, mixology, photography and of course petting dogs.
              </p>

              <h3>Follow Me</h3>
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
            {/* Clean this up and make a email server. */}
            <div className="column">
              <h3>Get in Touch with Me</h3>
              <form
                action="mailto:nguyen.andy123@gmail.com"
                method="post"
                encType="text/plain"
                target="_top"
              >
                <div className="field half first">
                  <label htmlFor="name">Name</label>
                  <input name="name" id="name" type="text" placeholder="Name" />
                </div>
                <div className="field half">
                  <label htmlFor="email">Email</label>
                  <input
                    name="email"
                    id="email"
                    type="email"
                    placeholder="Email"
                  />
                </div>
                <div className="field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    name="message"
                    id="message"
                    rows="6"
                    placeholder="Message"
                  />
                </div>
                <ul className="actions">
                  <li>
                    <input
                      value="Send Message"
                      className="button"
                      type="submit"
                    />
                  </li>
                </ul>
              </form>
            </div>
          </section>

          {footer}
        </section>
      </div>
    );
  };
}

export default Home;
