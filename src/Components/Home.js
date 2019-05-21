import React, { Component } from 'react';
//import logo from '../logo.svg';
import '../css/Home.css';
import '../css/font-awesome.min.css';
import Card from  './Card';
import Navbar from  './Navbar';
import Footer from  './Footer';

const fakeDb = [
//Change the Href to be pages with description with the X button, not href to the image
        { href:"Jamdo" , src:"images/thumbs/thumb1.jpg", alt:"", title:"Jamdo, a web application created for Web Services and Applications class.", type: 'python' },
        { href:"Pokemon" , src:"images/thumbs/thumb2.jpg", alt:"", title: "A Pokemon card battle game created for Web-Based Enterprise Application Design .", type: "java" },
        { href:"https://airbnbmock.herokuapp.com/" , src:"images/thumbs/thumb3.jpg", alt:"", title:"An airbnb replica front page created with react JS (first time using React) ", type: 'javascript' },
        { href:"https://recipes-api-app.herokuapp.com/" , src:"images/thumbs/thumb12.jpg", alt:"", title:"A recipe api app made with react. ", type: 'javascript' },
        { href:"Real_Estate" , src:"images/thumbs/thumb4.jpg", alt:"", title:"A real estate application created for Web Programming class, my first web application. ", type: 'php' },
        { href:"Medical_Clinic" , src:"images/thumbs/thumb5.jpg", alt:"", title:"Medical Clinic Patient Management application created for Database class.", type:'php'},
        { href:"https://asianswagstorm.github.io/SimpleProjects/TicTacToe/" , src:"images/thumbs/thumb6.jpg", alt:"", title:"Tic Tac Toe Game .", type:'javascript'},
        { href:"https://asianswagstorm.github.io/SimpleProjects/RockPaperScissor/" , src:"images/thumbs/thumb7.jpg", alt:"", title:"Rock Paper Scissor Game.", type:'javascript'},
        { href:"https://asianswagstorm.github.io/SimpleProjects/Connect4/" , src:"images/thumbs/thumb8.jpg", alt:"", title:"Connect 4 Game.", type:'javascript'},
        { href:"PowerGrid" , src:"images/thumbs/thumb9.jpg", alt:"", title:"C++ Board Game implemented with design pattern.", type:'c++'},
        { href:"Distributed_System" , src:"images/thumbs/thumb10.jpg", alt:"", title:"Distributed Systems.", type:'java'},
        { href:"UDP_APP" , src:"images/thumbs/thumb11.jpg", alt:"", title:"UDP chat application using docker container for networking class.", type:'javascript'},
     
                           ];

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterOption: "",
            isToggleOn: true,};
        this.escapeFunction = this.escapeFunction.bind(this);  
    
      }

  filter = (type) => {
    this.setState({filterOption: type});
  }  

  escapeFunction = (event) =>{ 
    if (event.keyCode === 27) {
       window.history.go(-1);}
 }

  render = () => {

    const lifeList = fakeDb.map((value, index) => {
        if(this.state.filterOption === value.type || this.state.filterOption === ""){
        return<Card key={index} href={value.href} imgSrc={value.src} alt="" title={value.title}/>}
        return false
    });
    const navbar = <Navbar/>
    const footer = <Footer/>

    return (
    
      <div className="page-wrap">
  
        {navbar}

          <section id="main">

              <section id="banner">
                <div className="inner">
                  <h1>Hey, I'm Andy</h1>
                  <p>I'm a programmer. On the occasion I lift things up and put them down. </p>
                  <ul className="actions">
                    <li><a target = "_blank" rel="noopener noreferrer" href="Andy_Nguyen.pdf" className="button alt scrolly big">Download My CV</a></li>
                  </ul>
                </div>
              </section>
  
              <header id="header">
						
						</header>

                      <section id="galleries">
                          <div className="gallery">
                              <header>
                                <h1>Projects</h1>
                                  <ul id="tabs">
                                      <li><button onClick={() => this.filter("")} data-tag="all" className="button">All</button></li>
                                      <li><button onClick={() => this.filter("java")} data-tag="java" className="button">Java</button></li>
                                      <li><button onClick={() => this.filter("javascript")}  data-tag="javascript" className="button">Javascript</button></li>
                                      <li><button onClick={() => this.filter("python")}  data-tag="python" className="button">Python</button></li>
                                      <li><button onClick={() => this.filter("php")}  data-tag="php" className="button">Php</button></li>
                                      <li><button onClick={() => this.filter("c++")}  data-tag="c++" className="button">C++</button></li>

                                  </ul>
                              </header>

                              <div className="content">
                             
                              {lifeList}
                            
                              </div>
                          </div>
                      </section>
  
              <section id="contact">
                
                  <div className="social column">
                    <h3>About Me</h3>
                    <p>My name's Andy Nguyen, a Montreal based software developer. A recent Computer Science grad in the Web Services and Application domain. 
                      I'm a problem solver, solving bugs or learning something new always fuels me to become a better developer.
                      My interest lies in web development, my years in university and my personal projects have made me discover
                      my passion for coding. I am always learning and growing, and look forward to work with you.</p>
                         <p>
                    Outside of coding, I am a <a href="http://www.fqd-quebec.com/lifter/528" target="_blank" rel="noopener noreferrer">competitive powerlifter </a> in the -83kg class in the Quebec Powerlifting Federation.  
                  I enjoy cooking, mixology, photography and of course petting dogs.  
                    </p>
                    
                    <h3>Follow Me</h3>
                    <ul className="icons">
                      <li><a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/andy-nguyen-84818b15b/" className="icon fa-linkedin"><span className="label">LinkedIn</span></a></li>
                      <li><a target="_blank" rel="noopener noreferrer" href="https://github.com/asianswagstorm" className="icon fa-github"><span className="label">Github</span></a></li>
                      <li><a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/asianswagstorm/?hl=en" className="icon fa-instagram"><span className="label">Instagram</span></a></li>
                    </ul>
                  </div>
                
                  <div className="column">
                    <h3>Get in Touch with Me</h3>
                    <form action="mailto:nguyen.andy123@gmail.com" method="post" encType="text/plain" target="_top">
                      <div className="field half first">
                        <label htmlFor="name">Name</label>
                        <input name="name" id="name" type="text" placeholder="Name"/>
                      </div>
                      <div className="field half">
                        <label htmlFor="email">Email</label>
                        <input name="email" id="email" type="email" placeholder="Email"/>
                      </div>
                      <div className="field">
                        <label htmlFor="message">Message</label>
                        <textarea name="message" id="message" rows="6" placeholder="Message"></textarea>
                      </div>
                      <ul className="actions">
                        <li><input value="Send Message" className="button" type="submit"/></li>
                      </ul>
                    </form>
                  </div>
  
              </section>
  
        {footer}

          </section>
      </div>
  
    );
  }
}

export default Home;
