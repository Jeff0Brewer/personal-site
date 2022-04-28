import * as React from "react"
import { Animation, Landing } from "../components/landing"
import Navbar from "../components/navbar"
import About from "../components/about"
import Work from "../components/work"
import Contact from "../components/contact"

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
