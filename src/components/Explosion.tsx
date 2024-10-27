// src/components/Explosion.tsx
import React from 'react';
import gsap from 'gsap';

const Explosion: React.FC<{ onAnimationComplete: () => void }> = ({ onAnimationComplete }) => {
  React.useEffect(() => {
    const tl = gsap.timeline({ onComplete: onAnimationComplete });
    tl.to('.explosion', {
      scale: 2,
      repeat:2,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  }, [onAnimationComplete]);

  return (
    <div className="explosion absolute inset-0 flex justify-center items-center">
      <div className="bg-yellow-500 rounded-full h-32 w-32 animate-ping"></div>
      <div className="bg-yellow-400 rounded-full h-24 w-24"></div>
      <div className="bg-yellow-300 rounded-full h-16 w-16"></div>
    </div>
  );
};

export default Explosion;
