import { useEffect, useRef } from "react";
import gsap from "gsap";

const Hero = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const splineRef = useRef(null);
  const orbsRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 3.3 });

    // Headline animation
    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 60, filter: "blur(15px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power3.out" }
    );

    // Subtitle animation
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 40, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out" },
      "-=0.6"
    );

    // CTA animation
    tl.fromTo(
      ctaRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.4"
    );

    // Spline fade in
    tl.fromTo(
      splineRef.current,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" },
      "-=1"
    );

    // Floating orbs animation
    orbsRef.current.forEach((orb, i) => {
      gsap.to(orb, {
        y: -30,
        duration: 3 + i * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    });

    return () => tl.kill();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background orbs */}
      <div
        ref={(el) => (orbsRef.current[0] = el)}
        className="floating-orb w-96 h-96 bg-neon-cyan/15 -top-20 -left-20"
      />
      <div
        ref={(el) => (orbsRef.current[1] = el)}
        className="floating-orb w-72 h-72 bg-neon-purple/20 top-1/3 right-1/4"
      />
      <div
        ref={(el) => (orbsRef.current[2] = el)}
        className="floating-orb w-64 h-64 bg-neon-pink/15 bottom-20 left-1/3"
      />

      {/* Spline 3D Background with Overlay */}
      <div ref={splineRef} className="absolute inset-0 z-0">
        <iframe
          src="https://my.spline.design/orb-2Q7Eob0EX3Nv1eS1MlowLhTb/"
          frameBorder="0"
          width="100%"
          height="100%"
          className="opacity-60"
          title="3D Orb"
        />

        {/* Overlay to hide Spline watermark */}
        <div className="absolute inset-0 spline-overlay pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <h1
          ref={headlineRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
        >
          <span className="text-foreground">Hi, I'm </span>
          <span className="gradient-text text-glow-cyan">Harsh</span>
          <br />
          <span className="text-foreground/80 text-4xl md:text-5xl lg:text-6xl font-light">
            Full-Stack Developer
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-light leading-relaxed"
        >
          Crafting modern web experiences with Node.js, Express, and cutting-edge
          technologies. Passionate about building scalable solutions and
          exploring new frontiers in tech.
        </p>

        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a href="#contact" className="btn-hero animate-glow">
            <span>Hire Me</span>
          </a>
          <a
            href="#projects"
            className="px-8 py-4 rounded-full border border-foreground/20 text-foreground font-medium hover:border-primary hover:text-primary transition-all duration-300"
          >
            View Projects
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">
          Scroll
        </span>
        <div className="w-6 h-10 rounded-full border border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
