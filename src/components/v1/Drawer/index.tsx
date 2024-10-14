import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface DrawerProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const BottomDrawer: React.FC<DrawerProps> = ({ children, isOpen, onClose }) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const layout = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(drawerRef.current, {
   
        zIndex:50,
        onComplete:()=>{
            gsap.to(drawerRef.current, {
            y: 0,
            duration: 0.2,
            ease: 'power3.out',
            });
        }
      });
      gsap.to(layout.current,{
        zIndex:50,
      })
    } else {
      gsap.to(drawerRef.current, {
        y: '100%',
        duration: 0.5,
        ease: 'power3.in',
        zIndex:0,
        onComplete:()=>{
            gsap.to(layout.current,{
                zIndex:0
             })    
        }
      });
      
    }
  }, [isOpen]);

  return (
    <div className="fixed inset-0 mt-10" ref={layout}>
      {/* Drawer */}
      <div
        ref={drawerRef}
        className="w-full sm:w-[400px] bg-slate-800 rounded-t-3xl border-t-2 border-yellow-600 pb-20 shadow-lg overflow-hidden absolute bottom-0"
        style={{ transform: 'translateY(100%)' }} // Set initial state here
      >
        <div className="p-4 flex flex-col  gap-2">
          <button className="mb-4 text-white w-full text-end" onClick={onClose}>
           &#10006;
          </button>
          {children}
        </div>
      </div>

      {/* Overlay, shown only when the drawer is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-10 z-50"
          onClick={onClose}
        ></div>
      )}
    </div>
  );
};

export default BottomDrawer;
