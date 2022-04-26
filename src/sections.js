import * as React from "react"
import { FaArrowDown } from "react-icons/fa"

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
      <nav class="navbar">
        <button id="about-nav">About</button>
        <button id="work-nav">Work</button>
        <button id="wip-nav">WIP</button>
        <button id="contact-nav">Contact</button>
      </nav>
    );
  }

  const Bio = () => {
    return (
      <article id="bio">
        <img className="biopic" src="./static/img/biopic.jpg"></img>
        <div className="biotext">
          <h1>Eventually, you do plan to have dinosaurs on your dinosaur tour, right? You really think you can fly that thing?</h1>
          <p>
            You know what? It is beets. I've crashed into a beet truck. Eventually, you do plan to have dinosaurs on your dinosaur tour, 
            right? My dad once told me, laugh and the world laughs with you, Cry, and I'll give you something to cry about you little bastard!
          </p>
          <p>
            Forget the fat lady! You're obsessed with the fat lady! Drive us out of here! This thing comes fully loaded. AM/FM radio, reclining 
            bucket seats, and... power windows. We gotta burn the rain forest, dump toxic waste, pollute the air, and rip up the OZONE! 'Cause maybe
            if we screw up this planet enough, they won't want it anymore!
          </p>
        </div>
      </article>
    );
  }
  
  const About = () => {
    return (
        <section id="about">
          <Bio />
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