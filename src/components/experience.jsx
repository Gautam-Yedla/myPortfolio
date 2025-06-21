import React from "react";


const experiences = [
  {
    date: "JANUARY 2025 - APRIL 2025",
    role: "Software Developer Intern",
    company: "Kovalty Technologies LLP",
    description:
      "Worked and developed the HR Portal and company website from scratch using React.js, HTML, CSS, and JavaScript. Implemented responsive UI with Material UI and Tailwind CSS, integrated RESTful APIs, and managed version control with Git and GitHub.",
  },
  {
    date: "2023 - 2024",
    role: "Machine Learning Intern",
    company: "Slash Mark IT Startup",
    description:
      "Developed a Python-based task manager with NLP-driven recommendations, increasing task efficiency by 20%, built an XGBoost model for home price prediction with 15% improved accuracy, and achieved 97% accuracy on digit classification using MNIST and deep learning techniques.",
  },
  {
    date: " MARCH 2024 - AUGUST 2024 ",
    role: "Full Stack Developer Intern",
    company: "I & T Lab's",
    description:
      "Directed a team of 14 in developing a scalable e-commerce salon platform, implementing secure authentication, payment integration, and achieving a 25% backend performance boost through database optimization.",
  },
  {
    date: "2022 - 2026",
    role: "Computer Science & Engineering Student",
    company: "Andhra University College of Engineering",
    description:
      "CGPA - 8.01",
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
