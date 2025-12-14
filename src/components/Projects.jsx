import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Radio, ShoppingCart, Code, Cpu, Globe, Database } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Off-Grid RF Communication',
    description: 'A LoRa-based communication system enabling off-grid messaging through RF technology. Built for emergency and remote communication scenarios.',
    tech: ['LoRa', 'RF', 'IoT', 'Embedded'],
    icon: Radio,
    color: 'neon-cyan',
    link: 'https://drive.google.com/file/d/1bwAwLWRhuspVGNyc6vb4J3Y793M28BEp/view',
  },
  {
    title: 'Online Shopping Website',
    description: 'A full-featured e-commerce platform with product catalog, cart functionality, and secure checkout process.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
    icon: ShoppingCart,
    color: 'neon-purple',
    link: 'https://drive.google.com/file/d/1QvVAXgEarfbhhKrqW4EtDGr68BCVExdR/view',
  },
  {
    title: 'API Integration Hub',
    description: 'A centralized platform for managing and integrating multiple third-party APIs with robust error handling.',
    tech: ['Express.js', 'REST API', 'MySQL'],
    icon: Code,
    color: 'neon-pink',
  },
  {
    title: 'Real-time Dashboard',
    description: 'Interactive data visualization dashboard with real-time updates and customizable widgets for monitoring.',
    tech: ['JavaScript', 'WebSocket', 'Chart.js'],
    icon: Cpu,
    color: 'neon-cyan',
  },
  {
    title: 'Portfolio Generator',
    description: 'Dynamic portfolio website generator that creates stunning developer portfolios from simple configurations.',
    tech: ['Node.js', 'Express', 'CSS3'],
    icon: Globe,
    color: 'neon-purple',
  },
  {
    title: 'Database Manager',
    description: 'A comprehensive MySQL database management tool with visual query builder and schema designer.',
    tech: ['MySQL', 'Node.js', 'Express.js'],
    icon: Database,
    color: 'neon-pink',
  },
];

const Projects = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    // Title animation
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
        },
      }
    );

    // Cards animation
    const cards = cardsRef.current?.children;
    if (cards) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          },
        }
      );
    }
  }, []);

  const getColorClass = (color) => {
    switch (color) {
      case 'neon-cyan':
        return 'text-neon-cyan glow-cyan';
      case 'neon-purple':
        return 'text-neon-purple glow-purple';
      case 'neon-pink':
        return 'text-neon-pink glow-pink';
      default:
        return 'text-primary';
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background orbs */}
      <div className="floating-orb w-96 h-96 bg-neon-pink/10 top-1/4 -left-32" />
      <div className="floating-orb w-72 h-72 bg-neon-cyan/10 bottom-1/4 -right-20" />

      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">My </span>
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of my work, from IoT solutions to web applications
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-4" />
        </div>

        {/* Projects Grid - Horizontal scroll on mobile */}
        <div
          ref={cardsRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible"
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card flex-shrink-0 snap-center group cursor-pointer"
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 glass-card ${getColorClass(
                  project.color
                )}`}
              >
                <project.icon size={28} weight="light" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* CTA */}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all"
                >
                  View Project
                  <ArrowRight size={16} weight="bold" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
