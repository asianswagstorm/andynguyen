import React, { Component } from 'react';
import Lightbox from 'react-images';
import '../css/Home.css';
import Navbar from  './Navbar';
import Footer from  './Footer';
import OwnerTenant from  './OwnerTenant';

const imgLinks = ["images/projects/mtlrental2.png",
"images/projects/mtlrental1.png"];

const images = [{type:"Owner", view : "Owner View", src: imgLinks[0], description: "The Owner can see the list of potential tenants who match their criteria", id: 0},
{type:"Tenant", view: "Tenant View", src: imgLinks[1], description: "The tenant will see the list of listings based on their preferences", id: 1}];

class soen287 extends Component {

	constructor(props){
		super(props);
		this.state = { currentImage: 0 };
		this.closeLightbox = this.closeLightbox.bind(this); 
		this.gotoNext = this.gotoNext.bind(this);
		this.gotoPrevious = this.gotoPrevious.bind(this); 
		this.openLightbox = this.openLightbox.bind(this);
	}

openLightbox=(id) =>{
	 id = 1;
	 if(isNaN(id))
		console.log(id);
			if(!isNaN(id)){
		this.setState({
		 currentImage: id,
		 lightboxIsOpen: true,
		});}
	} 

	closeLightbox=()=> {
		this.setState({
			currentImage: 0,
			lightboxIsOpen: false,
		}); 
	}
	gotoPrevious=()=> {
		this.setState({
			currentImage: this.state.currentImage - 1,                                                           
		});  
	}
	gotoNext=()=> {
		this.setState({
			currentImage: this.state.currentImage + 1,                                            
		}); 
	}

    render = () => {
        const navbar = <Navbar/>
				const footer = <Footer/>
				const data = images.map((object,index) => {
					return <OwnerTenant index= {index} src={object.src} view={object.view} description={object.description} type={object.type}  />
			});
        return (
            <div className="page-wrap">
            {navbar}

            <section id="main">

				
						<header id="header">
							<div className="split-para">Real Estate App <span>Web Programming  </span></div>
						</header>

            <div className="inner">
								<header>
								<span className="image center">  <img src="images/projects/mtlrental3.jpg" alt=""  />  </span>
								</header>
								<h2>What is MTL Rental?</h2>
								<p>MTL Rental was the first ever web application I ever built during my second semester of University. This application uses <strong>HTML5, CSS3, Bootstrap</strong>in the front end, and   <strong>PHP ,MySQL</strong> in the backend. 
									This application lets <strong>Owners</strong> list their properties, set criterias of their potential tenants, and view the Tenants that match their criteria.  
									<strong>Tenants</strong> can set their preferences and view the listings based on these prefereces.		</p>							
								<section className="columns double"  onClick ={this.openLightbox}>
								<Lightbox images={images}
                          onClose={this.closeLightbox}
                          onClickPrev={this.gotoPrevious}
                          onClickNext={this.gotoNext}
                          currentImage={this.state.currentImage}
                          isOpen={this.state.lightboxIsOpen}/>   
             
								{data}

								</section>

								<h3>What I learned</h3>
								<p>I learned how to use the WAMP servers to host PHP projects, basic mysql queries and basics of web development. This course was the introduction to my journey in web development, and essentially sparked my passion. </p>
						
                </div>

								{footer}
								
                </section>
                </div>
            
            
         );
                 }
                    }

export default soen287;