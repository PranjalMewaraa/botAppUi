import { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import GameCard from '../GameCard';
import { Link } from 'react-router-dom';

const TopNav = () => {
  const [activeSection, setActiveSection] = useState('Mini Games');
  const contentRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const gsapCtx = useRef<ReturnType<typeof gsap.context> | null>(null);

  useLayoutEffect(() => {
    gsapCtx.current = gsap.context(() => {}, contentRef);
    return () => {
      gsapCtx.current?.revert(); // Clean up animations on unmount
    };
  }, []);

  const handleSectionClick = (section: string) => {
    if (contentRef.current) {
      const tl = gsap.timeline();

      tl.to(contentRef.current, {
        x: '-100%',
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => {
          setActiveSection(section);
        },
      })
        .set(contentRef.current, { x: '100%', opacity: 0 }) // Reset to start position
        .to(contentRef.current, {
          x: '0%',
          opacity: 1,
          duration: 0.4,
          ease: 'power2.inOut',
        });
    }

    // Animate the active section background
    if (navRef.current) {
      gsap.to(navRef.current.querySelectorAll('.nav-item'), {
        backgroundColor: '#1f2937', // Default inactive background
        duration: 0.4,
      });

      gsap.to(navRef.current.querySelector(`.nav-item[data-section="${section}"]`), {
        backgroundColor: '#2d3748', // Active section background
        duration: 0.4,
      });
    }
  };

  return (
    <>
      <div
        ref={navRef}
        className="h-16 w-full p-2 flex bg-slate-800 rounded-xl gap-2"
      >
        {['Mini Games', 'Games', 'Fantasy'].map((section) => (
          <div
            key={section}
            data-section={section}
            className={`nav-item h-full w-1/3 text-white font-semibold flex justify-center items-center cursor-pointer ${
              activeSection === section ? 'bg-slate-700 rounded-lg' : ''
            }`}
            onClick={() => handleSectionClick(section)}
          >
            {section}
          </div>
        ))}
      </div>
      <div ref={contentRef} className="h-20 w-full transition-all duration-300">
        {activeSection === 'Games' && (
          <div className="w-full h-fit p-1 mt-4 overflow-y-scroll">
            <div className="grid grid-cols-2 gap-4">
             
                <GameCard name={"Coming Soon"} fee={100} />
                <GameCard name={"Coming Soon"} fee={100} />
            
            </div>
          </div>
        )}
        {activeSection === 'Mini Games' && <div className="w-full h-fit p-1 mt-4 overflow-y-scroll">
              <div className="grid grid-cols-2 gap-4">
                <Link to={'/game/rps'}>
                  <GameCard name={"Rock Paper Scissor"} fee={100} />
                </Link>
                <Link to={'/game/mine'}>
                  <GameCard name={"Mine Escape"} fee={10} />
                </Link>
              </div>
            </div>
          }
        {activeSection === 'Fantasy' && <div className="w-full h-fit p-1 mt-4 overflow-y-scroll">
            <div className="grid grid-cols-2 gap-4">
             
                <GameCard name={"Coming Soon"} fee={100} />
                <GameCard name={"Coming Soon"} fee={100} />
            
            </div>
          </div>}
      </div>
    </>
  );
};

export default TopNav;
