import * as React from "react"
import { FaArrowDown, FaRegObjectUngroup } from "react-icons/fa"

const Landing = () => {
    const scrollDown = () => {
      document.querySelector('.navbar').scrollIntoView({behavior: 'smooth'});
    };
  
    return (
        <div id="landing">
            <header className="namecard">
                <h1  className="fade-in">Jeff Brewer</h1>
                <p className="fade-in">software developer</p>
                <div className="fade-in" onMouseUp={scrollDown}><FaArrowDown className="arrow" /></div>
            </header>
        </div>
    );
  }

  const Navbar = () => {
    const lockNav = () => {
      if(window.scrollY > window.innerHeight){
        document.querySelector('.navbar').classList.add('nav-lock');
      }
      else{
        document.querySelector('.navbar').classList.remove('nav-lock');
      }
    };
    window.addEventListener('scroll', lockNav);

    return (
      <nav className="navbar">
        <button id="about-nav">About</button>
        <button id="work-nav">Work</button>
        <button id="wip-nav">WIP</button>
        <button id="contact-nav">Contact</button>
      </nav>
    );
  }

  const Project = props => {
    return (
      <article className="project">
        <img src={props.imgSrc} alt=""></img>
        <div><p>{props.name}</p></div>
      </article>
    );
  }

  const Work = () => {
      return (
        <section id="work">
          <Project name="GRVIN" imgSrc="./static/img/grvin-cover.png" />
          <Project name="Iris" imgSrc="./static/img/iris-cover.png" />
        </section>
      );
  }

  const Contact = () => {
      return (
        <section id="contact">
        </section>
      );
  }

  export {
      Landing,
      Navbar,
      Work,
      Contact
  }