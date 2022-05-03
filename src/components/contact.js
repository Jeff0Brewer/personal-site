import * as React from "react"
import { FaGithub, FaLinkedin, FaTwitterSquare } from "react-icons/fa"
import "../style/contact.css"

const Contact = () => {
    return (
      <section id="contact">
        <h1>Want to say hi?</h1>
        <div id="social-links">
          <a href="https://www.linkedin.com/" id="linkedin-icon" target="_blank" rel="noreferrer" aria-label="linkedin"><FaLinkedin /></a>
          <a href="https://github.com/" id="github-icon" target="_blank" rel="noreferrer" aria-label="github"><FaGithub /></a>
          <a href="https://twitter.com/" id="twitter-icon" target="_blank" rel="noreferrer" aria-label="twitter"><FaTwitterSquare /></a>
        </div>
        <form id="email-form" action="https://formspree.io/f/xlezozyy" method="POST">
          <input id="name-input" type="text" placeholder="Name" name="name" required />
          <input id="email-input" type="text" placeholder="Your email" name="email" required />
          <textarea id="message-input" placeholder="Your message" name="message" required />
          <input type="text" name="_gotcha" style={{display: 'none'}} />
          <button type="submit">Send</button>
        </form>
      </section>
    );
}

export default Contact;