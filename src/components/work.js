import React, { useState } from "react"
import { motion } from "framer-motion"
import "../style/work.css"

const Project = props => {
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const contentSpace = 60, mainWidth = 1200, headerHeight = 350;
  const animTime = .5;

  const getDefWidth = () => {
    return Math.min(mainWidth, window.innerWidth);
  }

  const getFocWidth = () => {
    return window.innerWidth < mainWidth ? window.innerWidth : window.innerWidth - 2*contentSpace;
  }

  return (
    <motion.button className="project"
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
    onMouseDown={() => setFocus(!focus)}
    animate={{
      width: focus ? getFocWidth() + 'px' : getDefWidth() + 'px',
      height: focus ? 'fit-content' : getDefWidth()*.6 + 'px'}}
    transition={{duration: animTime}}>
      <motion.header animate={{height: focus ? headerHeight : '100%'}} trasition={{duration: animTime}}>
        <div style={{backgroundImage: `url(${props.coverImg})`}}></div>
        <motion.div style={{backgroundImage: `url(${props.headerImg})`}}
        animate={{opacity: focus ? 1 : 0}} 
        transition={{duration: animTime}}></motion.div>
      </motion.header>
      <motion.h1 animate={{height: focus ? headerHeight : '100%', opacity: !focus && hover ? 0 : 1}} trasition={{duration: animTime}}>
        {props.name}
      </motion.h1>
      {props.children}
    </motion.button>
  );

}

const GrvinContent = () => {
  return (
    <article>

    </article>
  );
}

const IrisContent = () => {
  return (
    <article>

    </article>
  );
}

const Work = () => {

  return (
    <section id="work">
      <Project name="Grvin" coverImg="./static/img/grvin-cover.png" headerImg="./static/img/grvin-header.png">
        <GrvinContent />
      </Project>
      <Project name="Iris" coverImg="./static/img/iris-cover.png" headerImg="./static/img/iris-header.png">
        <IrisContent />
      </Project>

    </section>
  ); 
}

export default Work;