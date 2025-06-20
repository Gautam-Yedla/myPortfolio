import React from "react";

const Services = () => (
  <section id="services" className="section">
    <h2 className="section-title">Services</h2>
    <div className="services-grid">
      <div className="service-card">
        <div className="service-icon">💻</div>
        <div className="service-title">Web Development</div>
        <div className="service-description">
          Building responsive and scalable web applications using modern
          frameworks and best practices.
        </div>
      </div>
      <div className="service-card">
        <div className="service-icon">🧠</div>
        <div className="service-title">Machine Learning</div>
        <div className="service-description">
          Designing and deploying machine learning models for data-driven
          solutions and analytics.
        </div>
      </div>
      <div className="service-card">
        <div className="service-icon">🔧</div>
        <div className="service-title">API Integration</div>
        <div className="service-description">
          Integrating third-party APIs for robust backend services and
          seamless connectivity.
        </div>
      </div>
    </div>
  </section>
);

export default Services;
