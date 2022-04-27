import * as React from "react"
import Animation from "../animation"
import About from "../about"
import { Landing, Navbar, Work, Contact } from "../sections"

import "../style.css"

// markup
const IndexPage = () => {
  return (
    <main>
      <Animation />
      <div>
        <Landing />
        <Navbar />
        <About />
        <Work />
        <Contact />
      </div>
    </main>
  )
}

export default IndexPage
