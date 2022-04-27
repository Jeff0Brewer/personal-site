import * as React from "react"
import { FaGithub, FaLinkedin, FaTwitterSquare } from "react-icons/fa"
import "../style/contact.css"

const Contact = () => {
    return (
      <section id="contact">
        <h1>Want to say hi?</h1>
        <div id="social-links">
          <a id="linkedin-icon"><FaLinkedin /></a>
          <a id="github-icon"><FaGithub /></a>
          <a id="twitter-icon"><FaTwitterSquare /></a>
        </div>
        <div id="email-form">
          <input id="name-input" type="text" placeholder="Name" name="name" required />
          <input id="email-input" type="text" placeholder="Your email" name="email" required />
          <textarea id="message-input" placeholder="Your message" name="message" required />
          <button>Send</button>
        </div>
      </section>
    );
}

export default Contact;