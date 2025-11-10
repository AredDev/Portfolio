import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NavItem = ({ text, index }) => {
  const linkRef = useRef(null);

  useEffect(() => {
    const link = linkRef.current;
    const letters = link.querySelectorAll('.letter');

    const handleMouseMove = (e) => {
      const letter = e.target;
      const rect = letter.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      letter.style.setProperty('--x', `${x}px`);
      letter.style.setProperty('--y', `${y}px`);
    };

    const handleMouseLeave = (e) => {
      const letter = e.target;
      letter.style.setProperty('--x', '0px');
      letter.style.setProperty('--y', '0px');
    };

    letters.forEach((letter) => {
      letter.addEventListener('mousemove', handleMouseMove);
      letter.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      letters.forEach((letter) => {
        letter.removeEventListener('mousemove', handleMouseMove);
        letter.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <li className="relative px-2 nav-item" data-index={index}>
      <a
        href="#"
        ref={linkRef}
        className="relative z-10 text-white font-medium flex"
      >

        {/* Ici que je devrais faire l'effet zoom */}
        {text.split('').map((char, index) => (
          <span
            key={index}
            className=""
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </a>
    </li>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const cursorRef = useRef(null);
  const desktopNavRef = useRef(null);
  const logoRef = useRef(null);
  const leftMenuRef = useRef(null);
  const rightMenuRef = useRef(null);
  
  // Mobile refs
  const menuRef = useRef(null);
  const menuLinksRef = useRef([]);
  const footerTextRef = useRef(null);
  const timelineRef = useRef(null);

  // Cursor effect
  useEffect(() => {
    const cursor = cursorRef.current;
    const handleMouseMove = (e) => {
      if (cursor) {
        cursor.style.transform = `translate(${e.clientX - 12.5}px, ${e.clientY - 12.5}px)`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 🎨 ANIMATION 1: Apparition au chargement
  useEffect(() => {
    const nav = desktopNavRef.current;
    const logo = logoRef.current;
    const leftItems = leftMenuRef.current?.querySelectorAll('.nav-item');
    const rightItems = rightMenuRef.current?.querySelectorAll('.nav-item');

    if (!nav) return;

    // État initial
    gsap.set(nav, { y: -100, opacity: 0 });
    gsap.set(logo, { scale: 0, opacity: 0 });
    gsap.set([leftItems, rightItems], { y: -30, opacity: 0 });

    // Timeline d'apparition
    const tl = gsap.timeline({ delay: 0.2 });
    
    tl.to(nav, { 
      y: 0, 
      opacity: 1, 
      duration: 0.8, 
      ease: 'power3.out' 
    })
    .to(logo, { 
      scale: 1, 
      opacity: 1, 
      duration: 0.6, 
      ease: 'back.out(1.7)' 
    }, '-=0.5')
    .to(leftItems, { 
      y: 0, 
      opacity: 1, 
      duration: 0.6, 
      stagger: 0.1, 
      ease: 'power2.out' 
    }, '-=0.4')
    .to(rightItems, { 
      y: 0, 
      opacity: 1, 
      duration: 0.6, 
      stagger: 0.1, 
      ease: 'power2.out' 
    }, '-=0.6');

    return () => tl.kill();
  }, []);

  // 🎨 ANIMATION 2 & 3: Cache/Montre au scroll (activé après l'animation initiale)
  useEffect(() => {
    const nav = desktopNavRef.current;
    if (!nav) return;

    let lastScrollY = 0;
    let ticking = false;

    const updateNavbar = () => {
      const scrollY = window.scrollY;

      if (scrollY > lastScrollY && scrollY > 100) {
        // Scroll DOWN - Cache la navbar
        gsap.to(nav, { 
          y: -100, 
          duration: 0.3, 
          ease: 'power2.inOut' 
        });
      } else if (scrollY < lastScrollY) {
        // Scroll UP - Montre la navbar
        gsap.to(nav, { 
          y: 0, 
          duration: 0.3, 
          ease: 'power2.inOut' 
        });
      }

      lastScrollY = scrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };

    // Attendre que l'animation initiale soit terminée (1.5s)
    const timer = setTimeout(() => {
      window.addEventListener('scroll', onScroll);
    }, 1500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // 📱 Mobile Menu Animation (GSAP)
  useEffect(() => {
    const menu = menuRef.current;
    const links = menuLinksRef.current;
    const footer = footerTextRef.current;

    if (!menu) return;

    const visibleLinks = links.filter(Boolean);

    const tl = gsap.timeline({
      defaults: { duration: 0.6, ease: 'power3.inOut' },
      paused: true
    });

    gsap.set(menu, { clipPath: 'inset(0% 0% 0% 100%)' });
    gsap.set([...visibleLinks, footer].filter(Boolean), { opacity: 1, y: 0 });

    tl.to(menu, { clipPath: 'inset(0% 0% 0% 0%)' });

    timelineRef.current = tl;

    return () => tl.kill();
  }, []);

  useEffect(() => {
    const tl = timelineRef.current;
    if (!tl) return;

    if (isMenuOpen) {
      tl.play();
    } else {
      tl.reverse();
    }
  }, [isMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <div className="bg-black text-white relative">
      <div
        ref={cursorRef}
        className="fixed w-12 h-12 rounded-full bg-white mix-blend-difference z-50 pointer-events-none hidden md:block"
        style={{ transform: 'translate(-100%, -100%)' }}
      />
      
      {/* Desktop Navigation */}
      <nav 
        ref={desktopNavRef}
        className="hidden lg:flex px-16 py-6 justify-between items-center fixed top-0 left-0 right-0 bg-black z-40"
      >
        <ul ref={leftMenuRef} className="flex gap-8">
          <NavItem text="A propos" index={0} />
          <NavItem text="Projets récents" index={1} />
        </ul>
        <div ref={logoRef} className="text-4xl font-bold mr-[80px]">dera.</div>
        <ul ref={rightMenuRef} className="flex gap-8">
          <NavItem text="Services" index={2} />
          <NavItem text="Contact" index={3} />
        </ul>
      </nav>

      {/* Spacer pour le fixed navbar */}
      <div className="hidden lg:block h-[88px]"></div>

      {/* Mobile Navigation */}
      <nav className="lg:hidden px-4 py-4 flex justify-between items-center relative bg-black">
        <div className="text-2xl font-light">dera.</div>
        <button
          aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setIsMenuOpen(v => !v)}
          className="w-10 h-10 flex items-center justify-center z-[60] relative"
        >
          <span
            className={`absolute block w-6 h-0.5 bg-white transition-transform duration-300 ease-out ${
              isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
            }`}
          />
          <span
            className={`absolute block w-6 h-0.5 bg-white transition-all duration-300 ease-out ${
              isMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`absolute block w-6 h-0.5 bg-white transition-transform duration-300 ease-out ${
              isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
            }`}
          />
        </button>

        {/* Mobile Menu Overlay */}
        <div 
          ref={menuRef}
          className="fixed top-0 left-0 w-full h-screen z-50"
        >
          <div className="absolute inset-0 backdrop-blur-md bg-black/80" />
            
          <div className="relative h-full flex flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-8">
              <a 
                href="#" 
                ref={el => menuLinksRef.current[0] = el}
                className="text-xl font-light flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 bg-white rounded-full"/> A propos
              </a>
              <a 
                href="#" 
                ref={el => menuLinksRef.current[1] = el}
                className="text-xl font-light"
              >
                Projets récents
              </a>
              <a 
                href="#" 
                ref={el => menuLinksRef.current[2] = el}
                className="text-xl font-light"
              >
                Services
              </a>
              <a 
                href="#" 
                ref={el => menuLinksRef.current[3] = el}
                className="text-xl font-light"
              >
                Contact
              </a>
            </div>
            <div className="absolute bottom-2" ref={footerTextRef}>
              <p className="text-sm font-light">Summer Portfolio 2025</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Ligne de séparation */}
      <div className="px-4 md:px-20 border-t border-gray-900" />

      

      <style jsx>{`
        .letter {
          transition: transform 0.2s ease;
          transform: translate(var(--x, 0px), var(--y, 0px));
        }
      `}</style>
    </div>
  );
};

export default Navbar;