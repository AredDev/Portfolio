import React, { useEffect } from "react";
import myPhoto from "../images/dera-web.png";
import mobile from "../images/dera-mobile.png";
import ScrollReveal from "scrollreveal";

const Accueil = () => {
  useEffect(() => {
    const sr = ScrollReveal({
      origin: "bottom",
      distance: "20px",
      duration: 1000,
      delay: 200,
      reset: true,
    });
    sr.reveal(".reveal", { interval: 200 });

    sr.reveal(".principal", {
      origin: "top",
      distance: "100px",
      delay: 350,
    });

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
    sr.reveal(".text-bas", {
      origin: "bottom",
      distance: "50px",
      delay: 500,
    });

    sr.reveal(".bg-image", {
      origin: "bottom",
      distance: "20px",
      duration: 1200,
      delay: 300,
      opacity: 0,
      easing: "ease-out",
    });
  }, []);

  return (
    <div className=" relative min-h-screen w-full flex justify-between items-center bg-black overflow-hidden">
      {/* Responsive Image: mobile first */}
      <div className="block lg:hidden absolute top-0 left-0 w-full h-full z-0">
        <img
          src={mobile}
          alt="Moi mobile"
          className="w-full h-full object-cover"
          style={{
            minHeight: "100vh",
            maxHeight: "100vh",
            objectPosition: "center",
          }}
        />
        {/* Sombre overlay sans dénaturer la photo */}
        <div className="absolute inset-0" />
      </div>
      {/* Desktop image */}
      <div className="hidden lg:block absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <img
          src={myPhoto}
          alt="Moi desktop"
          className="max-w-[70vw] sm:max-w-[50vw] md:max-w-[40vw] lg:max-w-[35vw] object-contain"
        />

        {/* Overlay plus discret sur desktop */}
        <div className="absolute inset-0 " />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center flex-1 w-full h-full">
        {/* Mobile text block */}
        <div className="block lg:hidden w-full flex flex-col items-center justify-center pt-0 mt-[-65px]">
          <div className="text-[25px] sm:text-[60px] font-bold text-center leading-[1.2]">
            <span className="text-white text-[45px] sm:text-[90px] uppercase ">
              Devéloppeur
            </span>
            <br />
            <span style={{ color: "#FF4D00" }} className="uppercase">Web & Mobile</span>
          </div>
          <div
            className="mt-6 text-white text-center text-[13px] sm:text-[15px] font-light max-w-xs mx-auto shadow-md"
            style={{ textShadow: "0 1px 8px #0008" }}
          >
             Développer des applications innovantes
            <br />
            pour répondre aus besoins du monde numérique.
          </div>
        </div>
        {/* Desktop principal text */}
        <div className="hidden lg:flex items-center justify-center w-full h-full">
          <h1
            className="principal text-center text-white font-bold max-w-[100vw] mt-[-20vh]" 
            style={{
              fontSize: "clamp(8rem, 14vw, 16rem)", 
              lineHeight: 1,
              wordBreak: "break-word",
            }}
          >
            Développ<span className="text-[#FF4D00]">eur.</span>
          </h1>
        </div>

        {/* Desktop intro text */}
        {/* <div className="hidden">
          <p className="text-white text-sm max-w-xs text-center mt-6 text-gauche">
            Découvrez mon portfolio et explorez mes projets innovants en
            développement web et mobile.
          </p>
        </div> */}
      </div>

      {/* Section du bas */}
      <div className="w-full pb-6 absolute bottom-0 left-0 z-10 flex flex-col items-center">
        {/* Mobile: centered, small */}
        <p className="block lg:hidden text-white text-xs text-center tracking-wide mb-20">
           Portfolio 2025
        </p>
        {/* Desktop: original layout */}
        <div className="hidden lg:flex flex-row justify-between items-center gap-4 w-full px-16 mb-10">
          <p className="text-white text-base max-w-xs text-gauche">
            Découvrez mon portfolio et explorez mes projets innovants en
            développement web et mobile.
          </p>
          <p className="text-white text-xs sm:text-base text-bas mr-36">
            Portfolio  2025
          </p>
          <p className="text-white text-xs sm:text-base text-center lg:text-right text-droite">
            L'avenir ne se prédit pas, <br />
            il s'expérimente.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Accueil;
