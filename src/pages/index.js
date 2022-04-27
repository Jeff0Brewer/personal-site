import * as React from "react"
import Animation from "../components/animation"
import About from "../components/about"
import Work from "../components/work"
import Contact from "../components/contact"
import { Landing, Navbar } from "../components/sections"

import "../style/index.css"

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
