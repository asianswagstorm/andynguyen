import React, { Component } from 'react';
//import logo from '../logo.svg';
import '../css/Home.css';
import '../css/font-awesome.min.css';
import Card from  './Card';
import Navbar from  './Navbar';


const fakeDb = [
//Change the Href to be pages with description with the X button, not href to the image
        { href:"Jamdo" , src:"images/thumbs/01.jpg", alt:"", title:"Jamdo, a web application created for Web Services and Applications class.", type: 'python' },
        { href:"Pokemon" , src:"images/thumbs/02.jpg", alt:"", title: "A Pokemon card battle game created for Web-Based Enterprise Application Design .", type: "java" },
        { href:"https://airbnbmock.herokuapp.com/" , src:"images/thumbs/03.jpg", alt:"", title:"An airbnb replica front page created with react JS (first time using React) ", type: 'javascript' },
        { href:"Real_Estate" , src:"images/thumbs/04.jpg", alt:"", title:"A real estate application created for Web Programming class, my first web application. ", type: 'php' },
        { href:"Medical_Clinic" , src:"images/thumbs/05.jpg", alt:"", title:"Medical Clinic Patient Management application created for Database class.", type:'php'},
        { href:"https://asianswagstorm.github.io/SimpleProjects/TicTacToe/" , src:"images/thumbs/06.jpg", alt:"", title:"Tic Tac Toe Game .", type:'javascript'},
        { href:"https://asianswagstorm.github.io/SimpleProjects/RockPaperScissor/" , src:"images/thumbs/07.jpg", alt:"", title:"Rock Paper Scissor Game.", type:'javascript'},
        { href:"https://asianswagstorm.github.io/SimpleProjects/Connect4/" , src:"images/thumbs/08.jpg", alt:"", title:"Connect 4 Game.", type:'javascript'},
        { href:"PowerGrid" , src:"images/thumbs/09.jpg", alt:"", title:"C++ Board Game implemented with design pattern.", type:'c++'},
        { href:"Distributed_System" , src:"images/thumbs/10.jpg", alt:"", title:"Distributed Systems.", type:'java'},
        { href:"UDP_APP" , src:"images/thumbs/11.jpg", alt:"", title:"UDP chat application using docker container for networking class.", type:'javascript'},
     
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
        return <Card href={value.href} imgSrc={value.src} alt="" title={value.title}/>}
        return false
    });
    const navbar = <Navbar/>

    return (
    
      <div className="page-wrap">
  
        {navbar}

          <section id="main">

              <section id="banner">
                <div className="inner">
                  <h1>Hey, I'm Andy</h1>
                  <p>Recently graduated from Computer Science interested in web development </p>
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
                                      <li><button onClick={() => this.filter("")} data-tag="all" class="button">All</button></li>
                                      <li><button onClick={() => this.filter("java")} data-tag="java" class="button">Java</button></li>
                                      <li><button onClick={() => this.filter("javascript")}  data-tag="javascript" class="button">Javascript</button></li>
                                      <li><button onClick={() => this.filter("python")}  data-tag="python" class="button">Python</button></li>
                                      <li><button onClick={() => this.filter("php")}  data-tag="php" class="button">Php</button></li>
                                      <li><button onClick={() => this.filter("c++")}  data-tag="c++" class="button">C++</button></li>

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
                    <p>My name's Andy Nguyen, a Montreal based software developer. I am interested in web development, being able to create applications from stract is what I love to do. Recently discovered the world of web framework, 
                   I am currently learning React JS and Flask. Always willing to learn more about cool industry technology to help me become the best developer I can be.  </p>
                    Outside of coding, I am a <a href="http://www.fqd-quebec.com/lifter/528" target="_blank" rel="noopener noreferrer">competitive powerlifter </a> in the -83kg class in the Quebec Powerlifting Federation.  
                    I enjoy cooking, mixology and have a keen eye for photography.  
                    
                    <h3>Follow Me</h3>
                    <ul className="icons">
                      <li><a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/andy-nguyen-84818b15b/" class="icon fa-linkedin"><span class="label">LinkedIn</span></a></li>
                      <li><a target="_blank" rel="noopener noreferrer" href="https://github.com/asianswagstorm" class="icon fa-github"><span class="label">Github</span></a></li>
                      <li><a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/asianswagstorm" class="icon fa-facebook"><span class="label">Facebook</span></a></li>
                      <li><a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/asianswagstorm/?hl=en" class="icon fa-instagram"><span class="label">Instagram</span></a></li>
                    </ul>
                  </div>
                
                  <div className="column">
                    <h3>Get in Touch with Me</h3>
                    <form action="mailto:nguyen.andy123@gmail.com" method="post" enctype="text/plain">
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
                        <li><input value="Send Message" class="button" type="submit"/></li>
                      </ul>
                    </form>
                  </div>
  
              </section>
  
  
        <footer id="footer">
							<div class="copyright">
								&copy; 2019<span > Andy Nguyen</span>
							</div>
				</footer>
          </section>
      </div>
  
    );
  }
}

export default Home;
