import React, { useState } from "react"
import { motion } from "framer-motion"
import "../style/work.css"

const Project = props => {
  let [hover, setHover] = useState(false);

    return (
      <article onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="project">
        <img src={props.imgSrc} alt=""></img>
        <motion.div animate={{ opacity: hover ? 0 : 1 }}><p>{props.name}</p></motion.div>
      </article>
    );
  }
  
  const Work = () => {
      return (
        <section id="work">
          <Project name="GRVIN" imgSrc="./static/img/grvin-cover.png" />
          <Project name="iris" imgSrc="./static/img/iris-cover.png" />
        </section>
      );
  }

  export default Work;