import * as React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import '../style/about.css'

const Bio = () => {
  const [bioRef, bioInView] = useInView({ triggerOnce: true })

  return (
    <article ref={bioRef} className='bio'>
      <motion.img className='biopic' animate={{ opacity: bioInView ? 1 : 0, y: bioInView ? '0px' : '50px' }} transition={{ duration: 0.3 }} src='./static/biopic.jpg' alt='' />
      <motion.div animate={{ opacity: bioInView ? 1 : 0, y: bioInView ? '0px' : '50px' }} transition={{ duration: 0.3, delay: 0.1 }} className='biotext'>
        <h1>Hi, I'm Jeff, a cs grad and developer.</h1>
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
  )
}

const SkillBar = props => {
  const [barRef, barInView] = useInView({ triggerOnce: true })

  const c0 = [0.86, 0, 0.64]; const c1 = [0.97, 1, 0.2]
  const gradOffset = props.left ? 0 : 0.5
  const getGradient = (start, end) => {
    const cs = c0.map((c, i) => 255 * (c * (1 - start) + c1[i] * start))
    const ce = c0.map((c, i) => 255 * (c * (1 - end) + c1[i] * end))
    return `linear-gradient(to right, rgb(${cs[0]}, ${cs[1]}, ${cs[2]}) 0%, rgb(${ce[0]}, ${ce[1]}, ${ce[2]}) 100%)`
  }

  const formatWidth = decimal => {
    return `calc((100% - 90px)*${decimal})`
  }

  return (
    <div ref={barRef} className='exp-bar'>
      <p>{props.name}</p>
      <div className='exp-bar-color' style={{ width: formatWidth(props.percent), backgroundImage: getGradient(gradOffset, gradOffset + 0.5 * props.percent) }}>
        <motion.div animate={{ scaleX: barInView ? 0 : 1 }} transition={{ duration: 1 }} />
      </div>
    </div>
  )
}

const Expertise = () => {
  const ex = {
    js: 0.9,
    html: 0.875,
    node: 0.7,
    webgl: 0.85,
    cpp: 0.45,
    java: 0.4,
    latex: 0.75,
    py: 0.9,
    css: 0.85,
    react: 0.6,
    glsl: 0.8,
    csh: 0.7,
    c: 0.55,
    matlab: 0.4
  }

  return (
    <article className='expertise'>
      <div>
        <SkillBar name='Javascript' percent={ex.js} left />
        <SkillBar name='CSS' percent={ex.css} left />
        <SkillBar name='HTML' percent={ex.html} left />
        <SkillBar name='Node' percent={ex.node} left />
        <SkillBar name='React' percent={ex.react} left />
        <SkillBar name='WebGL' percent={ex.webgl} left />
        <SkillBar name='GLSL' percent={ex.glsl} left />
      </div>
      <div>
        <SkillBar name='Python' percent={ex.py} left={false} />
        <SkillBar name='C#' percent={ex.csh} left={false} />
        <SkillBar name='C' percent={ex.c} left={false} />
        <SkillBar name='C++' percent={ex.cpp} left={false} />
        <SkillBar name='LaTeX' percent={ex.latex} left={false} />
        <SkillBar name='Matlab' percent={ex.matlab} left={false} />
        <SkillBar name='Java' percent={ex.java} left={false} />
      </div>
    </article>
  )
}

const About = () => {
  return (
    <section id='about'>
      <Bio />
      <Expertise />
    </section>
  )
}

export default About
