import { useState, useRef, useLayoutEffect} from 'react';
import { gsap } from 'gsap';
import GameCard from '../GameCard';
import { Link } from 'react-router-dom';

const TopNav = () => {
  const [activeSection, setActiveSection] = useState('Mini Games');
  const contentRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const gsapCtx = useRef<ReturnType<typeof gsap.context> | null>(null);
  const animationTimeline = useRef<gsap.core.Timeline | null>(null); // Reusing timeline

  useLayoutEffect(() => {
    gsapCtx.current = gsap.context(() => {}, contentRef);
    
    // Initialize the timeline
    animationTimeline.current = gsap.timeline({ paused: true });

    return () => {
      gsapCtx.current?.revert();
      animationTimeline.current?.kill(); // Clean up timeline on unmount
    };
  }, []);

  const handleSectionClick = (section: string) => {
    if (contentRef.current && animationTimeline.current) {
      // Pause current animation if running
      animationTimeline.current.clear();
      
      animationTimeline.current
        .to(contentRef.current, {
          x: '-100%',
          autoAlpha: 0, // Optimized opacity/visibility handling
          duration: 0.3,
          ease: 'power2.out',
          onComplete: () => setActiveSection(section), // Update content once animation is out
        })
        .set(contentRef.current, { x: '100%', autoAlpha: 0 }) // Reset to the start position
        .to(contentRef.current, {
          x: '0%',
          autoAlpha: 1,
          duration: 0.4,
          ease: 'power2.inOut',
        })
        .play(); // Play the animation
    }

    // Animate the active section background
    if (navRef.current) {
      const navItems = navRef.current.querySelectorAll('.nav-item');

      // Batch animation to prevent multiple reflows
      gsap.to(navItems, {
        backgroundColor: '#1f2937', // Default inactive background
        duration: 0.4,
        overwrite: 'auto', // Prevent overwriting previous animations
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
            {/* <div className="grid grid-cols-2 gap-4">
              <GameCard name="Coming Soon" fee={100} src={src} />
              <GameCard name="Coming Soon" fee={100} src={src} />
            </div> */}
            <div className='w-full p-4 flex flex-col gap-4 text-slate-400'>
              <div className="text-2xl font-[ageobold]">Coming Soon</div>
              <div className="text-lg">Stay Tuned for more updates</div>
            </div>
          </div>
        )}
        {activeSection === 'Mini Games' && (
          <div className="w-full h-fit p-1 mt-4 overflow-y-scroll">
            <div className="grid grid-cols-2 gap-4">
              <Link to="/game/rps">
                <GameCard name="Rock Paper Scissor" fee={100} src="/images/03.jpg" />
              </Link>
              <Link to="/game/mine">
                <GameCard name="Mine Escape" fee={10} src="/images/02.jpg" />
              </Link>
            </div>
          </div>
        )}
        {activeSection === 'Fantasy' && (
          <div className="w-full h-fit p-1 mt-4 overflow-y-scroll">
            <div className="grid grid-cols-2 gap-4">
              <Link to="/game/slot">
                <GameCard name="Slot Machine" fee={1000} src="/images/slot.png" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TopNav;
