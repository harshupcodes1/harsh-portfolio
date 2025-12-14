import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FileHtml,
  FileCss,
  FileJs,
  Database,
  Code,
  Globe,
} from '@phosphor-icons/react';
import profileImage from '@/assets/harsh-profile.jpeg';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'HTML', icon: FileHtml },
  { name: 'CSS', icon: FileCss },
  { name: 'JavaScript', icon: FileJs },
  { name: 'Node.js', icon: Code },
  { name: 'Express.js', icon: Globe },
  { name: 'MySQL', icon: Database },
];

const About = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const skillsRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    // Section fade in
    gsap.fromTo(
      section,
      { opacity: 0, filter: 'blur(20px)' },
      {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Image animation
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, x: -80, rotate: -5 },
      {
        opacity: 1,
        x: 0,
        rotate: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Content animation
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, x: 80 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Skills stagger animation
    const skillItems = skillsRef.current?.children;
    if (skillItems) {
      gsap.fromTo(
        skillItems,
        { opacity: 0, y: 30, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background orbs */}
      <div className="floating-orb w-80 h-80 bg-neon-purple/10 top-20 -right-20" />
      <div className="floating-orb w-64 h-64 bg-neon-cyan/10 bottom-20 -left-20" />

      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">About </span>
            <span className="gradient-text">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="flex justify-center">
            <div className="relative group">
              <div className="profile-glow w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden">
                <img
                  src={profileImage}
                  alt="Harsh Upadhyay"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 glass-card px-4 py-2 glow-cyan">
                <span className="text-primary font-semibold">B.Tech CSE</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-6">
            <h3 className="text-3xl font-bold text-foreground">
              Upadhyay Harsh Sanjaykumar
            </h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              I am a Computer Science student with skills in Node.js and Express.js
              for backend development, along with experience in API integration. I also
              have basic knowledge of Python and Java. I enjoy learning new technologies,
              building projects, and applying my skills to create practical software and web solutions.
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 glass-card text-sm text-primary">
                Ahmedabad, Gujarat
              </span>
              <span className="px-4 py-2 glass-card text-sm text-secondary">
                Parul University
              </span>
            </div>

            {/* Skills Grid */}
            <div ref={skillsRef} className="grid grid-cols-3 sm:grid-cols-6 gap-4 pt-6">
              {skills.map((skill) => (
                <div key={skill.name} className="skill-icon flex-col gap-2">
                  <skill.icon size={32} weight="light" className="text-primary" />
                  <span className="text-xs text-muted-foreground">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
