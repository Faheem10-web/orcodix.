import React, { useState } from 'react'
import ParticleSphere from './components/ParticleSphere'
import './App.css'

const serviceCardsData = [
  {
    id: 'web-design',
    title: 'WEB DESIGN',
    desc: 'Designing modern, responsive websites that are visually striking and optimized.',
    link: '#services',
    icon: (
      <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="service-iso-icon">
        <path d="M12 11L36 5L42 17L18 23L12 11Z" />
        <path d="M12 11V33L36 39V17" />
        <path d="M42 17V39L36 39" />
        <path d="M18 23V35" />
        <line x1="15" y1="16" x2="17" y2="15.5" strokeWidth="2" />
        <line x1="21" y1="14.5" x2="27" y2="13" strokeWidth="2" />
        <rect x="22" y="24" width="10" height="9" strokeWidth="1.4" />
        <line x1="14" y1="26" x2="16" y2="26" strokeWidth="1.4" />
        <line x1="14" y1="29" x2="16" y2="29" strokeWidth="1.4" />
        <line x1="14" y1="32" x2="16" y2="32" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    id: 'development',
    title: 'DEVELOPMENT',
    desc: 'Bringing designs to life with clean, fast, and scalable code built for performance.',
    link: '#services',
    icon: (
      <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="service-iso-icon">
        <path d="M16 12L8 24L16 36" />
        <path d="M19 10L11 22L19 34" stroke="#ffffff" strokeWidth="1.2" opacity="0.4" />
        <path d="M28 8L20 40" strokeWidth="2.2" />
        <path d="M32 12L40 24L32 36" />
        <path d="M35 10L43 22L35 34" stroke="#ffffff" strokeWidth="1.2" opacity="0.4" />
      </svg>
    ),
  },
  {
    id: 'motion',
    title: 'MOTION',
    desc: 'Infusing motion and narrative through cinematic visuals and animation.',
    link: '#services',
    icon: (
      <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="service-iso-icon">
        <path d="M8 18L24 10L40 18V32L24 40L8 32V18Z" />
        <path d="M24 10V40" />
        <path d="M8 18L24 26L40 18" />
        <path d="M32 21L44 15V27L32 33V21Z" />
        <circle cx="38" cy="21" r="3" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'ecommerce',
    title: 'E-COMMERCE',
    desc: 'Building high-converting digital storefronts and scalable e-commerce systems.',
    link: '#services',
    icon: (
      <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="service-iso-icon">
        <path d="M10 14L24 6L38 14V34L24 42L10 34V14Z" />
        <path d="M24 6V42" />
        <path d="M10 14L24 22L38 14" />
        <path d="M18 25L24 29L30 25" strokeWidth="1.6" />
        <path d="M16 10L32 19" opacity="0.4" />
      </svg>
    ),
  },
]

const selectedWorkData = [
  {
    id: 'case-ai',
    num: '01',
    title: 'CASE',
    category: 'AI Platform & Web App',
    image: 'https://i.pinimg.com/1200x/fe/82/6c/fe826cbb2c342cd30c2567796282302b.jpg',
    caseStudyLink: '#work',
    livePreviewLink: '#work',
  },
  {
    id: 'aura',
    num: '04',
    title: 'AURA',
    category: 'Studio Website & Mobile App',
    image: 'https://i.pinimg.com/736x/20/2e/56/202e56956a1b96859a1a37b2cdd0a2cc.jpg',
    caseStudyLink: '#work',
    livePreviewLink: '#work',
  },
  {
    id: 'revana',
    num: '01',
    title: 'REVANA',
    category: 'Fashion E-Commerce',
    image: 'https://i.pinimg.com/736x/0f/ac/d5/0facd5f6729fa68df616c6d5a0165e60.jpg',
    caseStudyLink: '#work',
    livePreviewLink: '#work',
  },
  {
    id: 'nexus',
    num: '02',
    title: 'NEXUS',
    category: 'Modern Web Application',
    image: 'https://i.pinimg.com/1200x/4c/93/0b/4c930b7176db6669fcd2a32d3a60ff22.jpg',
    caseStudyLink: '#work',
    livePreviewLink: '#work',
  },
]

export default function App() {
  const [activeNav, setActiveNav] = useState('Home')

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Case Studies', href: '#work' },
    { label: 'Our Process', href: '#services' },
  ]

  return (
    <div className="app-viewport">
      {/* 1. HERO SECTION */}
      <div className="hero-viewport-card" id="home">
        
        {/* Atmospheric Deep Black & Orange Ambient Layer */}
        <div className="hero-atmosphere-bg" aria-hidden="true">
          <div className="bg-subtle-grid" />
          <div className="bg-glow-orange-right" />
          <div className="bg-glow-orange-top" />
          <div className="bg-vignette" />
        </div>

        {/* Floating Glass Pill Navbar */}
        <header className="hero-nav-bar glass-pill-nav">
          <div className="nav-left">
            <a href="#" className="brand-logo-wrap" aria-label="ORCODIX">
              <img src="/assets/logo.png" alt="ORCODIX" className="brand-logo-img" />
            </a>
          </div>

          <nav className="nav-center-menu">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`nav-menu-link ${activeNav === item.label ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  setActiveNav(item.label)
                  const target = document.querySelector(item.href)
                  if (target) target.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="nav-right">
            <a href="#quote" className="btn-get-estimate pill-btn">
              <span>Contact Us</span>
            </a>
          </div>
        </header>

        {/* Hero Main Body: 2 Columns */}
        <div className="hero-grid-body">
          {/* Left Column: Typography & CTAs (100% Screenshot Model Match) */}
          <div className="hero-left-column">
            {/* Top Eyebrow Bar */}
            <div className="hero-eyebrow-bar">
              <span className="eyebrow-dash-line" />
              <span className="eyebrow-accent">LATE NIGHT</span>
              <span className="eyebrow-separator">—</span>
              <span className="eyebrow-slogan">THE BEST BRANDS LAUNCH WHEN NO ONE’S WATCHING</span>
            </div>

            {/* 3-Row Signature Headline */}
            <h1 className="hero-heading-showcase">
              {/* Row 1: Outline Serif */}
              <span className="heading-row-outline">WE BRING</span>
              
              {/* Row 2: Brand Orange Bold Sans */}
              <span className="heading-row-brand">GROWTH</span>
              
              {/* Row 3: Solid White Heavy Sans */}
              <span className="heading-row-solid">TO BRANDS</span>
            </h1>

            {/* Subtitle / Description */}
            <p className="hero-description-showcase">
              We don’t just do marketing — we redefine it.<br />
              AI strategies. Licensed experts. Real results.
            </p>

            {/* Action Buttons */}
            <div className="hero-cta-showcase">
              <a href="#quote" className="btn-hero-brand-pill">
                <span>START YOUR PROJECT</span>
                <span className="btn-arrow-right">→</span>
              </a>

              <a href="#work" className="btn-hero-link-underline">
                <span>SEE WORK</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive 3D Particle Sphere */}
          <div className="hero-right-column">
            <ParticleSphere />
          </div>
        </div>

        {/* Hero Bottom Bar Info */}
        <footer className="hero-bottom-footer">
          <div className="footer-scroll-hint">
            <span>Scroll for more</span>
            <span className="footer-down-arrow">↓</span>
          </div>

          <div className="footer-est">
            <span>Est. In 2026</span>
          </div>
        </footer>

      </div>

      {/* 2. DARK SERVICES CARDS SECTION (100% MATCHING MODEL) */}
      <section className="showcase-capabilities-section" id="services">
        
        {/* Dark Obsidian Service Cards Grid (100% Model Match) */}
        <div className="dark-services-section-wrap">
          <div className="dark-services-grid">
            {serviceCardsData.map((service) => (
              <div key={service.id} className="dark-service-card">
                {/* Top Isometric 3D Icon */}
                <div className="dark-service-icon-wrap">
                  {service.icon}
                </div>

                {/* Service Title */}
                <h3 className="dark-service-title">{service.title}</h3>

                {/* Service Description */}
                <p className="dark-service-desc">{service.desc}</p>

                {/* Bottom Learn More Action */}
                <a href={service.link} className="dark-service-learn-more">
                  <span>LEARN MORE</span>
                </a>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* 3. SELECTED WORK SECTION (100% SCREENSHOT MATCH - SEAMLESS CONTINUOUS SCROLL) */}
      <section className="selected-work-section" id="work">
        <div className="selected-work-header-wrap">
          <h2 className="selected-work-main-title">Selected work</h2>
        </div>

        {/* Continuous Auto-Scrolling Marquee Viewport */}
        <div className="selected-work-marquee-viewport">
          <div className="selected-work-marquee-track">
            {/* Group 1 */}
            <div className="selected-work-marquee-group">
              {[...selectedWorkData, ...selectedWorkData].map((item, idx) => (
                <div key={`g1-${item.id}-${idx}`} className="work-showcase-card">
                  <div className="work-card-media">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="work-card-img"
                      loading="lazy"
                    />
                    <div className="work-card-overlay" />
                  </div>

                  <div className="work-card-bottom-bar">
                    <div className="work-card-info">
                      <span className="work-item-num">{item.num} —</span>
                      <h3 className="work-item-title">{item.title}</h3>
                    </div>

                    <div className="work-card-actions">
                      <a href={item.caseStudyLink} className="work-action-btn btn-case-study">
                        <span>Case Study</span>
                      </a>
                      <a href={item.livePreviewLink} className="work-action-btn btn-live-preview">
                        <span>Live Preview</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Group 2 (Exact mirror duplicate for 100% seamless loop with zero gap) */}
            <div className="selected-work-marquee-group" aria-hidden="true">
              {[...selectedWorkData, ...selectedWorkData].map((item, idx) => (
                <div key={`g2-${item.id}-${idx}`} className="work-showcase-card">
                  <div className="work-card-media">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="work-card-img"
                      loading="lazy"
                    />
                    <div className="work-card-overlay" />
                  </div>

                  <div className="work-card-bottom-bar">
                    <div className="work-card-info">
                      <span className="work-item-num">{item.num} —</span>
                      <h3 className="work-item-title">{item.title}</h3>
                    </div>

                    <div className="work-card-actions">
                      <a href={item.caseStudyLink} className="work-action-btn btn-case-study">
                        <span>Case Study</span>
                      </a>
                      <a href={item.livePreviewLink} className="work-action-btn btn-live-preview">
                        <span>Live Preview</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Floating 'Chat with us' Pill Widget (100% Screenshot Model Match) */}
      <a href="#quote" className="floating-chat-pill" aria-label="Chat with us">
        <div className="chat-pill-icon-circle">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </div>
        <span className="chat-pill-text">Chat with us</span>
      </a>
    </div>
  )
}
