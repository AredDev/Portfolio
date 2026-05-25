import React, { useEffect, useRef, useState } from "react";
import photo from "../images/photo.png";
import jsIcon from "../images/js.svg";
import reactIcon from "../images/react.svg";
import vueIcon from "../images/vue.svg";
import figmaIcon from "../images/figma.svg";
import xdIcon from "../images/Xd.svg";
import gsap from "gsap"; // Import GSAP if installed via npm
import ScrollReveal from "scrollreveal";
import cv from "../../public/cv.pdf";

const Competence = () => {
  const buttonRef = useRef(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Pourcentages pour chaque compétence
  const skillPercentages = {
    javascript: 80,
    react: 85,
    vuejs: 70,
    nextjs: 50,
    tailwind: 80,
    adobexd: 85,
    figma: 80
  };

  useEffect(() => {
    if (!buttonRef.current) return;

    const buttonElement = buttonRef.current;

    class Button {
      constructor(buttonElement) {
        this.block = buttonElement;
        this.init();
        this.initEvents();
      }

      init() {
        const el = gsap.utils.selector(this.block);

        this.DOM = {
          button: this.block,
          flair: el(".button__flair"),
        };

        this.xSet = gsap.quickSetter(this.DOM.flair, "xPercent");
        this.ySet = gsap.quickSetter(this.DOM.flair, "yPercent");
      }

      getXY(e) {
        const { left, top, width, height } =
          this.DOM.button.getBoundingClientRect();

        const xTransformer = gsap.utils.pipe(
          gsap.utils.mapRange(0, width, 0, 100),
          gsap.utils.clamp(0, 100)
        );

        const yTransformer = gsap.utils.pipe(
          gsap.utils.mapRange(0, height, 0, 100),
          gsap.utils.clamp(0, 100)
        );

        return {
          x: xTransformer(e.clientX - left),
          y: yTransformer(e.clientY - top),
        };
      }

      initEvents() {
        this.DOM.button.addEventListener("mouseenter", (e) => {
          const { x, y } = this.getXY(e);

          this.xSet(x);
          this.ySet(y);

          gsap.to(this.DOM.flair, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          });
        });

        this.DOM.button.addEventListener("mouseleave", (e) => {
          const { x, y } = this.getXY(e);

          gsap.killTweensOf(this.DOM.flair);

          gsap.to(this.DOM.flair, {
            xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
            yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
            scale: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        this.DOM.button.addEventListener("mousemove", (e) => {
          const { x, y } = this.getXY(e);

          gsap.to(this.DOM.flair, {
            xPercent: x,
            yPercent: y,
            duration: 0.4,
            ease: "power2",
          });
        });
      }
    }

    new Button(buttonElement);

    // Cleanup event listeners on unmount
    return () => {
      buttonElement.removeEventListener(
        "mouseenter",
        Button.prototype.initEvents
      );
      buttonElement.removeEventListener(
        "mouseleave",
        Button.prototype.initEvents
      );
      buttonElement.removeEventListener(
        "mousemove",
        Button.prototype.initEvents
      );
    };
  }, []);

  useEffect(() => {
    const sr = ScrollReveal({
      origin: "bottom",
      distance: "20px",
      duration: 1000,
      delay: 200,
      reset: true,
    });
    sr.reveal(".reveal", { interval: 200 });

    // Animation du text principal
    sr.reveal(".principal", {
      origin: "top",
      distance: "100px",
      delay: 350,
    });

    // Animation des autres textes
    sr.reveal(".text-gauche", {
      origin: "left",
      distance: "50px",
      delay: 500,
    });
    sr.reveal(".text-droite", {
      origin: "right",
      distance: "50px",
      delay: 500,
    });

    sr.reveal(".photo", {
      origin: "down",
      distance: "50px",
      delay: 500,
    });

    sr.reveal(".button", {
      origin: "up",
      distance: "50px",
      delay: 500,
    });
    // Animation d'apparition de cards
    sr.reveal(".javascript", {
      origin: "left",
      distance: "500px",
      delay: 1400,
    });

    sr.reveal(".react", {
      origin: "left",
      distance: "500px",
      delay: 1200,
    });

    sr.reveal(".vuejs", {
      origin: "left",
      distance: "500px",
      delay: 1000,
    });

    sr.reveal(".nextjs", {
      origin: "left",
      distance: "500px",
      delay: 800,
    });

    sr.reveal(".tailwind", {
      origin: "left",
      distance: "500px",
      delay: 600,
    });

    sr.reveal(".adobexd", {
      origin: "left",
      distance: "500px",
      delay: 400,
    });

    sr.reveal(".figma", {
      origin: "left",
      distance: "500px",
      delay: 200,
    });
  }, []);

  return (
    <div className="px-4 md:px-16 bg-white pt-10 pb-4 md:py-16">
      {/* 1er section */}
      <div className="flex flex-col md:flex-row items-end md:items-center justify-end md:justify-between ">
        <p className="text-sm sm:text-base text-gray-600 mb-2 md:mb-0 text-right md:text-left md:order-1 text-droite">
          Développeur passionné <br />
          Créateur de solutions innovantes
        </p>
        <p className="text-sm sm:text-base text-gray-600 md:text-left hidden md:block text-gauche">
          Conçu pour transformer des idées en réalités digitales <br />
          avec expertise et créativité
        </p>
      </div>

      {/* 2nd section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
        {/* gauche */}
        <div className="flex-1 w-full md:w-auto">
          {/* text */}
          <div className="mb-6 md:mb-10">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight [letter-spacing:-0.05em] text-left principal">
              Créer des expériences digitales <br className="hidden md:block" />
              où technologie et innovation <br className="hidden md:block" />
              façonnent l’avenir
            </h1>
          </div>

          {/* paragraphe */}
          <p className="text-sm sm:text-base text-gray-600 mb-8 md:mb-28 text-left text-gauche">
            Développeur frontend et mobile maîtrisant des technologies modernes{" "}
            <br className="hidden md:block" />
            pour concevoir des interfaces performantes et intuitives.
          </p>

          {/* Photo - Mobile only */}
          <div className="flex justify-center mb-8 md:hidden">
            <div className="w-[280px] h-[380px] sm:w-[320px] sm:h-[420px] rounded-[140px] sm:rounded-[160px] overflow-hidden bg-orange-400">
              <img
                src={photo}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* card - Technologies */}
          <div className="flex items-center justify-center md:justify-start gap-3 md:gap-8 mb-8 md:mb-20 flex-wrap">
            {/* JavaScript */}
            <div
              className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center bg-[#f8f8f8] rounded-full md:rounded-2xl javascript relative cursor-pointer transition-transform hover:scale-110"
              onMouseEnter={() => setHoveredSkill('javascript')}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {hoveredSkill === 'javascript' && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 rounded-lg text-sm font-bold whitespace-nowrap">
                  {skillPercentages.javascript}%
                </div>
              )}
              <img src={jsIcon} alt="JavaScript" className="w-10 h-10 md:w-16 md:h-16 object-contain" />
            </div>

            {/* React */}
            <div
              className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center bg-[#f8f8f8] rounded-full md:rounded-2xl react relative cursor-pointer transition-transform hover:scale-110"
              onMouseEnter={() => setHoveredSkill('react')}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {hoveredSkill === 'react' && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 rounded-lg text-sm font-bold whitespace-nowrap">
                  {skillPercentages.react}%
                </div>
              )}
              <img src={reactIcon} alt="React" className="w-10 h-10 md:w-16 md:h-16 object-contain" />
            </div>

            {/* Vue.js */}
            <div
              className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center bg-[#f8f8f8] rounded-full md:rounded-2xl vuejs relative cursor-pointer transition-transform hover:scale-110"
              onMouseEnter={() => setHoveredSkill('vuejs')}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {hoveredSkill === 'vuejs' && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 rounded-lg text-sm font-bold whitespace-nowrap">
                  {skillPercentages.vuejs}%
                </div>
              )}
              <img src={vueIcon} alt="Vue.js" className="w-10 h-10 md:w-16 md:h-16 object-contain" />
            </div>

            {/* Next.js */}
            <div
              className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center bg-[#f8f8f8] rounded-full md:rounded-2xl nextjs relative cursor-pointer transition-transform hover:scale-110"
              onMouseEnter={() => setHoveredSkill('nextjs')}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {hoveredSkill === 'nextjs' && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 rounded-lg text-sm font-bold whitespace-nowrap">
                  {skillPercentages.nextjs}%
                </div>
              )}
              <svg viewBox="0 0 24 24" className="w-10 h-10 md:w-16 md:h-16">
                <path fill="#000000" d="M12 0a12 12 0 100 24 12 12 0 000-24zm6.002 18H16.29l-6.765-8.67V18H8.22V6h1.29l6.765 8.67V6h1.73z" />
              </svg>
            </div>

            {/* Tailwind */}
            <div
              className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center bg-[#f8f8f8] rounded-full md:rounded-2xl tailwind relative cursor-pointer transition-transform hover:scale-110"
              onMouseEnter={() => setHoveredSkill('tailwind')}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {hoveredSkill === 'tailwind' && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 rounded-lg text-sm font-bold whitespace-nowrap">
                  {skillPercentages.tailwind}%
                </div>
              )}
              <svg viewBox="0 0 256 154" className="w-10 h-10 md:w-16 md:h-16">
                <defs>
                  <linearGradient
                    x1="-2.778%"
                    y1="32%"
                    x2="100%"
                    y2="67.556%"
                    id="gradient"
                  >
                    <stop stopColor="#2298BD" offset="0%" />
                    <stop stopColor="#0ED7B5" offset="100%" />
                  </linearGradient>
                </defs>
                <path
                  d="M128 0C93.867 0 72.533 17.067 64 51.2 76.8 34.133 91.733 27.733 108.8 32c9.737 2.434 16.697 9.499 24.401 17.318C145.751 62.057 160.275 76.8 192 76.8c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C174.249 14.743 159.725 0 128 0ZM64 76.8C29.867 76.8 8.533 93.867 0 128c12.8-17.067 27.733-23.467 44.8-19.2 9.737 2.434 16.697 9.499 24.401 17.318C81.751 138.857 96.275 153.6 128 153.6c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C110.249 91.543 95.725 76.8 64 76.8Z"
                  fill="url(#gradient)"
                />
              </svg>
            </div>

            {/* Adobe XD */}
            <div
              className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center bg-[#f8f8f8] rounded-full md:rounded-2xl adobexd relative cursor-pointer transition-transform hover:scale-110"
              onMouseEnter={() => setHoveredSkill('adobexd')}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {hoveredSkill === 'adobexd' && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 rounded-lg text-sm font-bold whitespace-nowrap">
                  {skillPercentages.adobexd}%
                </div>
              )}
              <img src={xdIcon} alt="Adobe XD" className="w-10 h-10 md:w-16 md:h-16 object-contain" />
            </div>

            {/* Figma */}
            <div
              className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center bg-[#f8f8f8] rounded-full md:rounded-2xl figma relative cursor-pointer transition-transform hover:scale-110"
              onMouseEnter={() => setHoveredSkill('figma')}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {hoveredSkill === 'figma' && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 rounded-lg text-sm font-bold whitespace-nowrap">
                  {skillPercentages.figma}%
                </div>
              )}
              <img src={figmaIcon} alt="Figma" className="w-10 h-10 md:w-16 md:h-16 object-contain" />
            </div>
          </div>

          {/* Boutton with Hover Effect */}
          <div className="flex justify-center md:justify-start">
            <button
              ref={buttonRef}
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/cv.pdf';
                link.download = 'CV_Dera.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="button button--stroke"
              style={{
                backgroundColor: "black", // Ajout du fond noir
              }}
            >
              <span className="button__flair"></span>
              <span className="button__label">TÉLÉCHARGER MON CV</span>
            </button>
          </div>
        </div>

        {/* droite - Desktop only */}
        <div className="flex-shrink-0 hidden md:block photo mt-20">
          {/* Photo */}
          <div className="w-[450px] h-[70vh] rounded-[200px] overflow-hidden bg-orange-400">
            <img
              src={photo}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Competence;
