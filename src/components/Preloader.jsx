import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Preloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);
  const progressBarRef = useRef(null);
  const textRef = useRef(null);
  const percentRef = useRef(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate text entrance
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 30, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' }
    );

    // Animate progress bar
    tl.to(progressBarRef.current, {
      width: '100%',
      duration: 2.5,
      ease: 'power2.out',
      onUpdate: function () {
        const progress = Math.round(this.progress() * 100);
        setPercent(progress);
      },
    });

    // Fade out preloader
    tl.to(preloaderRef.current, {
      opacity: 0,
      scale: 0.95,
      filter: 'blur(10px)',
      duration: 0.8,
      ease: 'power3.inOut',
      onComplete: () => {
        if (preloaderRef.current) {
          preloaderRef.current.style.display = 'none';
        }
        onComplete && onComplete();
      },
    });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div ref={preloaderRef} className="preloader">
      {/* Background orbs */}
      <div className="floating-orb w-64 h-64 bg-neon-cyan/20 top-1/4 left-1/4" />
      <div className="floating-orb w-48 h-48 bg-neon-purple/20 bottom-1/4 right-1/4" />

      {/* Loader content */}
      <div ref={textRef} className="text-center">
        <h1 className="text-6xl md:text-8xl font-bold gradient-text tracking-tight">
          Harsh
        </h1>
        <p className="text-muted-foreground mt-4 text-lg tracking-widest uppercase">
          Developer Portfolio
        </p>
      </div>

      {/* Progress bar */}
      <div className="progress-bar-container mt-8">
        <div ref={progressBarRef} className="progress-bar" />
      </div>

      {/* Percentage */}
      <p ref={percentRef} className="text-primary mt-4 text-2xl font-light tracking-wider">
        {percent}%
      </p>
    </div>
  );
};

export default Preloader;
