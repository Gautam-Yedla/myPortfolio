import React, { useState, useEffect, useRef } from "react";
import "./App.css"; // Assuming design.css is in the same directory
import CustomCursor from "./components/cursor";
import Footer from "./components/footer";
import Contact from "./components/contact";
import Experience from "./components/experience";
import Services from "./components/services";
import Projects from "./components/projects";
import Navbar from "./components/navbar";

// Typewriter component with blinking cursor and rich text support
const phrases = [
  { text: "Computer Science ", highlight: "Engineer" },
  { text: "Full-Stack ", highlight: "Developer" },
  { text: "Open Source ", highlight: "Enthusiast" },
  { text: "Lifelong ", highlight: "Learner" },
];

function Typewriter() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayed, setDisplayed] = useState({ text: "", highlight: "" });
  const [showCursor, setShowCursor] = useState(true);
  // const [isWaiting, setIsWaiting] = useState(false);
  const timeoutRef = useRef();
  const blinkRef = useRef();

  useEffect(() => {
    blinkRef.current = setInterval(() => setShowCursor((v) => !v), 500);
    return () => clearInterval(blinkRef.current);
  }, []);

  useEffect(() => {
    const { text, highlight } = phrases[phraseIndex];
    const full = text + highlight;

    if (isDeleting) {
      if (charIndex > 0) {
        const total = charIndex - 1;
        const nextText = total < text.length ? text.substring(0, total) : text;
        const nextHighlight = total >= text.length ? highlight.substring(0, total - text.length) : "";
        setDisplayed({ text: nextText, highlight: nextHighlight });
        timeoutRef.current = setTimeout(() => setCharIndex(total), 80);
      } else {
        setIsDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
        setCharIndex(0);
      }
    } else {
      if (charIndex < full.length) {
        const total = charIndex + 1;
        const nextText = total <= text.length ? text.substring(0, total) : text;
        const nextHighlight = total > text.length ? highlight.substring(0, total - text.length) : "";
        setDisplayed({ text: nextText, highlight: nextHighlight });
        timeoutRef.current = setTimeout(() => setCharIndex(total), 100);
      } else {
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true);
        }, 2000); // 2-second pause before deleting
      }
    }

    return () => clearTimeout(timeoutRef.current);
  }, [charIndex, isDeleting, phraseIndex]);

  return (
    <span className="typewriter" aria-live="polite">
      {displayed.text}
      <span className="typewriter-highlight">{displayed.highlight}</span>
      <span className="typewriter-cursor" style={{ opacity: showCursor ? 1 : 0 }}>|</span>
    </span>
  );
}

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false);
  const [isNavMenuActive, setIsNavMenuActive] = useState(false);
  const navMenuRef = useRef(null);
  const mobileToggleRef = useRef(null);
  const sidebarRef = useRef(null);
  const sidebarToggleRef = useRef(null);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        navMenuRef.current &&
        mobileToggleRef.current &&
        !navMenuRef.current.contains(e.target) &&
        !mobileToggleRef.current.contains(e.target)
      ) {
        setIsNavMenuActive(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Scroll effects
  useEffect(() => {
    const handleScroll = () => {
      // Navbar scroll effect
      const navbar = document.getElementById("navbar");
      if (window.scrollY > 30) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }

      // Scroll progress bar
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);

      // Back to top button
      setIsBackToTopVisible(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Back to top functionality
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Smooth scroll for nav links
  const handleSmoothScroll = (e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        setIsNavMenuActive(false);
        const navbar = document.getElementById("navbar");
        const navbarHeight = navbar.offsetHeight + 25;
        const targetPosition = target.offsetTop - navbarHeight;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === "Escape") {
        setIsNavMenuActive(false);
        setIsSidebarOpen(false);
        document.body.style.overflow = "";
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  // Mobile sidebar behavior
  useEffect(() => {
    const handleMobileSidebar = () => {
      if (window.innerWidth <= 768) {
        const sidebarLinks =
          sidebarRef.current?.querySelectorAll(".social-link");
        sidebarLinks?.forEach((link) => {
          link.addEventListener("click", () => {
            setTimeout(closeSidebar, 300);
          });
        });
      }
    };
    handleMobileSidebar();
    window.addEventListener("resize", handleMobileSidebar);
    return () => window.removeEventListener("resize", handleMobileSidebar);
  }, []);

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    document.body.style.overflow = "";
  };

  const openSidebar = () => {
    setIsSidebarOpen(true);
    document.body.style.overflow = "hidden";
  };

  return (
    <>
      <CustomCursor />
      <Navbar
        scrollProgress={scrollProgress}
        isBackToTopVisible={isBackToTopVisible}
        scrollToTop={scrollToTop}
        isSidebarOpen={isSidebarOpen}
        closeSidebar={closeSidebar}
        sidebarToggleRef={sidebarToggleRef}
        sidebarRef={sidebarRef}
        handleSmoothScroll={handleSmoothScroll}
        isNavMenuActive={isNavMenuActive}
        setIsNavMenuActive={setIsNavMenuActive}
        navMenuRef={navMenuRef}
        mobileToggleRef={mobileToggleRef}
        openSidebar={openSidebar}
      />
      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1>Hi, I'm Gautam Yedla</h1>
          <p className="subtitle">
            <Typewriter />
          </p>
          <p className="description">
            Passionate about creating innovative digital solutions that make a
            difference. Specializing in modern web technologies, machine
            learning, and scalable software architecture.
          </p>
          <div className="cta-buttons">
            <a
              href="#projects"
              className="btn-primary"
              onClick={(e) => handleSmoothScroll(e, "#projects")}
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="btn-secondary"
              onClick={(e) => handleSmoothScroll(e, "#contact")}
            >
              Contact Me
            </a>
            <a
              href="https://leetcode.com/u/Gautam_Yedla/"
              className="hero-link"
              target="_blank"
              rel="noopener noreferrer"
              title="LeetCode Profile"
            >
              🧮 LeetCode
            </a>
            <a
              href="https://drive.google.com/file/d/1yEYF9XbDQgvQ_HBojn5wJVtfOlQsXTAE/view?usp=sharing"
              className="hero-link"
              target="_blank"
              title="Download Resume"
            >
              📄 Resume
            </a>
          </div>
        </div>
        <div
          className="scroll-indicator"
          onClick={() =>
            document
              .getElementById("about")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          ↓
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">About</h2>
            <p className="section-subtitle">Getting to know me</p>
          </div>
          <div className="about-layout">
            <div className="about-sidebar">
              <div className="profile-card">
                <div className="profile-avatar">CS</div>
                <h3 className="profile-name">Computer Science Student</h3>
                <p className="profile-role">Final Year • Engineering</p>
                <div className="quick-stats">
                  <div className="stat-item">
                    <div className="stat-label">Status</div>
                    <div className="stat-value">Active Student</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-label">Focus</div>
                    <div className="stat-value">Full-Stack Development</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-label">Interests</div>
                    <div className="stat-value">AI & ML </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-label">Goal</div>
                    <div className="stat-value">Problem Solving</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-main">
              <div className="about-text">
                <p>
                  I'm a dedicated Computer Science Engineering student in my
                  final year, with a strong foundation in software development
                  and a passion for creating efficient, scalable solutions. My
                  journey in tech has been driven by curiosity and a desire to
                  solve real-world problems through code.
                </p>
                <p>
                  Currently maintaining good academic record while actively
                  working on personal projects and contributing to open-source
                  initiatives. I believe in continuous learning and staying
                  updated with the latest industry trends and technologies.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new frameworks,
                  participating in coding competitions & Hackathons.
                </p>
              </div>
              <div className="skills-section">
                <div className="skills-header">
                  <h3 className="skills-title">Technical Arsenal</h3>
                  <p className="skills-description">
                    Tools and technologies I work with
                  </p>
                </div>
                <div className="skills-grid">
                  <div className="skill-category">
                    <h3>Programming Languages</h3>
                    <ul className="skill-list">
                      <li>Python</li>
                      <li>Java</li>
                      <li>JavaScript</li>
                      <li>SQL</li>
                      <li>C/C++</li>
                    </ul>
                  </div>
                  <div className="skill-category">
                    <h3>Web Technologies</h3>
                    <ul className="skill-list">
                      <li>React.js</li>
                      <li>Node.js</li>
                      <li>Express.js</li>
                      <li>MongoDB</li>
                      <li>HTML &amp; CSS</li>
                    </ul>
                  </div>
                  <div className="skill-category">
                    <h3>Tools &amp; Frameworks</h3>
                    <ul className="skill-list">
                      <li>Git &amp; GitHub</li>
                      <li>Docker</li>
                      <li>Jenkins</li>
                      <li>Linux</li>
                      <li>VS Code</li>
                    </ul>
                  </div>
                  <div className="skill-category">
                    <h3>Core Subjects</h3>
                    <ul className="skill-list">
                      <li>Data Structures</li>
                      <li>Algorithms</li>
                      <li>Database Systems</li>
                      <li>Operating Systems</li>
                      <li>Computer Networks</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Projects Section */}
      <section id="projects" className="section">
        <Projects />
      </section>
      <Experience />
      <Services />
      <Contact />
      <Footer />
    </>
  );
};

export default App;
