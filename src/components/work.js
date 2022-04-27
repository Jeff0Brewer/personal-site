import * as React from "react"
import "../style/work.css"

const Project = props => {
    return (
      <article className="project">
        <img src={props.imgSrc} alt=""></img>
        <div><p>{props.name}</p></div>
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