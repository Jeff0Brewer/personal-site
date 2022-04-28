import * as React from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import "../style/about.css"

  const Bio = () => {
    const [bioRef, bioInView] = useInView({ 
      triggerOnce: true,
    });

    return (
      <article ref={bioRef} id="bio">
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

  const SkillBar = props => {
    const formatWidth = decimal => {
      return `calc((100% - 100px)*${decimal})`;
    }

		const c0 = [.86, 0, .64], c1 = [.97, 1, .2];
    const gradOffset = props.left ? 0 : .5;
    const getGradient = (start, end) => {
      const cs = c0.map((c, i) => 255*(c*(1 - start) + c1[i]*start));
      const ce = c0.map((c, i) => 255*(c*(1 - end) + c1[i]*end));
      return `linear-gradient(to right, rgb(${cs[0]}, ${cs[1]}, ${cs[2]}) 0%, rgb(${ce[0]}, ${ce[1]}, ${ce[2]}) 100%)`;
    }

    return (
      <a>
        <p>{props.name}</p>
        <div className="exp-bar" style={{width: formatWidth(props.percent), backgroundImage: getGradient(gradOffset, gradOffset + .5*props.percent)}}>
          <motion.div animate={{ scaleX: props.inView ? 0 : 1 }} transition={{ duration: 1.5 }}></motion.div>
        </div>
      </a>
    );
  }

  const Expertise = () => {
    const [panelRef, panelInView] = useInView({ triggerOnce: true});

    const ex = {
      js: .9, html: .875, node: .7, webgl: .8,
      cpp: .45, java: .4, latex: .75, py: .9,
      css: .85, react: .6, csh: .65, c: .5,
      matlab: .4, racket: 1.0
    }

    return (
      <article ref={panelRef} id="expertise">
        <div>
        <SkillBar name="Javascript" percent={ex.js} left={true} inView={panelInView} />
          <SkillBar name="HTML" percent={ex.html} left={true} inView={panelInView} />
          <SkillBar name="Node" percent={ex.node} left={true} inView={panelInView} />
          <SkillBar name="WebGL" percent={ex.webgl} left={true} inView={panelInView} />
          <SkillBar name="C++" percent={ex.cpp} left={true} inView={panelInView} />
          <SkillBar name="Java" percent={ex.java} left={true} inView={panelInView} />
          <SkillBar name="LaTeX" percent={ex.latex} left={true} inView={panelInView} />
        </div>
        <div>
          <SkillBar name="Python" percent={ex.py} left={false} inView={panelInView} />
          <SkillBar name="CSS" percent={ex.css} left={false} inView={panelInView} />
          <SkillBar name="React" percent={ex.react} left={false} inView={panelInView} />
          <SkillBar name="C#" percent={ex.csh} left={false} inView={panelInView} />
          <SkillBar name="C" percent={ex.c} left={false} inView={panelInView} />
          <SkillBar name="Matlab" percent={ex.matlab} left={false} inView={panelInView} />
          <SkillBar name="Racket" percent={ex.racket} left={false} inView={panelInView} />
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