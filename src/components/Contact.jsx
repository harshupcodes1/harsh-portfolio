import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
 

gsap.registerPlugin(ScrollTrigger);

// ✅ BACKEND URL (FROM ENV)
const API_URL = "https://harsh-portfolio-backend-8h4u.onrender.com";

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

  // ✅ FINAL SUBMIT HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert(data.message || "❌ Email failed");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Server error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-muted-foreground">
            Have a project in mind? Let’s work together.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* INFO */}
          <div className="space-y-6">
            <div className="glass-card p-6 flex gap-4 items-center">
              <EnvelopeSimple size={24} />
              <span>upadhyayharsh622@gmail.com</span>
            </div>

            <div className="glass-card p-6 flex gap-4 items-center">
              <MapPin size={24} />
              <span>Ahmedabad, Gujarat, India</span>
            </div>

            <div ref={socialRef} className="flex gap-4">
              <a
                href="https://github.com/harshupcodes1"
                target="_blank"
                rel="noreferrer"
              >
                <GithubLogo size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/upadhyay-harsh11"
                target="_blank"
                rel="noreferrer"
              >
                <LinkedinLogo size={24} />
              </a>
            </div>
          </div>

          {/* FORM */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="form-input">
              <input
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="glass-input w-full px-6 py-4 rounded-xl"
              />
            </div>

            <div className="form-input">
              <input
                name="email"
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="glass-input w-full px-6 py-4 rounded-xl"
              />
            </div>

            <div className="form-input">
              <textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="glass-input w-full px-6 py-4 rounded-xl resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-hero w-full flex justify-center gap-2"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
              <PaperPlaneTilt size={20} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
