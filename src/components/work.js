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
      <motion.button className="proj-header" style={{cursor: focus? 'auto' : 'pointer'}}
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
        {focus ? props.children : <article className="content-fill"></article>}
      </div>
    </motion.section>
  );

}

const GrvinContent = () => {
  const imgDir = './static/grvin';

  return (
    <article className="proj-content">
      <p>
        An interactive visualization tool for analyzing the underlying physics within granular materials. Grvin visualizes data from ~50,000 
        individual grains over ~70 timesteps as a column of granular material (sand) deforms under load. Made in collaboration with Caltech, 
        Art Center, JPL, and designers Pooja Nair, Adrian Galvin. 
      </p>
      <video className="content-lg" autoPlay loop muted playsInline src={`${imgDir}/grvin-overview.mp4`} />
      <h1>Problem addressed:</h1>
      <p>
        The granular geomechanics team at Caltech were working to understand patterns of failure in granular materials. They hoped to understand why 
        granular materials behave as they do, specifically, supporting force nonuniformly and breaking down in a characteristic 'shear band.' Further
        understanding the physics in these granular samples would allow better materials to be created for applications like civil engineering. The
        team had a lot of data but their ability to visualize and explore it was severely limited. Their visualizations lacked interactivity, since 
        rendering many grain surfaces can get computationally costly, and also suffered occlusion problems, where grains visibly obstruct each 
        other and any important patterns.
      </p>
      <img className="content-sm" src={`${imgDir}/old-vis.png`} alt=""/>
      <h1>Design approach:</h1>
      <p>
        When designing our visualization tool we regularly met with the granular geomechanics team to discuss their needs for analysis. From this we 
        tried to understand what information is most important to them and how to display it most usefully. We identified two areas of interest: 
        force chains and movement in the shear band. Force chains meaning adjacent grain sets supporting high load and the shear band meaning an area
        where deformation is concentrated. We iterated visualizations to clarify these phenomena and continued to meet with the team for feedback on
        prototypes and to understand their needs.
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
        Our final design visualizes a flow field of grain movement, a vector field of forces between grains, and provides interactions to crop and 
        select subsets of data. Displaying both visualizations side by side allows for easy reference between and pattern identification. Data can be
        explored by slicing subsets of these large scale plots or by selecting sets of individual grain surfaces.
      </p>
      <img className="content-lg" src={`${imgDir}/sample-view.png`} alt=""/>
      <p>
        Once interesting patterns are identified and grain surfaces are selected, users can view animations of the grain surfaces, plot time series of 
        the grains, and color map with additional data fields.
      </p>
      <img className="content-lg" src={`${imgDir}/multiples-view.png`} alt=""/>
      <p>
        All selection and slicing use 2d drawing interactions to maximize clarity and ease of use. Users draw the area they want directly on top 
        of the visualization and then project into 3d space to select or crop.
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
        A rapid gaze visualization prototyping tool. Iris visualizes real time eye tracking data and provides tools for diverse visualization 
        editing and customization. The system allows users unfamiliar with gaze visualizations to rapidly prototype representations for a 
        variety of scenarios. Made in collaboration with Sarah D'Angelo and Darren Gergle of Northwestern University's CollabLab.
      </p>
      <video className="content-lg" autoPlay loop muted playsInline src={`${imgDir}/iris-overview.mp4`} />
      <h1>Problem addressed:</h1>
      <p>
        Gaze data is becoming more available and gaze visualization could be a powerful tool for design input and collaboration. Different 
        contexts for gaze visualization benefit from vastly different representations of eye tracking data, but it is difficult to experiment 
        with gaze visualization design.
      </p>
      <h1>Design approach:</h1>
      <p>
        Gaze visualizations usually represent a few aspects of eye movement: current focus, movement, and history of fixations. To accommodate 
        these requirements, we designed a few modular visualization components that are highly customizable. These components are a point at 
        the current focus, a trail of recent movements, and connected points representing fixation history. They are designed to be 
        generic and highly adaptable to the user's context.
      </p>
      <div className="content-lg col">
        <img className="three-col" src={`${imgDir}/dot.png`} alt="" />
        <img className="three-col" src={`${imgDir}/trail.png`} alt="" />
        <img className="three-col" src={`${imgDir}/saccade.png`} alt="" />
      </div>
      <h1>Final product:</h1>
      <p>
        The final system provides three highly customizable visualization modules and tools to change the background context and record gaze data. 
        These modules visualize current focus, movement, and fixation history allowing for a wide range of gaze visualization applications. This allows 
        users to quickly design new representations in their appropriate context and identify important visualization features.
      </p>
      <video className="content-lg" autoPlay loop muted playsInline src={`${imgDir}/iris-example.mp4`} />
      <p>
        For ease of use, editing is primarily handled by direct visualization manipulation with the mouse.
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