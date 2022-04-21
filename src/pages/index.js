import * as React from "react"
import Animation from "../animation"
import { Landing, About, Work, Contact } from "../sections"

import "../style.css"

// markup
const IndexPage = () => {
  return (
    <main>
      <Animation />
      <div>
        <Landing />
        <About />
        <Work />
        <Contact />
      </div>
    </main>
  )
}

export default IndexPage
