import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { List, X } from '@phosphor-icons/react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const navRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 3.5 }
    );
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { x: '100%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.5, ease: 'power3.out' }
      );
    }
  }, [isOpen]);

  const handleClose = () => {
    gsap.to(mobileMenuRef.current, {
      x: '100%',
      opacity: 0,
      duration: 0.4,
      ease: 'power3.in',
      onComplete: () => setIsOpen(false),
    });
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between glass-card px-6 py-3">
          {/* Logo */}
          <a href="#home" className="text-2xl font-bold gradient-text">
            Harsh<span className="text-primary">.</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="nav-link text-sm uppercase tracking-wider">
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href="#contact"
            className="hidden md:block px-6 py-2 rounded-full border border-primary/50 text-primary text-sm uppercase tracking-wider hover:bg-primary/10 transition-all duration-300"
          >
            Hire Me
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden text-foreground p-2"
          >
            <List size={28} weight="light" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center"
        >
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 text-foreground p-2"
          >
            <X size={32} weight="light" />
          </button>

          <div className="flex flex-col items-center gap-8">
            {navLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleClose}
                className="text-3xl font-light text-foreground hover:text-primary transition-colors"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={handleClose}
              className="mt-8 btn-hero"
            >
              <span>Hire Me</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
