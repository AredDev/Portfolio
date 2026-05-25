import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocation, Link } from 'react-router-dom';
import { Home, User, Mail, MessageCircle } from 'lucide-react';
import ContactModal from './ContactModal';

gsap.registerPlugin(ScrollTrigger);

const NavItem = ({ text, to, href, index }) => {
  const linkRef = useRef(null);

  useEffect(() => {
    const link = linkRef.current;
    if (!link) return;

    // Simple letter animation setup if we want it, 
    // but for now let's just keep the hover/mousemove logic if the text is split.
    // To safe guard, we will just do standard hover if text is dynamic.
    // Actually, let's keep the cool letter effect!

    const letters = link.querySelectorAll('.letter');

    const handleMouseMove = (e) => {
      const letter = e.target;
      // Safety check
      if (!letter.classList.contains('letter')) return;

      const rect = letter.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      letter.style.setProperty('--x', `${x}px`);
      letter.style.setProperty('--y', `${y}px`);
    };

    const handleMouseLeave = (e) => {
      const letter = e.target;
      if (!letter.classList.contains('letter')) return;

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
  }, [text]); // Re-run if text changes

  const content = (
    <>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="letter inline-block relative"
          style={{ transition: 'transform 0.2s ease' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </>
  );

  const className = "relative z-10 text-white font-medium flex text-lg px-2 py-1";

  return (
    <div className="nav-item">
      {to ? (
        <Link to={to} ref={linkRef} className={className}>
          {content}
        </Link>
      ) : (
        <a href={href} ref={linkRef} className={className}>
          {content}
        </a>
      )}
    </div>
  );
};

const Navbar = () => {
  const location = useLocation();
  const cursorRef = useRef(null);
  const desktopNavRef = useRef(null);
  const logoRef = useRef(null);
  const leftMenuRef = useRef(null);
  const rightMenuRef = useRef(null);
  const mobileLogoRef = useRef(null);

  // Cursor effect state
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Layout State
  const isHome = location.pathname === '/';

  // --- CURSOR LOGIC ---
  useEffect(() => {
    const cursor = cursorRef.current;

    const handleMouseMove = (e) => {
      if (cursor) {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName.toLowerCase() === 'a' ||
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.classList.contains('cursor-pointer') ||
        e.target.classList.contains('nav-item')) {
        setIsHovered(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovered(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  // --- APPEARANCE ANIMATION ---
  useEffect(() => {
    const nav = desktopNavRef.current;
    const logo = logoRef.current;
    const leftEl = leftMenuRef.current;
    const rightEl = rightMenuRef.current;

    if (!nav) return;

    gsap.set(nav, { y: -100, opacity: 0 });
    gsap.set(logo, { scale: 0, opacity: 0 });
    gsap.set([leftEl, rightEl], { y: -30, opacity: 0 });

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
      .to([leftEl, rightEl], {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      }, '-=0.4');

    return () => tl.kill();
  }, []);

  // --- SCROLL HIDE/SHOW LOGIC ---
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const nav = desktopNavRef.current;

    const handleScroll = () => {
      if (!nav) return;

      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
      const scrollDifference = Math.abs(currentScrollY - lastScrollY);

      // Only trigger if minimal scroll occurred to avoid jitter
      if (scrollDifference > 5) {
        if (isScrollingDown && currentScrollY > 50) {
          // Hide nav
          gsap.to(nav, {
            yPercent: -100,
            duration: 0.8,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        } else {
          // Show nav
          gsap.to(nav, {
            yPercent: 0,
            duration: 0.8,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        }
        lastScrollY = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- MOBILE LOGO SCROLL HIDE/SHOW ---
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const mobileLogo = mobileLogoRef.current;

    const handleMobileScroll = () => {
      if (!mobileLogo) return;

      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
      const diff = Math.abs(currentScrollY - lastScrollY);

      if (diff > 5) {
        if (isScrollingDown && currentScrollY > 40) {
          gsap.to(mobileLogo, {
            y: -80,
            opacity: 0,
            duration: 0.4,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        } else {
          gsap.to(mobileLogo, {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        }
        lastScrollY = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleMobileScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleMobileScroll);
  }, []);

  return (
    <div className="bg-black text-white relative">
      {/* CUSTOM CURSOR */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-50 pointer-events-none mix-blend-difference hidden md:block"
        style={{ transform: 'translate(-100px, -100px)' }}
      >
        <div
          className={`w-12 h-12 rounded-full bg-white transition-transform duration-300 ease-out -translate-x-1/2 -translate-y-1/2 ${isHovered ? 'scale-[2.5]' : 'scale-100'
            }`}
        />
      </div>

      {/* DESKTOP NAVIGATION (Hidden on mobile) */}
      <nav
        ref={desktopNavRef}
        className="hidden lg:flex px-16 py-6 justify-between items-center fixed top-0 left-0 right-0 bg-black z-40 border-b border-gray-800"
      >
        {/* Left: A propos OR Accueil */}
        <div ref={leftMenuRef}>
          {isHome ? (
            <NavItem text="À propos" to="/about" index={0} />
          ) : (
            <NavItem text="Accueil" to="/" index={0} />
          )}
        </div>

        {/* Center: Logo */}
        <div ref={logoRef} className="text-4xl font-bold absolute left-1/2 transform -translate-x-1/2 cursor-pointer">
          <Link to="/">dera.</Link>
        </div>

        {/* Right: Contact */}
        <div ref={rightMenuRef}>
          <div className="nav-item">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
              className="relative z-10 text-white font-medium flex text-lg px-2 py-1"
            >
              {['C', 'o', 'n', 't', 'a', 'c', 't'].map((char, i) => (
                <span
                  key={i}
                  className="letter inline-block relative"
                  style={{ transition: 'transform 0.2s ease' }}
                >
                  {char}
                </span>
              ))}
            </a>
          </div>
        </div>
      </nav>

      {/* spacer for fixed nav */}
      <div className="hidden lg:block h-[88px]"></div>

      {/* MOBILE TOP BAR (Logo) */}
      <div ref={mobileLogoRef} className="lg:hidden fixed top-0 left-0 p-6 z-40 mix-blend-difference">
        <div className="text-2xl font-bold text-white">dera.</div>
      </div>

      {/* MOBILE BOTTOM NAVIGATION (Hidden on Desktop) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-gray-800 z-50 pb-safe safe-area-inset-bottom">
        <div className="flex justify-around items-center h-16 w-full max-w-md mx-auto">
          {/* Home Icon */}
          <Link
            to="/"
            className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${isHome ? 'text-white' : 'text-gray-500'}`}
          >
            <Home strokeWidth={isHome ? 2.5 : 1.5} size={24} />
          </Link>

          {/* About Icon */}
          <Link
            to="/about"
            className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${location.pathname === '/about' ? 'text-white' : 'text-gray-500'}`}
          >
            <User strokeWidth={location.pathname === '/about' ? 2.5 : 1.5} size={24} />
          </Link>

          {/* Contact Icon (Link to modal or scroll) - Let's make it trigger modal if desired, or keep as scroll. 
              The user asked for a floating button for the modal. 
              Let's keep this as scroll for now to match the "Mail" icon semantics of "Contact Section".
          */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }}
            className="flex flex-col items-center justify-center w-16 h-full text-gray-500 hover:text-white transition-colors"
          >
            <Mail strokeWidth={1.5} size={24} />
          </a>
        </div>
      </nav>

      {/* FLOATING ACTION BUTTON (Messenger Style) */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed z-50 bottom-20 right-4 lg:bottom-8 lg:right-8 bg-white text-black p-4 rounded-full shadow-lg hover:scale-110 transition-transform active:scale-95 flex items-center justify-center"
      >
        <MessageCircle size={28} strokeWidth={1.5} />
      </button>

      {/* CONTACT MODAL */}
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <style jsx>{`
        /* Safe area support for iPhone X+ */
        .pb-safe {
            padding-bottom: env(safe-area-inset-bottom);
        }
      `}</style>
    </div>
  );
};

export default Navbar;