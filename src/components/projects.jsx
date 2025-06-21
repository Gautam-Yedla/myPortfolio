import React from "react";
import ProCodrrImg from "../assets/ProCodrr.webp";
import EazyGradImg from "../assets/eazygrad.webp";
import HarigurusImg from "../assets/harigurus.webp";
import WebDevEnglishImg from "../assets/web-dev-english.webp";
import PioneerDigitalImg from "../assets/pioneer-digital.webp";

const projects = [
	{
		title: "HR Portal (EMS)",
		subtitle: " A full-stack employee management system with secure authentication ",
		description:
			"Built using React.js, Node.js, MongoDB, and JWT, this HR portal streamlines employee data management, leave tracking, and payroll processing. Features include role-based access control, secure login, and a user-friendly dashboard optimized for performance and scalability.",
		image: EazyGradImg,
		link: "https://github.com/Gautam-Yedla/hr_portal.git",
		skills: [
			"React",
			"Node",
			"MogoDB",
			"JWT",
		],
		color: "#1788ae",
	},
	{
		title: "Amazon Sentiment Analyzer",
		subtitle: " A sentiment analysis web app for Amazon product reviews ",
		description:
			"Developed a responsive web application to analyze product sentiment using Python, React.js, and Node.js. Integrated CI/CD with GitHub Actions, Docker, and Jenkins for automated deployment.",
		image: EazyGradImg,
		link: "https://github.com/Gautam-Yedla/amazon-sentiment-analyzer.git",
		skills: [
			"Python",
			"React",
			"Node",
			"Github Actions",
			"Docker",
			"Jenkins",
		],
		color: "#ffe578",
	},
	{
		title: "ADFilms",
		subtitle: " Portfolio website for a professional Wedding & AD Commercial studio ",
		description:
			"Built a responsive and interactive website for a photography client specializing in weddings and ad commercials. Developed using React.js, Node.js, Express.js, and MongoDB to showcase their work and help clients explore services with ease.",
		image: EazyGradImg,
		link: "https://github.com/Gautam-Yedla/ADFilms.git",
		skills: [
			"React",
			"Node",
			"Tailwind CSS",
			"mongoDB",
			
		],
		color: "#fc815c",
	},
	{
		title: "Image-Classification-Using-CN",
		subtitle: " High-accuracy image classifier using PyTorch and CIFAR-100 ",
		description:
		"Built a deep learning model using PyTorch to classify images from the CIFAR-100 dataset. Achieved over 80% test accuracy using a ResNet-inspired architecture with techniques like residual connections, dropout, and data augmentation.",
		image: EazyGradImg,
		link: "https://github.com/Gautam-Yedla/Image-Classification-Using-CNN.git",
		skills: [
			"react.js",
			"express.js",
			"node.js",
			"swiper.js",
			"mongoDB",
			"mongoose",
			"css",
			"javascript",
			"figma",
		],
		color: "#47afa1",
	},
	{
		title: "Salonify",
		subtitle: " Responsive salon appointment and service booking platform ",
		description:
			"Designed and developed a fully responsive salon website from scratch using HTML, CSS, and JavaScript, focusing on seamless booking, service management, and user engagement.",
		image: EazyGradImg,
		link: "https://github.com/Gautam-Yedla/hair-salon-html-template_MAIN.git",
		skills: [
			"HTML",
			"CSS",
			"JavaScript",
		],
		color: "#fc815c",
	},
];

const Projects = () => (
	<section className="projects-section">
		<div className="projects-timeline"></div>
		<h2 className="projects-title">Latest Works</h2>
		{projects.map((project, idx) => (
			<div key={project.title} className="project-row">
				<div
					className={`timeline-connector ${
						idx % 2 === 0 ? "left" : "right"
					}`}
				></div>
				<div
					className={`timeline-dot ${idx % 2 === 0 ? "left" : "right"}`}
				></div>
				<a
					href={project.link}
					className={`project-image-link ${
						idx % 2 === 1 ? "reverse" : ""
					}`}
					target="_blank"
					rel="noopener noreferrer"
				>
					<div
						className={`project-image-container ${
							idx % 2 === 1 ? "ml-auto" : "mr-auto"
						}`}
					>
						<img
							className="project-image"
							src={project.image}
							alt={project.title}
						/>
						<span
							className={`project-image-label ${
								idx === 1 ? "dark" : ""
							}`}
						>
							{project.title}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="feather feather-external-link"
							>
								<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
								<polyline points="15 3 21 3 21 9"></polyline>
								<line x1="10" y1="14" x2="21" y2="3"></line>
							</svg>
						</span>
					</div>
				</a>
				<div className="project-content">
					<h3
						className="project-name"
						style={{ color: project.color }}
					>
						{project.title}
					</h3>
					<span
						className="project-subtitle"
						style={{ color: project.color }}
					>
						({project.subtitle})
					</span>
					<p className="project-description">{project.description}</p>
					<ul className="project-skills">
						{project.skills.map((skill) => (
							<li className="project-skill" key={skill}>
								{skill}
							</li>
						))}
					</ul>
				</div>
			</div>
		))}
	</section>
);

export default Projects;