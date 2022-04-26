import * as React from "react"
import { FaArrowDown } from "react-icons/fa"

const Landing = () => {
    const scrollDown = () => {
      document.getElementById('about').scrollIntoView({behavior: 'smooth'});
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
    const navbarRef = React.useRef(null);

    const lockNav = () => {
      if(window.scrollY > window.innerHeight){
        navbarRef.current.classList.add('nav-lock');
      }
      else{
        navbarRef.current.classList.remove('nav-lock');
      }
    };

    window.addEventListener('scroll', lockNav);

    return (
      <nav class="navbar" ref={navbarRef}>
        <button id="about-nav">About</button>
        <button id="work-nav">Work</button>
        <button id="wip-nav">WIP</button>
        <button id="contact-nav">Contact</button>
      </nav>
    );
  }
  
  const About = () => {
    return (
        <section id="about">
        </section>
    );
  }

  const Work = () => {
      return (
        <section id="work">
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
      About,
      Work,
      Contact
  }