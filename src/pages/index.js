import * as React from "react"
import smoothscroll from 'smoothscroll-polyfill';
import { Animation, Landing } from "../components/landing"
import Navbar from "../components/navbar"
import About from "../components/about"
import Work from "../components/work"
import Contact from "../components/contact"
import "../style/index.css"

//enable smooth scrolling on incompatible browsers
smoothscroll.polyfill(); 

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
