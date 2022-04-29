import * as React from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import "../style/about.css"

  const Bio = () => {
    const [bioRef, bioInView] = useInView({ triggerOnce: true });

    return (
      <article ref={bioRef} id="bio">
        <motion.img className="biopic" animate={{opacity: bioInView ? 1 : 0, y: bioInView ? '0px' : '50px'}} transition={{ duration: 0.3}} src="./static/img/biopic.jpg" alt="" />
        <motion.div animate={{opacity: bioInView ? 1 : 0, y: bioInView ? '0px' : '50px'}} transition={{ duration: 0.3, delay: 0.1}} className="biotext">
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
        </motion.div>
      </article>
    );
  }

  const SkillBar = props => {
    const [barRef, barInView] = useInView({ triggerOnce: true });

		const c0 = [.86, 0, .64], c1 = [.97, 1, .2];
    const gradOffset = props.left ? 0 : .5;
    const getGradient = (start, end) => {
      const cs = c0.map((c, i) => 255*(c*(1 - start) + c1[i]*start));
      const ce = c0.map((c, i) => 255*(c*(1 - end) + c1[i]*end));
      return `linear-gradient(to right, rgb(${cs[0]}, ${cs[1]}, ${cs[2]}) 0%, rgb(${ce[0]}, ${ce[1]}, ${ce[2]}) 100%)`;
    }

    const formatWidth = decimal => {
      return `calc((100% - 90px)*${decimal})`;
    }

    return (
      <a ref={barRef}>
        <p>{props.name}</p>
        <div className="exp-bar" style={{width: formatWidth(props.percent), backgroundImage: getGradient(gradOffset, gradOffset + .5*props.percent)}}>
          <motion.div animate={{ scaleX: barInView ? 0 : 1 }} transition={{ duration: 1 }}></motion.div>
        </div>
      </a>
    );
  }

  const Expertise = () => {
    const ex = {
      js: .9, html: .875, node: .7, webgl: .85,
      cpp: .45, java: .4, latex: .75, py: .9,
      css: .85, react: .6, glsl: .8, csh: .65, 
      c: .5, matlab: .4
    }

    return (
      <article id="expertise">
        <div>
        <SkillBar name="Javascript" percent={ex.js} left={true} />
          <SkillBar name="HTML" percent={ex.html} left={true} />
          <SkillBar name="Node" percent={ex.node} left={true} />
          <SkillBar name="WebGL" percent={ex.webgl} left={true} />
          <SkillBar name="C++" percent={ex.cpp} left={true} />
          <SkillBar name="Java" percent={ex.java} left={true} />
          <SkillBar name="LaTeX" percent={ex.latex} left={true} />
        </div>
        <div>
          <SkillBar name="Python" percent={ex.py} left={false} />
          <SkillBar name="CSS" percent={ex.css} left={false} />
          <SkillBar name="React" percent={ex.react} left={false} />
          <SkillBar name="GLSL" percent={ex.glsl} left={false} />
          <SkillBar name="C#" percent={ex.csh} left={false} />
          <SkillBar name="C" percent={ex.c} left={false} />
          <SkillBar name="Matlab" percent={ex.matlab} left={false} />
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