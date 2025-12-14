import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  PaperPlaneTilt,
  GithubLogo,
  LinkedinLogo,
  WhatsappLogo,
  EnvelopeSimple,
  MapPin,
} from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const titleRef = useRef(null);
  const socialRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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
          start: "top 85%",
        },
      }
    );

    // Form inputs animation
    const inputs = formRef.current?.querySelectorAll(".form-input");
    if (inputs) {
      gsap.fromTo(
        inputs,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // Social icons animation
    const socials = socialRef.current?.children;
    if (socials) {
      gsap.fromTo(
        socials,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: socialRef.current,
            start: "top 90%",
          },
        }
      );
    }
  }, []);

  // 🔥 BACKEND CONNECTED SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const btn = e.target.querySelector('button[type="submit"]');
    gsap.to(btn, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });

    try {
      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Failed to send message!");
      }
    } catch (error) {
      console.error(error);
      alert("Server error. Please try again.");
    }

    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background orbs */}
      <div className="floating-orb w-80 h-80 bg-neon-purple/10 top-20 -left-20" />
      <div className="floating-orb w-64 h-64 bg-neon-cyan/10 bottom-20 -right-20" />

      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Get In </span>
            <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Have a project in mind? Let's work together to bring your ideas to
            life.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="glass-card p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl glass-card flex items-center justify-center glow-cyan">
                  <EnvelopeSimple size={24} weight="light" className="text-primary" />
                </div>
                <div>
                  <h4 className="text-foreground font-medium">Email</h4>
                  <a
                    href="mailto:harshupadhaya007@gmail.com"
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                  >
                    harshupadhaya007@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl glass-card flex items-center justify-center glow-purple">
                  <MapPin size={24} weight="light" className="text-secondary" />
                </div>
                <div>
                  <h4 className="text-foreground font-medium">Location</h4>
                  <p className="text-muted-foreground text-sm">
                    Ahmedabad, Gujarat, India
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div ref={socialRef} className="flex gap-4 pt-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 glass-card rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:glow-cyan transition-all duration-300"
              >
                <GithubLogo size={24} weight="light" />
              </a>
              <a
                href="https://www.linkedin.com/in/upadhyay-harsh11"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 glass-card rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:glow-cyan transition-all duration-300"
              >
                <LinkedinLogo size={24} weight="light" />
              </a>
              
            </div>
          </div>

          {/* Contact Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="form-input">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full px-6 py-4 glass-input rounded-xl text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="form-input">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full px-6 py-4 glass-input rounded-xl text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="form-input">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                rows={5}
                className="w-full px-6 py-4 glass-input rounded-xl text-foreground placeholder:text-muted-foreground resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-hero flex items-center justify-center gap-3 disabled:opacity-50"
            >
              <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
              <PaperPlaneTilt size={20} weight="bold" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
