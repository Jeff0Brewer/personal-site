import React, { useState } from "react"
import { motion } from "framer-motion"
import "../style/work.css"

const ProjectCard = props => {
  const [hover, setHover] = useState(false);

  return (
    <motion.article className="project" animate={{scale: hover ? 1.02 : 1, height: props.focused ? 0 : 'fit-content'}} transition={{ duration: .5 }}>
      <img src={props.imgSrc} alt=""/>
      <motion.div 
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onMouseDown={() => props.focusProj()} 
      animate={{ opacity: hover ? 0 : 1 }}>
          <p>{props.name}</p>
      </motion.div>
    </motion.article>
  );
}

const GrvinProject = props => {

  return (
    <motion.article id="grvin-proj" className="proj-article" 
    animate={{height: props.focused ? '100vh' : 0, width: props.focused ? '100vw' : '50vw'}}
    transition={{duration: 1}}>
      <header className="proj-header">
        <img src="./static/img/grvin-header" alt=""/>
        <h1>Grvin</h1>
      </header>
    </motion.article>
  )
}
  
const Work = () => {
  const [grvinFocused, setGrvinFocus] = useState(false);

  const focusGrvin = () => {
    setGrvinFocus(true);
  }

  const unfocusGrvin = () => {
    setGrvinFocus(false);
  }

  return (
    <section id="work">
      <ProjectCard name="Grvin" imgSrc="./static/img/grvin-cover.png" focused={grvinFocused} focusProj={focusGrvin} />
      <GrvinProject focused={grvinFocused} unfocusProj={unfocusGrvin} />
      <ProjectCard name="iris" imgSrc="./static/img/iris-cover.png" />
    </section>
  ); 
}

  export default Work;