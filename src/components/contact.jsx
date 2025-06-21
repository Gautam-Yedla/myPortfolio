import React from "react";

const Contact = () => (
  <section id="contact" className="section">
    <h2 className="section-title">Contact Me</h2>
    <div className="contact-content">
      <div className="contact-info">
        <p>
          Interested in collaborating or have a question? Feel free to reach
          out via email or connect on LinkedIn.
        </p>
      </div>
      <div className="contact-links">
        <a href="mailto:gautamyedla@gmail.com" className="contact-link">
          📧 Email
        </a>
        <a
          href="https://www.linkedin.com/in/gautamyedla/"
          className="contact-link"
          target="_blank"
          rel="noopener"
        >
          💼 LinkedIn
        </a>
        <a
          href="https://github.com/gautam-yedla"
          className="contact-link"
          target="_blank"
          rel="noopener"
        >
          🐙 GitHub
        </a>
      </div>
    </div>
  </section>
);

export default Contact;
