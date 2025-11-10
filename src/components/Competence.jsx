import React, { useEffect, useRef } from "react";
import photo from "../images/photo.png";
import gsap from "gsap"; // Import GSAP if installed via npm
import ScrollReveal from "scrollreveal";
import cv from "../../public/cv.pdf";

const Competence = () => {
  const buttonRef = useRef(null);

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
      sr.reveal(".angular", {
      origin: "left",
      distance: "500px",
      delay: 1000,
    });

     sr.reveal(".java", {
      origin: "left",
      distance: "500px",
      delay: 800,
    });

     sr.reveal(".php", {
      origin: "left",
      distance: "500px",
      delay: 600,
    });

     sr.reveal(".react", {
      origin: "left",
      distance: "500px",
      delay: 400,
    });

     sr.reveal(".tailwind", {
      origin: "left",
      distance: "500px",
      delay: 200,
    });
  }, []);

  return (
    <div className="px-4 md:px-16 bg-white py-8 md:py-16">
      {/* 1er section */}
      <div className="flex flex-col md:flex-row items-end md:items-center justify-end md:justify-between mb-8 md:mb-16">
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
          <div className="mb-6 md:mb-8">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight [letter-spacing:-0.05em] text-left principal">
              Créer des expériences digitales <br className="hidden md:block" />
              où technologie et innovation <br className="hidden md:block" />
              façonnent l’avenir
            </h1>
          </div>

          {/* paragraphe */}
          <p className="text-sm sm:text-base text-gray-600 mb-8 md:mb-12 text-left text-gauche">
            Développeur full-stack maîtrisant des technologies modernes{" "}
            <br className="hidden md:block" />
            pour concevoir des applications performantes et intuitives.
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
          <div className="flex items-center justify-center md:justify-start gap-3 md:gap-8 mb-8 md:mb-12 flex-wrap">
            {/* Angular */}
            <div className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center bg-[#f8f8f8] rounded-full md:rounded-2xl angular">
              <svg viewBox="0 0 250 250" className="w-10 h-10 md:w-16 md:h-16">
                <polygon
                  fill="#DD0031"
                  points="125,30 125,30 125,30 31.9,63.2 46.1,186.3 125,230 125,230 125,230 203.9,186.3 218.1,63.2"
                />
                <polygon
                  fill="#C3002F"
                  points="125,30 125,52.2 125,52.1 125,153.4 125,153.4 125,230 125,230 203.9,186.3 218.1,63.2 125,30"
                />
                <path
                  fill="#FFFFFF"
                  d="M125,52.1L66.8,182.6h0h21.7h0l11.7-29.2h49.4l11.7,29.2h0h21.7h0L125,52.1L125,52.1L125,52.1L125,52.1 L125,52.1z M142,135.4H108l17-40.9L142,135.4z"
                />
              </svg>
            </div>

            {/* Java */}
            <div className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center bg-[#f8f8f8] rounded-full md:rounded-2xl java">
              <svg viewBox="0 0 256 346" className="w-10 h-10 md:w-16 md:h-16">
                <path
                  fill="#5382A1"
                  d="M82.554 267.473s-13.198 7.675 9.393 10.272c27.369 3.122 41.356 2.675 71.517-3.034 0 0 7.93 4.972 19.003 9.279-67.611 28.977-153.019-1.679-99.913-16.517M74.292 229.659s-14.803 10.958 7.805 13.296c29.236 3.016 52.324 3.263 92.276-4.43 0 0 5.526 5.602 14.215 8.666-81.747 23.904-172.798 1.885-114.296-17.532"
                />
                <path
                  fill="#E76F00"
                  d="M143.942 165.515c16.66 19.18-4.377 36.44-4.377 36.44s42.301-21.837 22.874-49.183c-18.144-25.5-32.059-38.172 43.268-81.858 0 0-118.238 29.53-61.765 94.6"
                />
                <path
                  fill="#5382A1"
                  d="M233.364 295.442s9.767 8.047-10.757 14.273c-39.026 11.823-162.432 15.393-196.714.471-12.323-5.36 10.787-12.8 18.056-14.362 7.581-1.644 11.914-1.337 11.914-1.337-13.705-9.655-88.583 18.957-38.034 27.15 137.853 22.356 251.292-10.066 215.535-26.195M88.9 190.48s-62.771 14.91-22.228 20.323c17.118 2.292 51.243 1.774 83.03-.89 25.978-2.19 52.063-6.85 52.063-6.85s-9.16 3.923-15.787 8.448c-63.744 16.765-186.886 8.966-151.435-8.183 29.981-14.492 54.358-12.848 54.358-12.848M201.506 253.422c64.8-33.672 34.839-66.03 13.927-61.67-5.126 1.066-7.411 1.99-7.411 1.99s1.903-2.98 5.537-4.27c41.37-14.545 73.187 42.897-13.355 65.647 0 .001 1.003-.895 1.302-1.697"
                />
                <path
                  fill="#E76F00"
                  d="M162.439.371s35.887 35.9-34.037 91.101c-56.071 44.282-12.786 69.53-.023 98.377-32.73-29.53-56.75-55.526-40.635-79.72C111.395 74.612 176.918 57.393 162.439.37"
                />
                <path
                  fill="#5382A1"
                  d="M95.268 344.665c62.199 3.982 157.712-2.209 159.974-31.64 0 0-4.348 11.158-51.404 20.018-53.088 9.99-118.564 8.824-157.399 2.421.001 0 7.95 6.58 48.83 9.201"
                />
              </svg>
            </div>

            {/* php */}
            <div className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center bg-[#f8f8f8] rounded-full md:rounded-2xl php">
              <svg viewBox="0 0 256 134" className="w-10 h-10 md:w-16 md:h-16">
                <text
                  x="35"
                  y="90"
                  fill="#777BB3"
                  style={{
                    fontSize: "110px",
                    fontWeight: "bold",
                    fontFamily: "sans-serif",
                  }}
                >
                  php
                </text>
              </svg>
            </div>

            {/* React */}
            <div className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center bg-[#f8f8f8] rounded-full md:rounded-2xl react">
              <svg viewBox="0 0 256 228" className="w-10 h-10 md:w-16 md:h-16">
                <path
                  fill="#00D8FF"
                  d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621 6.238-30.281 2.16-54.676-11.769-62.708-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848 155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233 50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165 167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266 13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923 168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586 13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488 29.348-9.723 48.443-25.443 48.443-41.52 0-15.417-17.868-30.326-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345-3.24-10.257-7.612-21.163-12.963-32.432 5.106-11 9.31-21.767 12.459-31.957 2.619.758 5.16 1.557 7.61 2.4 23.69 8.156 38.14 20.213 38.14 29.504 0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787-1.524 8.219-4.59 13.698-8.382 15.893-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c10.486 2.32 22.093 3.988 34.498 4.994 7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863-6.35-5.437-9.555-10.836-9.555-15.216 0-9.322 13.897-21.212 37.076-29.293 2.813-.98 5.757-1.905 8.812-2.773 3.204 10.42 7.406 21.315 12.477 32.332-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979Zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322Zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18ZM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152 7.304-1.634 15.093-2.97 23.209-3.984a321.173 321.173 0 0 0-7.848 12.897Zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793 2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147Zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433 4.902.192 9.899.29 14.978.29 5.218 0 10.376-.117 15.453-.343-4.985 6.774-10.018 12.97-15.028 18.486Zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026 347.403 347.403 0 0 0 7.425-13.565Zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815 329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627 310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695 358.489 358.489 0 0 1 11.036 20.54 329.472 329.472 0 0 1-11 20.722Zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026-.344 1.668-.73 3.367-1.15 5.09-10.622-2.452-22.155-4.275-34.23-5.408-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3ZM128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86-22.86-10.235-22.86-22.86 10.235-22.86 22.86-22.86Z"
                />
              </svg>
            </div>

            {/* Tailwind */}
            <div className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center bg-[#f8f8f8] rounded-full md:rounded-2xl tailwind">
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
          </div>

          {/* Boutton with Hover Effect */}
          <div className="flex justify-center md:justify-start">
            <button
              ref={buttonRef}
              className="button button--stroke"
              style={{
                backgroundColor: "black", // Ajout du fond noir
              }}
            >
              <span className="button__flair"></span>
              <span className="button__label">TELECHARGER MON CV</span>
            </button>
          </div>
        </div>

        {/* droite - Desktop only */}
        <div className="flex-shrink-0 hidden md:block photo">
          {/* Photo */}
          <div className="w-[450px] h-[550px] rounded-[225px] overflow-hidden bg-orange-400">
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
