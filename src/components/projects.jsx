import React from "react";
import ProCodrrImg from "../assets/ProCodrr.webp";
import EazyGradImg from "../assets/eazygrad.webp";
import HarigurusImg from "../assets/harigurus.webp";
import WebDevEnglishImg from "../assets/web-dev-english.webp";
import PioneerDigitalImg from "../assets/pioneer-digital.webp";

const projects = [
	{
		title: "Project_01",
		subtitle: "",
		description:
			"Deeply understand advanced concepts, practice with real-world exercises, build expertise with hands-on projects to boost your career.",
		image: EazyGradImg,
		link: "",
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
		color: "#1788ae",
	},
	{
		title: "Project_02",
		subtitle: "",
		description:
			"Being a lead developer, revamped the site to a highly responsive, and interactive website. Created new features and pages. Worked as a team with product manager and ux designer.",
		image: EazyGradImg,
		link: "#",
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
		color: "#ffe578",
	},
	{
		title: "Project_03",
		subtitle: "",
		description:
			"HariGurus is a one-stop-shop for all Hindu religious, customs and traditional requirements. Built the complete site from scratch.",
		image: EazyGradImg,
		link: "#",
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
		color: "#fc815c",
	},
	{
		title: "Project_04",
		subtitle: "",
		description:
			"Being a lead developer, revamped the site to a highly responsive, and interactive website. Created new features and pages. Worked as a team with product manager and ux designer.",
		image: EazyGradImg,
		link: "#",
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
		title: "Project_05",
		subtitle: "",
		description:
			"One of the featured site while working with TheBrandWick.com (agency). Worked as a frontend developer to make the site user-interactive and responsive.",
		image: EazyGradImg,
		link: "#",
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
								#{skill}
							</li>
						))}
					</ul>
				</div>
			</div>
		))}
	</section>
);

export default Projects;