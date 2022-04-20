import * as React from "react"
import { FaArrowDown } from "react-icons/fa"

const Landing = () => {
    const scrollDown = () => {
      document.getElementById('about').scrollIntoView({behavior: 'smooth'});
    }
  
    return (
        <section id="landing">
            <header className="namecard">
                <h1 className="fade-in">Jeff Brewer</h1>
                <p className="fade-in">software developer</p>
                <div className="fade-in" onMouseUp={scrollDown}><FaArrowDown className="arrow" /></div>
            </header>
        </section>
    );
  }
  
  const About = () => {
    return (
        <section id="about">
            asdfadsaf
        </section>
    );
  }

  export {
      Landing,
      About
  }