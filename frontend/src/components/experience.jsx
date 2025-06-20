import React from "react";


const experiences = [
  {
    date: "2024 - Present",
    role: "Full-Stack Developer",
    company: "InnovateX Solutions",
    description:
      "Building scalable web applications and leading a team of junior developers. Focused on React, Node.js, and cloud deployment.",
  },
  {
    date: "2023 - 2024",
    role: "Software Engineering Intern",
    company: "TechBridge Inc.",
    description:
      "Developed internal tools for data visualization and automation. Improved team productivity by 20% through process automation.",
  },
  {
    date: "2021 - 2023",
    role: "Computer Science Student",
    company: "XYZ University",
    description:
      "Completed coursework in algorithms, data structures, and machine learning. Participated in coding competitions and open-source projects.",
  },
  {
    date: "2020 - 2021",
    role: "Open Source Contributor",
    company: "Various Projects",
    description:
      "Contributed to several open-source repositories, focusing on bug fixes, documentation, and feature enhancements.",
  },
];

const Experience = () => (
  <section id="experience" className="experience-section section">
    <h2 className="section-title">Experience</h2>
    <ul className="experience-timeline">
      {experiences.map((exp, idx) => (
        <li className="experience-item" key={idx}>
          <span className="experience-dot" />
          <div className="experience-date">{exp.date}</div>
          <div className="experience-role">{exp.role}</div>
          <div className="experience-company">{exp.company}</div>
          <div className="experience-description">{exp.description}</div>
        </li>
      ))}
    </ul>
  </section>
);

export default Experience;
