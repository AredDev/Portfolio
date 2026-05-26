import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, runTransaction } from "firebase/database";
import { FiGithub, FiFacebook } from "react-icons/fi";
import { useNavigate, useLocation, Link } from "react-router-dom";
import ScrollReveal from "scrollreveal";
import { useLanguage } from "./LanguageContext";

const translations = {
  FR: {
    home: "Accueil",
    about: "À propos",
    contact: "Contact",
    slogan: (
      <>
        Développeur passionné, <br />
        je transforme vos idées en solutions digitales <br />
        modernes et <span className="text-orange">performantes.</span>
      </>
    ),
    tagline1: "Créons ensemble des applications web",
    tagline2: "qui allient performance et innovation.",
    scheduleCall: "Planifier un appel",
    scheduleCalendly: "Planifier dans Calendly",
    visits: "Visites",
  },
  EN: {
    home: "Home",
    about: "About",
    contact: "Contact",
    slogan: (
      <>
        Passionate developer, <br />
        I turn your ideas into digital solutions <br />
        modern and <span className="text-orange">high-performing.</span>
      </>
    ),
    tagline1: "Let's build web applications together",
    tagline2: "that combine performance and innovation.",
    scheduleCall: "Schedule a call",
    scheduleCalendly: "Schedule on Calendly",
    visits: "Visits",
  }
};

// CONFIGURATION SÉCURISÉE VIA .env.local (VITE)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialisation Firebase (avec gestion d'erreur)
let db;
try {
  const app = initializeApp(firebaseConfig, "footer-app");
  db = getDatabase(app);
} catch (error) {
  console.error("Erreur Firebase :", error);
}

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [visits, setVisits] = useState("...");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!db) return;

    const visitsRef = ref(db, "visits");
    const now = Date.now();
    const lastVisit = localStorage.getItem("lastVisitTime");

    // Incrémente 1 fois par jour
    if (!lastVisit || now - parseInt(lastVisit) > 86400000) {
      runTransaction(visitsRef, (current) => (current || 0) + 1).then(() => {
        localStorage.setItem("lastVisitTime", now.toString());
      });
    }

    // Mise à jour en temps réel
    const unsubscribe = onValue(visitsRef, (snapshot) => {
      setVisits(snapshot.val() || 0);
    });

    // ScrollReveal animations
    const sr = ScrollReveal({
      origin: "bottom",
      distance: "30px",
      duration: 1000,
      delay: 200,
      reset: true,
    });

    sr.reveal(".footer-logo", { origin: "left", delay: 300 });
    sr.reveal(".footer-nav", { origin: "right", delay: 400 });
    sr.reveal(".footer-slogan", { delay: 500 });
    sr.reveal(".footer-contact", { interval: 200, delay: 600 });
    sr.reveal(".footer-bottom", { delay: 800 });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <footer id="contact" className="bg-black text-white px-4 md:px-16 py-12 md:py-16">
      {/* Header */}
      <div className="flex flex-row items-start justify-between mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-bold footer-logo">
          <Link to="/">dera.</Link>
        </h2>

        <nav className="grid grid-cols-2 gap-x-12 gap-y-2 md:flex md:gap-8 lg:gap-12 text-right md:text-left footer-nav">
          <Link
            to="/"
            onClick={(e) => {
              if (location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="hover:text-orange-500 transition-colors text-xs sm:text-sm md:text-base"
          >
            {t.home}
          </Link>
          <Link to="/about" className="hover:text-orange-500 transition-colors text-xs sm:text-sm md:text-base">
            {t.about}
          </Link>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="hover:text-orange-500 transition-colors text-xs sm:text-sm md:text-base"
          >
            {t.contact}
          </a>
        </nav>
      </div>

      {/* Slogan */}
      <div className="mb-8 md:mb-28 footer-slogan">
        <h1 className="text-3xl lg:text-5xl font-bold leading-tight text-left md:text-center">
          {t.slogan}
        </h1>
      </div>

      {/* Contacts Mobile */}
      <div className="flex flex-col gap-4 mb-8 md:hidden footer-contact">
        <a
          href="tel:+261341712742"
          className="inline-flex items-center gap-3 border border-white rounded-full px-6 py-3 hover:bg-white hover:text-black transition-colors duration-300 w-full"
        >
          <span className="text-xl">•</span>
          <span className="text-xs font-medium">+261 34 17 127 42</span>
        </a>

        <a
          href="mailto:derasosialy@gmail.com"
          className="inline-flex items-center gap-3 border border-white rounded-full px-6 py-3 hover:bg-white hover:text-black transition-colors duration-300 w-full"
        >
          <span className="text-xl">•</span>
          <span className="text-xs font-medium">@DERASOSIALY@GMAIL.COM</span>
        </a>

        <a
          href="https://calendly.com/derasosialy/new-meeting"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 border border-orange-500 rounded-full px-6 py-3 hover:bg-orange-500 hover:text-white transition-colors duration-300 w-full bg-orange-500/10"
        >
          <span className="text-xl">•</span>
          <span className="text-xs font-medium uppercase tracking-wider">{t.scheduleCall}</span>
        </a>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 footer-contact">
        <div className="text-sm md:text-base text-gray-300">
          <p>{t.tagline1}</p>
          <p>{t.tagline2}</p>
        </div>

        <div className="hidden md:flex flex-row gap-4">
          <a
            href="tel:+261341712742"
            className="inline-flex items-center gap-3 border border-white rounded-full px-6 py-3 hover:bg-white hover:text-black transition-colors duration-300"
          >
            <span className="text-xl">•</span>
            <span className="text-xs font-medium">+261 34 17 127 42</span>
          </a>

          <a
            href="mailto:derasosialy@gmail.com"
            className="inline-flex items-center gap-3 border border-white rounded-full px-6 py-3 hover:bg-white hover:text-black transition-colors duration-300"
          >
            <span className="text-xl">•</span>
            <span className="text-xs font-medium">@DERASOSIALY@GMAIL.COM</span>
          </a>

          <a
            href="https://calendly.com/derasosialy/new-meeting"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-white rounded-full px-6 py-3 hover:bg-white hover:text-black transition-colors duration-300"
          >
            <span className="text-xl">•</span>
            <span className="text-xs font-medium uppercase tracking-wider">{t.scheduleCalendly}</span>
          </a>
        </div>
      </div>

      {/* RÉSEAUX + COMPTEUR + COPYRIGHT */}
      <div className="mt-10 flex flex-col items-center gap-6 md:flex-row md:justify-between md:items-center footer-bottom">
        {/* Icônes sociales */}
        <div className="flex gap-4">
          <a
            href="https://github.com/Areddev"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300"
            aria-label="GitHub"
          >
            <FiGithub className="w-5 h-5" />
          </a>
          <a
            href="https://www.facebook.com/dera.andriamidera"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300"
            aria-label="Facebook"
          >
            <FiFacebook className="w-5 h-5" />
          </a>
        </div>

        {/* Compteur de visites */}
        <div className="text-xs md:text-sm text-gray-400 text-center md:text-left">
          {t.visits} : <span className="font-medium">{visits}</span>
        </div>

        {/* Copyright */}
        <div className="text-xs md:text-sm text-gray-400 text-center md:text-right">
          © portfolio dera 2026
        </div>
      </div>
    </footer>
  );
};

export default Footer;