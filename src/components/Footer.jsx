import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, GithubLogo, LinkedinLogo, EnvelopeSimple } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const contentRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    // Footer fade in
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 60, filter: 'blur(10px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
        },
      }
    );

    // Floating particles
    particlesRef.current.forEach((particle, i) => {
      if (particle) {
        gsap.to(particle, {
          y: -30 - Math.random() * 20,
          x: (Math.random() - 0.5) * 30,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: i * 0.2,
        });
      }
    });
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative py-16 px-6 border-t border-border overflow-hidden"
    >
      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (particlesRef.current[i] = el)}
          className="absolute w-2 h-2 rounded-full bg-primary/30"
          style={{
            left: `${10 + i * 12}%`,
            bottom: `${20 + (i % 3) * 20}%`,
          }}
        />
      ))}

      {/* Background orbs */}
      <div className="floating-orb w-48 h-48 bg-neon-purple/5 bottom-0 left-1/4" />
      <div className="floating-orb w-32 h-32 bg-neon-cyan/5 bottom-10 right-1/3" />

      <div ref={contentRef} className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <a href="#home" className="text-3xl font-bold gradient-text">
              Harsh<span className="text-primary">.</span>
            </a>
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
              Full-Stack Developer crafting modern web experiences with passion and precision.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {['Home', 'About', 'Projects', 'Contact'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Connect</h4>
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass-card rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:glow-cyan transition-all"
              >
                <GithubLogo size={20} weight="light" />
              </a>
              <a
                href="https://www.linkedin.com/in/upadhyay-harsh11"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass-card rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:glow-cyan transition-all"
              >
                <LinkedinLogo size={20} weight="light" />
              </a>
              <a
                href="mailto:harshupadhaya007@gmail.com"
                className="w-10 h-10 glass-card rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:glow-cyan transition-all"
              >
                <EnvelopeSimple size={20} weight="light" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border/50 text-center">
          <p className="text-muted-foreground text-sm flex items-center justify-center gap-2">
            Made by Harsh Upadhyay
          </p>
          <p className="text-muted-foreground/50 text-xs mt-2">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
