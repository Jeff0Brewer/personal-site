import React from "react"
import "../style/navbar.css"


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
    window.scrollTo({top: el.getBoundingClientRect().top + window.scrollY - 110, behavior: 'smooth'})
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

export default Navbar;