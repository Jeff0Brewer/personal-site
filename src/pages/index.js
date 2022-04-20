import * as React from "react"
import Animation from "../animation"
import { About, Landing } from "../sections"

import "../style.css"

// markup
const IndexPage = () => {
  return (
    <main>
      <Animation />
      <Landing />
      <About />
    </main>
  )
}

export default IndexPage
