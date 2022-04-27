import * as React from "react"
import { FaArrowDown } from "react-icons/fa"
import "../style/landing.css"
import "../style/navbar.css"

const Landing = () => {
  return (
      <div id="landing">
          <header className="namecard">
              <h1  className="fade-in">Jeff Brewer</h1>
              <p className="fade-in">software developer</p>
              <div className="fade-in" onMouseUp={() => document.querySelector('.navbar').scrollIntoView({behavior: 'smooth'})}>
                <FaArrowDown className="arrow" />
              </div>
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

  const scrollToElement = el => {
    window.scrollTo({top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth'})
  };

  return (
    <nav className="navbar">
      <button className="home-nav" onMouseUp={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Home</button>
      <button className="about-nav" onMouseUp={() => scrollToElement(document.getElementById('bio'))}>About</button>
      <button className="work-nav" onMouseUp={() => scrollToElement(document.getElementById('work'))}>Work</button>
      <button className="contact-nav" onMouseUp={() => scrollToElement(document.getElementById('contact'))}>Contact</button>
    </nav>
  );
}

export {
    Landing,
    Navbar
}