import * as React from "react"
import Animation from "../animation"
import { Landing, About, Work, Contact } from "../sections"

import "../style.css"

// markup
const IndexPage = () => {
  return (
    <main>
      <Animation />
      <Landing />
      <About />
      <Work />
      <Contact />
    </main>
  )
}

export default IndexPage
