import React, { useState, useEffect } from "react";

const Navbar = ({
  scrollProgress,
  isBackToTopVisible,
  scrollToTop,
  isSidebarOpen,
  closeSidebar,
  sidebarToggleRef,
  sidebarRef,
  handleSmoothScroll,
  isNavMenuActive,
  setIsNavMenuActive,
  navMenuRef,
  mobileToggleRef,
  openSidebar,
}) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [activeSection, setActiveSection] = useState("home");

  // Theme toggle
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Mobile nav toggle
  const toggleNavMenu = () => {
    setIsNavMenuActive(!isNavMenuActive);
  };

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

  // Active section highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (
          window.pageYOffset >= sectionTop &&
          window.pageYOffset < sectionTop + sectionHeight
        ) {
          current = section.getAttribute("id");
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === "Escape") {
        setIsNavMenuActive(false);
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress"
        id="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* Back to Top Button */}
      <button
        className={`back-to-top ${isBackToTopVisible ? "visible" : ""}`}
        id="back-to-top"
        aria-label="Back to top"
        onClick={scrollToTop}
      >
        ↑
      </button>

      {/* Overlay */}
      <div
        className={`overlay ${isSidebarOpen ? "active" : ""}`}
        id="overlay"
        onClick={closeSidebar}
      ></div>

      {/* Sidebar */}
      <div className="sidebar-container">
        <button
          className="sidebar-toggle"
          id="sidebarToggle"
          ref={sidebarToggleRef}
          onClick={openSidebar}
        >
          CONNECT
        </button>
        <div
          className={`sidebar ${isSidebarOpen ? "open" : ""}`}
          id="sidebar"
          ref={sidebarRef}
        >
          <div className="sidebar-header">SOCIAL LINKS</div>
          <div className="social-links">
            <a
              href="https://linkedin.com/in/yourprofile"
              className="social-link"
              target="_blank"
              rel="noopener"
            >
              <svg className="social-icon" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="social-text">LinkedIn</span>
            </a>
            <a
              href="https://github.com/yourusername"
              className="social-link"
              target="_blank"
              rel="noopener"
            >
              <svg className="social-icon" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="social-text">GitHub</span>
            </a>
            <a
              href="https://leetcode.com/yourusername"
              className="social-link"
              target="_blank"
              rel="noopener"
            >
              <svg className="social-icon" viewBox="0 0 24 24">
                <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.805 2.143 8.029-.068l2.68-2.681-.548-.547-2.19 2.183a4.613 4.613 0 0 1-3.2 1.308 4.502 4.502 0 0 1-3.12-1.248L7.116 15.774a2.732 2.732 0 0 1-.319-.31 2.718 2.718 0 0 1-.648-1.617 2.69 2.69 0 0 1-.064-1.113A2.65 2.65 0 0 1 6.8 11.608l3.854-4.126a2.552 2.552 0 0 1 1.869-.608 2.401 2.401 0 0 1 1.708.729 2.439 2.439 0 0 1 .537 1.187c.078.29.13.594.13.902a2.51 2.51 0 0 1-.35 1.299c-.148.26-.346.524-.555.738L9.716 15.05l-.939.912 4.125 4.082c1.771 1.803 4.63 1.804 6.378 0l2.682-2.681c1.742-1.777 1.742-4.601 0-6.378L13.483.438A1.374 1.374 0 0 0 13.483 0z" />
              </svg>
              <span className="social-text">LeetCode</span>
            </a>
            <a href="mailto:your.email@example.com" className="social-link">
              <svg className="social-icon" viewBox="0 0 24 24">
                <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
              </svg>
              <span className="social-text">Email</span>
            </a>
            <a
              href="https://twitter.com/yourusername"
              className="social-link"
              target="_blank"
              rel="noopener"
            >
              <svg className="social-icon" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
              <span className="social-text">Twitter</span>
            </a>
            <a
              href="https://yourportfolio.com"
              className="social-link"
              target="_blank"
              rel="noopener"
            >
              <svg className="social-icon" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 17.93c-3.94-.494-7-3.858-7-7.93s3.06-7.436 7-7.93v15.86zm2-15.86c3.94.494 7 3.858 7 7.93s-3.06 7.436-7 7.93V4.07z" />
              </svg>
              <span className="social-text">Portfolio</span>
            </a>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="navbar" id="navbar">
        <div className="nav-container">
          <button
            className="theme-toggle"
            id="theme-toggle"
            aria-label="Toggle theme"
            onClick={toggleTheme}
          >
            <svg
              className="sun-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.36" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <svg
              className="moon-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>

          <ul
            className={`nav-menu ${isNavMenuActive ? "active" : ""}`}
            id="nav-menu"
            ref={navMenuRef}
          >
            <li className="nav-item">
              <a
                href="#home"
                className={`nav-link ${
                  activeSection === "home" ? "active" : ""
                }`}
                onClick={(e) => handleSmoothScroll(e, "#home")}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#about"
                className={`nav-link ${
                  activeSection === "about" ? "active" : ""
                }`}
                onClick={(e) => handleSmoothScroll(e, "#about")}
              >
                About
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#projects"
                className={`nav-link ${
                  activeSection === "projects" ? "active" : ""
                }`}
                onClick={(e) => handleSmoothScroll(e, "#projects")}
              >
                Projects
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#experience"
                className={`nav-link ${
                  activeSection === "experience" ? "active" : ""
                }`}
                onClick={(e) => handleSmoothScroll(e, "#experience")}
              >
                Experience
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#services"
                className={`nav-link ${
                  activeSection === "services" ? "active" : ""
                }`}
                onClick={(e) => handleSmoothScroll(e, "#services")}
              >
                Services
              </a>
            </li>
          </ul>

          <a
            href="#contact"
            className="contact-btn"
            onClick={(e) => handleSmoothScroll(e, "#contact")}
          >
            Contact
          </a>

          <div
            id="mobile-toggle"
            ref={mobileToggleRef}
            onClick={toggleNavMenu}
            className={`mobile-toggle ${isNavMenuActive ? "active" : ""}`}
          >
            <span></span>
            <span></span>
            <span className="mobile"></span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
