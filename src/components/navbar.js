import React, { useState, useRef } from "react"
import { motion } from "framer-motion"
import "../style/navbar.css"


const Navbar = () => {
  const [focus, setFocus] = useState(0);
  const navRef = useRef(null);
  const tabRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const sections = ['landing', 'about', 'work', 'contact'];
  const borderMin = '4px', borderMax = '12px';
  const animDuration = .3;

  const updateNav = () => {
    if(window.scrollY > window.innerHeight){
      navRef.current.classList.add('nav-lock');
    }
    else{
      navRef.current.classList.remove('nav-lock');
    }
    for(let i = 0; i < sections.length; i++){
      let rect = document.getElementById(sections[i]).getBoundingClientRect();
      if(Math.sign(rect.top - window.innerHeight/2) !== Math.sign(rect.bottom - window.innerHeight/2)){
        tabRefs[focus].current.classList.remove('nav-current');
        setFocus(i);
        tabRefs[i].current.classList.add('nav-current');
      }
    }
  };
  window.addEventListener('scroll', updateNav);

  const scrollToElement = el => {
    window.scrollTo({top: el.getBoundingClientRect().top + window.scrollY - 110, behavior: 'smooth'})
  };

  return (
    <nav ref={navRef} className="navbar">
      <motion.button className="home-nav" ref={tabRefs[0]} 
      animate={{borderBottomWidth: focus === 0 ? borderMax : borderMin}} transition={{duration: animDuration}} 
      onMouseUp={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
        Home
      </motion.button>
      <motion.button className="about-nav" ref={tabRefs[1]} 
      animate={{borderBottomWidth: focus === 1 ? borderMax : borderMin}} transition={{duration: animDuration}} 
      onMouseUp={() => scrollToElement(document.getElementById('bio'))}>
        About
      </motion.button>
      <motion.button className="work-nav" ref={tabRefs[2]} 
      animate={{borderBottomWidth: focus === 2 ? borderMax : borderMin}} transition={{duration: animDuration}} 
      onMouseUp={() => scrollToElement(document.getElementById('work'))}>
        Work
      </motion.button>
      <motion.button className="contact-nav" ref={tabRefs[3]} 
      animate={{borderBottomWidth: focus === 3 ? borderMax : borderMin}} transition={{duration: animDuration}} 
      onMouseUp={() => scrollToElement(document.getElementById('contact'))}>
        Contact
      </motion.button>
    </nav>
  );
}

export default Navbar;