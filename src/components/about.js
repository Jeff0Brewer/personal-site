import * as React from "react"
import "../style/about.css"

  const Bio = () => {
    return (
      <article id="bio">
        <img className="biopic" src="./static/img/biopic.jpg" alt=""></img>
        <div className="biotext">
          <h1>Eventually, you do plan to have dinosaurs on your dinosaur tour, right?</h1>
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

  const Expertise = () => {
    const formatWidth = decimal => {
      return `calc((100% - 100px)*${decimal})`;
    }

    return (
      <article id="expertise">
        <div className="expertise-left">
          <a><p>Javascript</p><div style={{width: formatWidth(.9)}}></div></a>
          <a><p>HTML</p><div style={{width: formatWidth(.875)}}></div></a>
          <a><p>Node</p><div style={{width: formatWidth(.7)}}></div></a>
          <a><p>GLSL</p><div style={{width: formatWidth(.8)}}></div></a>
          <a><p>C++</p><div style={{width: formatWidth(.45)}}></div></a>
          <a><p>Java</p><div style={{width: formatWidth(.4)}}></div></a>
          <a><p>LaTeX</p><div style={{width: formatWidth(.75)}}></div></a>
        </div>
        <div className="expertise-right">
          <a><p>Python</p><div style={{width: formatWidth(.9)}}></div></a>
          <a><p>CSS</p><div style={{width: formatWidth(.85)}}></div></a>
          <a><p>React</p><div style={{width: formatWidth(.6)}}></div></a>
          <a><p>C#</p><div style={{width: formatWidth(.65)}}></div></a>
          <a><p>C</p><div style={{width: formatWidth(.5)}}></div></a>
          <a><p>Matlab</p><div style={{width: formatWidth(.4)}}></div></a>
          <a><p>Racket</p><div style={{width: formatWidth(1)}}></div></a>
        </div>
      </article>
    );
  }
  
  const About = () => {
    return (
        <section id="about">
          <Bio />
          <Expertise />
        </section>
    );
  }

  export default About;