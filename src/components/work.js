import React, { useState } from "react"
import { motion } from "framer-motion"
import { IoCloseOutline } from "react-icons/io5"
import "../style/work.css"

const Project = props => {
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const mainWidth = 1200, headerHeight = 350, contentRadius = 30;
  const animTime = .4;

  return (
    <motion.section className="project"
    animate={{
      width: focus ? '100vw' : `min(${mainWidth}px, 100vw)`,
      height: focus ? 'fit-content' : `${mainWidth*.6}px`,
      borderRadius: focus ? '0px' : `${contentRadius}px`
    }}
    transition={{duration: animTime}}>
      <motion.button className="proj-header"
      animate={{height: focus ? headerHeight : '100%'}} 
      transition={{duration: animTime}}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseUp={() => setFocus(true)}>
        <div style={{backgroundImage: `url(${props.coverImg})`}}></div>
        <motion.div style={{backgroundImage: `url(${props.headerImg})`}}
        animate={{opacity: focus ? 1 : 0}} 
        transition={{duration: animTime}}></motion.div>
      </motion.button>
      <motion.h1 animate={{height: focus ? headerHeight : '100%', opacity: !focus && hover ? 0 : 1}} transition={{duration: animTime}}>
        {props.name}
      </motion.h1>
      <button className="proj-close" aria-label="close" 
      style={{visibility: focus ? 'visible' : 'hidden'}}
      onMouseUp={() => setFocus(false)}>
        <IoCloseOutline />
      </button>
      {props.children}
    </motion.section>
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