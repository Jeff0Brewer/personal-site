import React, { useState } from "react"
import { motion } from "framer-motion"
import { IoCloseOutline } from "react-icons/io5"
import "../style/work.css"

const Project = props => {
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const mainWidth = 1200, cardHeight = mainWidth*.6, headerHeight = 350, contentRadius = 30;
  const animTime = .4;

  return (
    <motion.section className="project"
    animate={{
      width: focus ? '100vw' : `min(${mainWidth}px, 100vw)`,
      height: focus ? 'fit-content' : `${cardHeight}px`,
      borderRadius: focus ? '0px' : `${contentRadius}px`,
      scale: !focus && hover ? 1.02 : 1
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
        transition={{duration: animTime}}>
        </motion.div>
      </motion.button>
      <motion.h1 
        animate={{
          height: focus ? headerHeight : '100%', 
          lineHeight: focus ? `${headerHeight}px` : `${cardHeight}px`, 
          opacity: !focus && hover ? 0 : 1
        }} 
        transition={{duration: animTime}}>
        {props.name}
      </motion.h1>
      <button className="proj-close" aria-label="close" 
      style={{visibility: focus ? 'visible' : 'hidden'}}
      onMouseUp={() => setFocus(false)}>
        <IoCloseOutline />
      </button>
      <div style={{scale: focus ? 1 : 0}}>
        {props.children}
      </div>
    </motion.section>
  );

}

const GrvinContent = () => {
  const imgDir = './static/grvin';

  return (
    <article className="proj-content">
      <p>
        Remind me to thank John for a lovely weekend. My dad once told me, laugh and the world laughs with you, 
        Cry, and I'll give you something to cry about you little bastard! Remind me to thank John for a lovely 
        weekend. Do you have any idea how long it takes those cups to decompose.
      </p>
      <video className="content-lg" autoPlay loop muted playsInline src={`${imgDir}/grvin-overview.mp4`} />
      <h1>Problem addressed:</h1>
      <p>
        Yeah, but your scientists were so preoccupied with whether or not they could, they didn't stop to think if
        they should. Is this my espresso machine? Wh-what is-h-how did you get my espresso machine? God creates 
        dinosaurs. God destroys dinosaurs. God creates Man. Man destroys God. Man creates Dinosaurs.
      </p>
      <img className="content-sm" src={`${imgDir}/old-vis.png`} alt=""/>
      <h1>Design approach:</h1>
      <p>
        Eventually, you do plan to have dinosaurs on your dinosaur tour, right? Eventually, you do plan to have 
        dinosaurs on your dinosaur tour, right? We gotta burn the rain forest, dump toxic waste, pollute the air, and 
        rip up the OZONE! 'Cause maybe if we screw up this planet enough, they won't want it anymore!
      </p>
      <div className="content-lg col">
        <img className="two-col" src={`${imgDir}/grvin-sketch.jpg`} alt=""/>
        <div className="two-col col">
          <img className="two-col" src={`${imgDir}/force-mesh.png`} alt=""/>
          <img className="two-col" src={`${imgDir}/flow-field.png`} alt=""/>
        </div>
      </div>
      <h1>Final product:</h1>
      <p>
        Yeah, but your scientists were so preoccupied with whether or not they could, they didn't stop to think if they 
        should. This thing comes fully loaded. AM/FM radio, reclining bucket seats, and... power windows. Did he just 
        throw my cat out of the window?
      </p>
      <img className="content-lg" src={`${imgDir}/sample-view.png`} alt=""/>
      <p>
        I gave it a cold? I gave it a virus. A computer virus. My dad once told me, laugh and the world laughs with you, 
        Cry, and I'll give you something to cry about you little bastard! Must go faster. I gave it a cold? I gave it a 
        virus. A computer virus. What do they got in there? King Kong?
      </p>
      <img className="content-lg" src={`${imgDir}/multiples-view.png`} alt=""/>
      <p>
        God help us, we're in the hands of engineers. Yeah, but John, if The Pirates of the Caribbean breaks down, the pirates
        don't eat the tourists. Jaguar shark! So tell me - does it really exist? You're a very talented young man, with your own
        clever thoughts and ideas. Do you need a manager?
      </p>
      <div className="content-lg col">
        <img className="two-col" src={`${imgDir}/crop-interaction.png`} alt=""/>
        <img className="two-col" src={`${imgDir}/crop-result.png`} alt=""/>
      </div>
    </article>
  );
}

const IrisContent = () => {
  const imgDir = './static/iris';

  return (
    <article className="proj-content">
      <p>
        Forget the fat lady! You're obsessed with the fat lady! Drive us out of here! Did he just throw my cat out of the window? 
        Forget the fat lady! You're obsessed with the fat lady! Drive us out of here! Hey, take a look at the earthlings. Goodbye! 
        Hey, take a look at the earthlings. Goodbye!
      </p>
      <video className="content-lg" autoPlay loop muted playsInline src={`${imgDir}/iris-overview.mp4`} />
      <h1>Problem addressed:</h1>
      <p>
        God help us, we're in the hands of engineers. Hey, you know how I'm, like, always trying to save the planet? Here's my chance.
        Do you have any idea how long it takes those cups to decompose. They're using our own satellites against us. And the clock is ticking.
      </p>
      <h1>Design approach:</h1>
      <p>
        Eventually, you do plan to have dinosaurs on your dinosaur tour, right? So you two dig up, dig up dinosaurs? I gave it a cold? I gave it
        a virus. A computer virus. God creates dinosaurs. God destroys dinosaurs. God creates Man. Man destroys God. Man creates Dinosaurs.
      </p>
      <div className="content-lg col">
        <img className="three-col" src={`${imgDir}/saccade.png`} alt="" />
        <img className="three-col" src={`${imgDir}/trail.png`} alt="" />
        <img className="three-col" src={`${imgDir}/dot.png`} alt="" />
      </div>
      <h1>Final product:</h1>
      <p>
        Life finds a way. Checkmate... God help us, we're in the hands of engineers. Is this my espresso machine? Wh-what is-h-how did you get my
        espresso machine? Remind me to thank John for a lovely weekend. Life finds a way. You know what? It is beets. I've crashed into a beet truck.
      </p>
      <video className="content-lg" autoPlay loop muted playsInline src={`${imgDir}/iris-example.mp4`} />
      <p>
        Must go faster... go, go, go, go, go! Did he just throw my cat out of the window? My dad once told me, laugh and the world laughs with you,
        Cry, and I'll give you something to cry about you little bastard! Hey, take a look at the earthlings. Goodbye!
      </p>
      <div className="content-lg col">
        <img className="two-col" src={`${imgDir}/resize-start.png`} alt="" />
        <img className="two-col" src={`${imgDir}/resize-end.png`} alt="" />
      </div>
    </article>
  );
}

const Work = () => {

  return (
    <section id="work">
      <Project name="Grvin" coverImg="./static/grvin/grvin-cover.png" headerImg="./static/grvin/grvin-header.png">
        <GrvinContent />
      </Project>
      <Project name="Iris" coverImg="./static/iris/iris-cover.png" headerImg="./static/iris/iris-header.png">
        <IrisContent />
      </Project>

    </section>
  ); 
}

export default Work;