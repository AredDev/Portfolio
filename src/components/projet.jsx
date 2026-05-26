import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaReact,
  FaNodeJs,
  FaPhp,
  FaLaravel,
  FaSymfony,
  FaVuejs,
  FaAngular,
  FaPython,
  FaDatabase,
  FaJs,
  FaCss3Alt,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiNextdotjs,
  SiNestjs,
  SiTypescript,
  SiStripe,
  SiMongodb,
  SiPostgresql,
  SiFirebase,
  SiFlutter,
  SiDart,
  SiMysql,
  SiPrisma,
  SiGraphql,
  SiRedis,
  SiSvelte,
  SiSupabase,
  SiExpress,
} from "react-icons/si";
import { database } from "../firebase";
import { ref, onValue, runTransaction } from "firebase/database";
import { useLanguage } from "./LanguageContext";

import sary1 from "../images/sirius.webp";
import sary2 from "../images/pro.jpg";
import tourImg from "../images/tour.jpg";
import ibiznaImg from "../images/ibizna.webp";
import ittImg from "../images/itt.jpg";
import hihaonaImg from "../images/hihaona.webp";
import placeholderImg from "../images/placeholder.png";
import portfolioImg from "../images/portfolio.jpg";
import devisImg from "../images/devis.jpg";
import { 
  Book, 
  ShieldCheck, 
  Calculator, 
  Clock, 
  ListChecks, 
  FileText, 
  AlertTriangle, 
  CheckCircle2,
  Users,
  AlertCircle,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

import paieDashboard from "../images/paie/dashboard.jpg";
import paieBienvenue from "../images/paie/Bienevenue.png";
import paieLogin from "../images/paie/Login.png";
import paieEmployes from "../images/paie/Employés.png";
import paiePeriodes from "../images/paie/Périodes.png";
import paieRubrique from "../images/paie/Rubrique.png";
import paieCotisation from "../images/paie/Cotisation.png";
import paieBareme from "../images/paie/Bareme.png";
import paieVariable from "../images/paie/Variable mensuel.png";
import paieBulletin from "../images/paie/Bulletin de paie.png";
import paieUser from "../images/paie/User.png";

import ihiraPhotos from "../images/ihira/photos.png";
import ihiraAccueil from "../images/ihira/Accueil 1.png";
import ihiraFandraisana from "../images/ihira/Fandraisana.png";
import ihiraLogo from "../images/ihira/Logo.png";
import ihiraTononkira from "../images/ihira/Tononkira.png";
import ihiraTononkira1 from "../images/ihira/Tononkira – 1.png";
import ihiraTononkira2 from "../images/ihira/Tononkira – 2.png";

// Custom Card component
const Card = ({ children, className, onClick }) => (
  <div className={`bg-gray-200  p-6 text-xs ${className}`} onClick={onClick}>
    {children}
  </div>
);


// TechBadge avec react-icons
const TechBadge = ({ Icon }) => (
  <div className="w-8 h-8 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center p-1.5 md:p-2 shadow-sm">
    <Icon className="w-full h-full" />
  </div>
);

// === Données projets avec react-icons === 
const projects = [
  {
    id: 11,
    name: "Devis App",
    category: "Demande de désinfection",
    role: "Designer & Développeur",
    link: "https://devis-app-eta.vercel.app/",
    image: devisImg,
    techIcons: [
      { Icon: SiNextdotjs, color: "#000000" },
      { Icon: SiSupabase, color: "#3ECF8E" },
    ],
  },
  {
    id: 12,
    name: "Paie Pro",
    category: "Logiciel de paie",
    role: "Designer & Dev Frontend",
    link: null,
    image: paieDashboard,
    techIcons: [
      { Icon: SiTypescript, color: "#3178C6" },
      { Icon: FaNodeJs, color: "#339933" },
    ],
    gallery: [
      { src: paieDashboard, title: "Tableau de bord" },
      { src: paieBienvenue, title: "Écran d'accueil" },
      { src: paieLogin, title: "Page de connexion" },
      { src: paieEmployes, title: "Gestion des employés" },
      { src: paiePeriodes, title: "Périodes de paie" },
      { src: paieRubrique, title: "Configuration des rubriques" },
      { src: paieCotisation, title: "Cotisations sociales" },
      { src: paieBareme, title: "Barème IRSA" },
      { src: paieVariable, title: "Saisie des variables mensuelles" },
      { src: paieBulletin, title: "Génération de bulletin de paie" },
      { src: paieUser, title: "Profil administrateur" },
    ]
  },
  {
    id: 1,
    name: "Sirius Expédition",
    category: "Web Touristique",
    role: "Développeur Frontend",
    link: "https://surius.netlify.app",
    image: sary1,
    techIcons: [
      { Icon: FaReact, color: "#61DAFB" },
      { Icon: SiExpress, color: "#000000" },
      { Icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    id: 2,
    name: "Antsika Tour",
    category: "Web Touristique",
    role: "Frontend & Designer",
    link: "https://antsikatour.netlify.app",
    image: tourImg,
    techIcons: [
      { Icon: FaLaravel, color: "#FF2D20" },
      { Icon: FaReact, color: "#61DAFB" },
      { Icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    id: 3,
    name: "Ask'ibizna",
    category: "Business Agricole",
    role: "Designer",
    link: "https://ask-ibizna.netlify.app",
    image: ibiznaImg,
    techIcons: [
      { Icon: FaSymfony, color: "#000000" },
      { Icon: FaReact, color: "#61DAFB" },
      { Icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    id: 4,
    name: "Itt Mada",
    category: "Agence Numérique",
    role: "Développeur Frontend",
    link: "https://ittmada.netlify.app",
    image: ittImg,
    techIcons: [
      { Icon: FaReact, color: "#61DAFB" },
      { Icon: FaNodeJs, color: "#339933" },
    ],
  },
  {
    id: 5,
    name: "Hihaona",
    category: "Plateforme de Rencontre",
    role: "Designer & Frontend",
    link: "https://hihaonabizness.netlify.app",
    image: hihaonaImg,
    techIcons: [
      { Icon: SiNestjs, color: "#E0234E" },
      { Icon: FaReact, color: "#61DAFB" },
      { Icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    id: 6,
    name: "Ask'Pro",
    category: "Gestion de Rendez-vous",
    role: "Développeur Frontend",
    link: "https://ask-pro.netlify.app",
    image: sary2,
    techIcons: [
      { Icon: FaLaravel, color: "#FF2D20" },
      { Icon: SiTypescript, color: "#3178C6" },
      { Icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    id: 7,
    name: "Gestion de contrôle d'accès",
    category: "Application Mobile",
    role: "Designer, Frontend & Backend",
    link: null,
    image: placeholderImg,
    techIcons: [
      { Icon: FaLaravel, color: "#FF2D20" },
      { Icon: FaReact, color: "#61DAFB" },
    ],
  },
  {
    id: 8,
    name: "Portfolio",
    category: "Site Personnel",
    role: "Frontend & Designer",
    link: null,
    image: portfolioImg,
    techIcons: [
      { Icon: FaReact, color: "#61DAFB" },
      { Icon: SiTailwindcss, color: "#06B6D4" },
      { Icon: SiFirebase, color: "#FFCA28" },
    ],
  },
  {
    id: 9,
    name: "iSmart",
    category: "Gestion d'emploi du temps",
    role: "Fullstack Mobile (React Native & Nest)",
    link: null,
    image: placeholderImg,
    techIcons: [
      { Icon: FaReact, color: "#61DAFB" },
      { Icon: SiNestjs, color: "#E0234E" },
    ],
    status: "En attente"
  },
  {
    id: 10,
    name: "iHira",
    category: "Répartition chorale",
    role: "Développeur Mobile (Flutter)",
    link: null,
    image: ihiraPhotos,
    techIcons: [
      { Icon: SiFlutter, color: "#02569B" },
      { Icon: SiDart, color: "#0175C2" },
    ],
    gallery: [
      { src: ihiraPhotos, title: "Aperçu des écrans iHira" },
      { src: ihiraLogo, title: "Logo de l'application" },
      { src: ihiraFandraisana, title: "Écran de bienvenue (Fandraisana)" },
      { src: ihiraAccueil, title: "Liste des chants (Accueil)" },
      { src: ihiraTononkira, title: "Paroles & Accords (Tononkira)" },
      { src: ihiraTononkira1, title: "Navigation des strophes" },
      { src: ihiraTononkira2, title: "Détails & Répartition vocale" },
    ]
  },
];

gsap.registerPlugin(ScrollTrigger);

const textTranslations = {
  FR: {
    titlePrefix: "Mes ",
    titleSuffix: "Projets",
    subtitle: "Des expériences digitales uniques et performantes, conçues avec passion.",
    scrollHint: "Scrollez pour voir plus de projets",
    
    // Roles
    "Développeur Frontend": "Développeur Frontend",
    "Frontend & Designer": "Frontend & Designer",
    "Designer": "Designer",
    "Développeur Frontend & Mobile (React Native & Nest)": "Développeur Frontend & Mobile (React Native & Nest)",
    "Développeur Mobile (Flutter)": "Développeur Mobile (Flutter)",
    "Designer, Frontend & Backend": "Designer, Frontend & Backend",
    "Fullstack Mobile (React Native & Nest)": "Fullstack Mobile (React Native & Nest)",
    "Designer & Développeur": "Designer & Développeur",
    "Designer & Dev Frontend": "Designer & Dev Frontend",
    
    // Categories
    "Web Touristique": "Web Touristique",
    "Business Agricole": "Business Agricole",
    "Agence Numérique": "Agence Numérique",
    "Plateforme de Rencontre": "Plateforme de Rencontre",
    "Gestion de Rendez-vous": "Gestion de Rendez-vous",
    "Application Mobile": "Application Mobile",
    "Site Personnel": "Site Personnel",
    "Gestion d'emploi du temps": "Gestion d'emploi du temps",
    "Répartition chorale": "Répartition chorale",
    "Demande de désinfection": "Demande de désinfection",
    "Logiciel de paie": "Logiciel de paie",
    
    // Status
    "En attente": "En attente",
  },
  EN: {
    titlePrefix: "My ",
    titleSuffix: "Projects",
    subtitle: "Unique and high-performance digital experiences, designed with passion.",
    scrollHint: "Scroll to view more projects",
    
    // Roles
    "Développeur Frontend": "Frontend Developer",
    "Frontend & Designer": "Frontend Developer & Designer",
    "Designer": "Designer",
    "Développeur Frontend & Mobile (React Native & Nest)": "Frontend & Mobile Developer (React Native & Nest)",
    "Développeur Mobile (Flutter)": "Mobile Developer (Flutter)",
    "Designer, Frontend & Backend": "Designer, Frontend & Backend Developer",
    "Fullstack Mobile (React Native & Nest)": "Fullstack Mobile Developer (React Native & Nest)",
    "Designer & Développeur": "Designer & Developer",
    "Designer & Dev Frontend": "Designer & Frontend Dev",
    
    // Categories
    "Web Touristique": "Tourism Web App",
    "Business Agricole": "Agricultural Business",
    "Agence Numérique": "Digital Agency",
    "Plateforme de Rencontre": "Dating Platform",
    "Gestion de Rendez-vous": "Appointment Management",
    "Application Mobile": "Mobile App",
    "Site Personnel": "Personal Website",
    "Gestion d'emploi du temps": "Schedule Management",
    "Répartition chorale": "Choir Distribution",
    "Demande de désinfection": "Disinfection Request",
    "Logiciel de paie": "Payroll Software",
    
    // Status
    "En attente": "Pending",
  }
};

const Projet = () => {
  const { language } = useLanguage();
  const t = textTranslations[language];
  const scrollRef = useRef();
  const pinSection = useRef();

  const [likes, setLikes] = useState({});
  const [likedProjects, setLikedProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [docTab, setDocTab] = useState('config');

  useEffect(() => {
    if (selectedProject) {
      setActiveImageIndex(0);
      setDocTab(selectedProject.id === 10 ? 'ihira-pres' : 'config');
    }
  }, [selectedProject]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const localLikes = localStorage.getItem("liked_projects");
    if (localLikes) {
      try {
        setLikedProjects(JSON.parse(localLikes));
      } catch (e) {
        console.error("Error parsing liked projects from localStorage", e);
      }
    }
  }, []);

  useEffect(() => {
    const likesRef = ref(database, "likes");
    const unsubscribe = onValue(likesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setLikes(data);
      } else {
        setLikes({});
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLike = async (projectId, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const localLikes = localStorage.getItem("liked_projects");
    let likedList = [];
    if (localLikes) {
      try {
        likedList = JSON.parse(localLikes);
      } catch (err) {
        likedList = [];
      }
    }

    if (likedList.includes(projectId)) {
      return;
    }

    const newLikedList = [...likedList, projectId];
    setLikedProjects(newLikedList);
    localStorage.setItem("liked_projects", JSON.stringify(newLikedList));

    const projectLikeRef = ref(database, `likes/${projectId}`);
    try {
      await runTransaction(projectLikeRef, (currentValue) => {
        return (currentValue || 0) + 1;
      });
    } catch (error) {
      console.error("Error updating like transaction", error);
      const rolledBackList = likedList.filter((id) => id !== projectId);
      setLikedProjects(rolledBackList);
      localStorage.setItem("liked_projects", JSON.stringify(rolledBackList));
    }
  };

  useEffect(() => {
    const scrollElem = scrollRef.current;
    if (!scrollElem) return;

    const updateAnimation = () => {
      const scrollWidth = scrollElem.scrollWidth - scrollElem.clientWidth;
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf(scrollElem);

      if (window.innerWidth < 1024 || scrollWidth <= 0) {
        gsap.set(scrollElem, { clearProps: "transform" });
        ScrollTrigger.refresh();
        return;
      }

      gsap.to(scrollElem, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: pinSection.current,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    };

    updateAnimation();
    window.addEventListener("resize", updateAnimation);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf(scrollElem);
      window.removeEventListener("resize", updateAnimation);
    };
  }, []);

  return (
    <div className="w-full mb-10 bg-white" ref={pinSection}>
      {/* Title Section */}
      <div className="px-4 md:px-8 py-2 md:py-4 mt-6 md:mt-8 mb-2">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="inline-block border border-black rounded-full px-8 py-2 md:py-4 mb-6">
            <span className="text-xl font-bold tracking-wide">{t.titlePrefix}<span className="text-[#FF4D00] ">{t.titleSuffix}</span></span>
          </div>

          <p className="text-gray-500 text-sm md:text-xl max-w-2xl mx-auto ">
            {t.subtitle}
          </p>
        </div>
      </div>

      {/* Horizontal Scroll Container (Desktop) / Vertical Scroll (Mobile) */}
      <div className="relative w-full overflow-hidden">
        <div
          className="flex flex-col lg:flex-row gap-6 lg:gap-6 px-4 md:px-8 pb-4"
          ref={scrollRef}
          style={{ willChange: "transform" }}
        >
          {projects.map((project) => (
            <Card 
              key={project.id} 
              className={`project-card group relative overflow-hidden ${(project.link || project.gallery) ? 'cursor-pointer' : ''}`}
              onClick={(project.gallery && !project.link) ? () => setSelectedProject(project) : undefined}
            >
              {/* Lien overlay absolu (uniquement si le projet a un lien externe) */}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10 cursor-pointer pointer-events-auto"
                  aria-label={`Visiter ${project.name}`}
                />
              )}

              {/* Conteneur du contenu (pointer-events-none pour laisser passer le clic vers l'overlay) */}
              <div className="relative z-20 w-full h-full flex flex-col justify-between pointer-events-none">
                {/* Badges Technologies */}
                <div className="flex gap-2 justify-between">
                  <div className="flex gap-2 flex-wrap">
                    {project.techIcons.map(({ Icon, color }, index) => (
                      <TechBadge
                        key={index}
                        Icon={(props) => <Icon {...props} style={{ color }} />}
                      />
                    ))}
                  </div>

                  <div className="text-gray-700">
                    <h1 className="text-xs md:text-base">{t[project.role] || project.role}</h1>
                  </div>
                </div>

                {/* Image du Projet */}
                <div className="h-72 md:h-96 rounded-xl relative overflow-hidden group/image min-h-0">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover/image:scale-110 group-hover/image:brightness-110"
                  />
                  {project.status === "En attente" && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
                      <span className="bg-[#FF4D00] text-white px-6 py-2 rounded-full font-bold text-base md:text-lg transform -rotate-12 shadow-xl border-2 border-white/30 whitespace-nowrap">
                        {t["En attente"]}
                      </span>
                    </div>
                  )}
                </div>

                {/* Infos du Projet et Bouton de Like */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex gap-2 flex-wrap">
                      <span className="text-sm font-medium bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm text-black">
                        {project.name}
                      </span>
                      <span className="text-sm font-medium bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm text-black">
                        {t[project.category] || project.category}
                      </span>
                    </div>

                    {/* Bouton de Like (pointer-events-auto pour intercepter les clics) */}
                    <button
                      onClick={(e) => handleLike(project.id, e)}
                      disabled={likedProjects.includes(project.id)}
                      className={`pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 transform active:scale-95 z-30 flex-shrink-0 ${
                        likedProjects.includes(project.id)
                          ? "bg-orange-50 border-[#FF4D00]/20 text-[#FF4D00] cursor-default"
                          : "bg-white border-gray-200 text-gray-400 hover:text-[#FF4D00] hover:border-[#FF4D00]/30 hover:bg-orange-50/50 cursor-pointer shadow-sm"
                      } group/like`}
                    >
                      <span className={`transition-transform duration-300 ${!likedProjects.includes(project.id) ? "group-hover/like:scale-120 group-hover/like:rotate-12" : ""}`}>
                        {likedProjects.includes(project.id) ? (
                          <FaHeart className="w-4 h-4 text-[#FF4D00]" />
                        ) : (
                          <FaRegHeart className="w-4 h-4" />
                        )}
                      </span>
                      <span className={`text-xs md:text-sm font-bold ${likedProjects.includes(project.id) ? "text-gray-900" : "text-gray-500"}`}>
                        {likes[project.id] || 0}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="hidden lg:block text-center mt-4 text-sm text-gray-500 px-4 md:px-8">
        {t.scrollHint}
      </div>

      {/* Detail Modal */}
      {selectedProject && (
        <>
          <div 
            className="fixed inset-0 bg-black/75 backdrop-blur-md z-[100] transition-opacity duration-300"
            onClick={() => setSelectedProject(null)}
          />
          <div className="fixed inset-4 md:inset-8 lg:inset-12 xl:inset-20 z-[110] bg-gray-50 text-gray-900 rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden border border-gray-250 max-h-[92vh] max-w-[1400px] mx-auto my-auto transition-all duration-300 scale-100">
            
            {/* Left Column: Gallery / Images */}
            <div className="w-full lg:w-1/2 bg-gray-950 p-6 flex flex-col justify-between relative text-white border-b lg:border-b-0 lg:border-r border-gray-800 shrink-0 min-h-[350px] lg:min-h-0 lg:h-full">
              {/* Top details and image index */}
              <div className="flex justify-between items-center text-xs text-gray-400 mb-2 shrink-0">
                <span className="bg-gray-850 px-2.5 py-1 rounded-full font-semibold">
                  {activeImageIndex + 1} / {selectedProject.gallery.length}
                </span>
                <span className="text-gray-300 font-semibold max-w-[70%] truncate">
                  {selectedProject.gallery[activeImageIndex].title}
                </span>
              </div>

              {/* Big Image display */}
              <div className="flex-1 flex items-center justify-center relative overflow-hidden rounded-2xl bg-gray-900 group">
                <img 
                  src={selectedProject.gallery[activeImageIndex].src} 
                  alt={selectedProject.gallery[activeImageIndex].title} 
                  className="max-h-[250px] md:max-h-[350px] lg:max-h-[450px] max-w-full object-contain transition-all duration-500 rounded-xl"
                />
                
                {/* Arrow buttons */}
                <button 
                  onClick={() => setActiveImageIndex((prev) => (prev - 1 + selectedProject.gallery.length) % selectedProject.gallery.length)}
                  className="absolute left-3 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 z-10 cursor-pointer pointer-events-auto"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={() => setActiveImageIndex((prev) => (prev + 1) % selectedProject.gallery.length)}
                  className="absolute right-3 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 z-10 cursor-pointer pointer-events-auto"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Thumbnails list */}
              <div className="flex gap-2 overflow-x-auto pt-4 shrink-0 scrollbar-none">
                {selectedProject.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-12 h-12 lg:w-16 lg:h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all cursor-pointer pointer-events-auto ${
                      activeImageIndex === idx ? 'border-[#FF4D00] scale-95 shadow-lg' : 'border-gray-800 hover:border-gray-600'
                    }`}
                  >
                    <img src={img.src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Scrollable interactive details */}
            <div className="w-full lg:w-1/2 flex flex-col h-full bg-white relative overflow-hidden">
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)} 
                className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-700 p-2.5 rounded-full z-20 transition-colors cursor-pointer pointer-events-auto"
                aria-label="Fermer"
              >
                <X size={20} />
              </button>

              {/* Header section */}
              <div className="p-6 md:p-8 border-b border-gray-150 shrink-0 pr-16 bg-gray-50/50">
                <div className="flex gap-2 mb-3">
                  {selectedProject.techIcons.map(({ Icon, color }, index) => (
                    <div key={index} className="w-8 h-8 bg-white rounded-full flex items-center justify-center p-1.5 shadow-sm border border-gray-100">
                      <Icon className="w-full h-full" style={{ color }} />
                    </div>
                  ))}
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">{selectedProject.name}</h2>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span className="font-bold text-[#FF4D00]">{t[selectedProject.category] || selectedProject.category}</span>
                  <span>•</span>
                  <span className="font-semibold text-gray-700">{t[selectedProject.role] || selectedProject.role}</span>
                </div>
              </div>

              {/* Scrollable Document Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-thin scrollbar-thumb-gray-200">
                
                {/* Custom Documentation Admin Interactive Component */}
                <div>
                  
                  {/* Tabs bar */}
                  <div className="flex gap-2 border-b border-gray-200 overflow-x-auto pb-1 mb-6 shrink-0 scrollbar-none">
                    {(selectedProject.id === 10
                      ? [
                          { id: 'ihira-pres', label: 'Présentation', icon: ShieldCheck },
                          { id: 'ihira-tononkira', label: 'Chants & Paroles', icon: Book },
                          { id: 'ihira-repartition', label: 'Répartition Chorale', icon: Users },
                          { id: 'ihira-flutter', label: 'Architecture', icon: Clock },
                        ]
                      : [
                          { id: 'config', label: 'Configuration', icon: ShieldCheck },
                          { id: 'cotisations', label: 'Cotisations', icon: ListChecks },
                          { id: 'irsa', label: 'IRSA', icon: Calculator },
                          { id: 'heures-sup', label: 'Heures Sup.', icon: Clock },
                          { id: 'rubriques', label: 'Rubriques', icon: Book },
                          { id: 'variables', label: 'Variables', icon: FileText },
                        ]
                    ).map((tab) => {
                      const TabIcon = tab.icon;
                      const isActive = docTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setDocTab(tab.id)}
                          className={`flex items-center gap-2 px-4 py-2 border-b-2 font-bold text-xs md:text-sm transition-all whitespace-nowrap cursor-pointer pointer-events-auto ${
                            isActive 
                              ? 'border-[#FF4D00] text-[#FF4D00]' 
                              : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                          }`}
                        >
                          <TabIcon size={16} />
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Render active tab content */}
                  {docTab === 'config' && (
                    <div className="flex flex-col gap-6">
                      <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
                        <div className="flex items-center gap-3 mb-3 text-red-700">
                          <AlertTriangle size={20} className="shrink-0" />
                          <h4 className="font-bold text-sm md:text-base">⚠️ Configuration obligatoire</h4>
                        </div>
                        <p className="text-red-850 text-xs md:text-sm mb-3 font-semibold">
                          L'application est livrée vide. Avant toute utilisation, vous DEVEZ configurer :
                        </p>
                        <ul className="text-red-700 text-xs md:text-sm space-y-1 pl-5 list-disc font-semibold">
                          <li>Les périodes de paie</li>
                          <li>Les rubriques (vérifier les codes)</li>
                          <li>Les cotisations sociales</li>
                          <li>Le barème IRSA</li>
                          <li>Les employés</li>
                        </ul>
                      </div>

                      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
                        <div className="flex items-center gap-3 mb-3 text-emerald-700">
                          <CheckCircle2 size={20} className="shrink-0" />
                          <h4 className="font-bold text-sm md:text-base">🔑 Codes cotisations obligatoires</h4>
                        </div>
                        <p className="text-emerald-800 text-xs md:text-sm mb-4">Le backend reconnaît UNIQUEMENT ces codes :</p>
                        <div className="flex gap-3 flex-wrap">
                          <span className="bg-emerald-100 text-emerald-900 px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold border border-emerald-200">
                            CNaPS → 1% / 13%
                          </span>
                          <span className="bg-emerald-100 text-emerald-900 px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold border border-emerald-200">
                            OSTIE → 1% / 5%
                          </span>
                          <span className="bg-red-100 text-red-900 px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold border border-red-200">
                            ⚠️ FMFPR → 0% / 1% (Pas FMFP)
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 hover:bg-gray-100 border border-gray-150 rounded-2xl p-4 transition-all duration-300">
                          <ShieldCheck size={24} className="text-[#FF4D00] mb-2" />
                          <h5 className="font-bold text-gray-900 text-sm mb-1">1. Créer les périodes</h5>
                          <p className="text-xs text-gray-500 leading-relaxed">
                            Créer les mois/années de paie. Une fois clôturée, une période ne peut plus être modifiée.
                          </p>
                        </div>
                        <div className="bg-gray-50 hover:bg-gray-100 border border-gray-150 rounded-2xl p-4 transition-all duration-300">
                          <ListChecks size={24} className="text-[#FF4D00] mb-2" />
                          <h5 className="font-bold text-gray-900 text-sm mb-1">2. Vérifier les rubriques</h5>
                          <p className="text-xs text-gray-500 leading-relaxed">
                            S'assurer que SAL_BASE, CNaPS, OSTIE, FMFPR, IRSA existent avec les bons codes.
                          </p>
                        </div>
                        <div className="bg-gray-50 hover:bg-gray-100 border border-gray-150 rounded-2xl p-4 transition-all duration-300">
                          <Calculator size={24} className="text-[#FF4D00] mb-2" />
                          <h5 className="font-bold text-gray-900 text-sm mb-1">3. Configurer le barème IRSA</h5>
                          <p className="text-xs text-gray-500 leading-relaxed">
                            Vérifier les 5 tranches et taux (0%, 5%, 10%, 15%, 20%).
                          </p>
                        </div>
                        <div className="bg-gray-50 hover:bg-gray-100 border border-gray-150 rounded-2xl p-4 transition-all duration-300">
                          <Users size={24} className="text-[#FF4D00] mb-2" />
                          <h5 className="font-bold text-gray-900 text-sm mb-1">4. Ajouter les employés</h5>
                          <p className="text-xs text-gray-500 leading-relaxed">
                            Renseigner matricule, salaire de base, enfants à charge.
                          </p>
                        </div>
                      </div>

                      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                        <div className="flex items-center gap-3 mb-4 text-amber-850">
                          <AlertCircle size={20} className="shrink-0" />
                          <h4 className="font-bold text-sm md:text-base">🛠️ Dépannage - Erreurs fréquentes</h4>
                        </div>
                        <div className="space-y-3">
                          <div className="p-3.5 bg-white border border-amber-100 rounded-xl">
                            <strong className="text-red-650 text-xs block mb-1">❌ "Cotisation FMFPR non trouvée"</strong>
                            <p className="text-xs text-gray-600">Vérifier que le code est bien <code className="bg-red-50 text-red-750 px-1.5 py-0.5 rounded font-mono text-[11px] border border-red-100">FMFPR</code> (pas FMFP)</p>
                          </div>
                          <div className="p-3.5 bg-white border border-amber-100 rounded-xl">
                            <strong className="text-red-655 text-xs block mb-1">❌ "Base imposable incorrecte"</strong>
                            <p className="text-xs text-gray-600">Vérifier que les rubriques ont <code>est_imposable_irsa = true</code></p>
                          </div>
                          <div className="p-3.5 bg-white border border-amber-100 rounded-xl">
                            <strong className="text-red-655 text-xs block mb-1">❌ "Heures sup non majorées"</strong>
                            <p className="text-xs text-gray-600">Vérifier <code>mode_calcul = TAUX_HORAIRE</code> et <code>pourcentage_base = 30 ou 50</code></p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-150 rounded-2xl p-4">
                        <h5 className="font-bold text-blue-900 text-sm mb-1">📐 Formule du taux horaire</h5>
                        <p className="font-mono text-sm text-blue-950 font-extrabold mb-1">
                          Taux horaire = Salaire de base / 173,33
                        </p>
                        <p className="text-[11px] text-blue-700">
                          173,33 = (40 heures × 52 semaines) / 12 mois
                        </p>
                      </div>
                    </div>
                  )}

                  {docTab === 'cotisations' && (
                    <div className="flex flex-col gap-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        
                        {/* CNaPS */}
                        <div className="bg-white border border-gray-250 rounded-2xl p-4 shadow-sm border-t-4 border-t-blue-500 flex flex-col justify-between">
                          <div>
                            <h4 className="font-bold text-gray-900 text-lg mb-1">CNaPS</h4>
                            <p className="text-[10px] text-gray-400 mb-4 uppercase tracking-wider font-semibold">Caisse Prévoyance</p>
                            <div className="space-y-2.5">
                              <div className="flex justify-between text-xs py-1 border-b border-gray-100">
                                <span className="text-gray-500 font-semibold">Part Salarié</span>
                                <span className="font-bold text-blue-600 text-sm">1%</span>
                              </div>
                              <div className="flex justify-between text-xs py-1 border-b border-gray-100">
                                <span className="text-gray-500 font-semibold">Part Employeur</span>
                                <span className="font-bold text-blue-600 text-sm">13%</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 pt-3 border-t border-gray-55">
                            <span className="text-[10px] text-gray-400 block font-semibold">Assiette :</span>
                            <span className="text-xs font-bold text-gray-700">Salaire Brut (plafonné)</span>
                          </div>
                        </div>

                        {/* OSTIE */}
                        <div className="bg-white border border-gray-250 rounded-2xl p-4 shadow-sm border-t-4 border-t-emerald-500 flex flex-col justify-between">
                          <div>
                            <h4 className="font-bold text-gray-900 text-lg mb-1">OSTIE</h4>
                            <p className="text-[10px] text-gray-400 mb-4 uppercase tracking-wider font-semibold">Médecine du travail</p>
                            <div className="space-y-2.5">
                              <div className="flex justify-between text-xs py-1 border-b border-gray-100">
                                <span className="text-gray-500 font-semibold">Part Salarié</span>
                                <span className="font-bold text-emerald-600 text-sm">1%</span>
                              </div>
                              <div className="flex justify-between text-xs py-1 border-b border-gray-100">
                                <span className="text-gray-500 font-semibold">Part Employeur</span>
                                <span className="font-bold text-emerald-600 text-sm">5%</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 pt-3 border-t border-gray-55">
                            <span className="text-[10px] text-gray-400 block font-semibold">Assiette :</span>
                            <span className="text-xs font-bold text-gray-700">Salaire Brut</span>
                          </div>
                        </div>

                        {/* FMFPR */}
                        <div className="bg-white border border-gray-250 rounded-2xl p-4 shadow-sm border-t-4 border-t-purple-500 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-bold text-gray-900 text-lg">FMFPR</h4>
                              <span className="bg-red-50 text-red-650 text-[9px] font-bold px-2 py-0.5 rounded-full border border-red-100">Code exact</span>
                            </div>
                            <p className="text-[10px] text-gray-400 mb-4 uppercase tracking-wider font-semibold">Fonds Formation</p>
                            <div className="space-y-2.5">
                              <div className="flex justify-between text-xs py-1 border-b border-gray-100">
                                <span className="text-gray-500 font-semibold">Part Salarié</span>
                                <span className="font-bold text-purple-600 text-sm">0%</span>
                              </div>
                              <div className="flex justify-between text-xs py-1 border-b border-gray-100">
                                <span className="text-gray-500 font-semibold">Part Employeur</span>
                                <span className="font-bold text-purple-600 text-sm">1%</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 pt-3 border-t border-gray-55">
                            <span className="text-[10px] text-gray-400 block font-semibold">Assiette :</span>
                            <span className="text-xs font-bold text-gray-700">Salaire Brut</span>
                          </div>
                        </div>

                      </div>

                      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                        <h5 className="font-bold text-amber-900 text-sm mb-2">📊 Plafond CNaPS</h5>
                        <p className="text-xs text-amber-800 leading-relaxed font-semibold">
                          La CNaPS est plafonnée à <strong>8 fois le SMIG</strong> (Salaire Minimum Interprofessionnel Garanti).<br/>
                          <strong>SMIG 2025-2026 :</strong> 300 000 Ar → Plafond CNaPS : <strong>2 400 000 Ar</strong>
                        </p>
                      </div>
                    </div>
                  )}

                  {docTab === 'irsa' && (
                    <div className="flex flex-col gap-6">
                      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                        <div className="p-4 bg-gray-50 border-b border-gray-100">
                          <h4 className="font-bold text-gray-900 text-sm">📊 Barème IRSA 2025-2026</h4>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="bg-gray-100 text-gray-500 font-semibold border-b border-gray-200">
                                <th className="p-3">Tranche</th>
                                <th className="p-3">De (Ar)</th>
                                <th className="p-3">À (Ar)</th>
                                <th className="p-3 text-right">Taux</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-150 font-bold">
                              <tr className="hover:bg-gray-50"><td className="p-3 text-gray-500">1</td><td className="p-3">0</td><td className="p-3">350 000</td><td className="p-3 text-right text-gray-900">0%</td></tr>
                              <tr className="hover:bg-gray-50 bg-gray-50/30"><td className="p-3 text-gray-500">2</td><td className="p-3">350 001</td><td className="p-3">400 000</td><td className="p-3 text-right text-gray-900">5%</td></tr>
                              <tr className="hover:bg-gray-50"><td className="p-3 text-gray-500">3</td><td className="p-3">400 001</td><td className="p-3">500 000</td><td className="p-3 text-right text-gray-900">10%</td></tr>
                              <tr className="hover:bg-gray-50 bg-gray-50/30"><td className="p-3 text-gray-500">4</td><td className="p-3">500 001</td><td className="p-3">600 000</td><td className="p-3 text-right text-gray-900">15%</td></tr>
                              <tr className="hover:bg-gray-50"><td className="p-3 text-gray-500">5</td><td className="p-3">600 001</td><td className="p-3">∞</td><td className="p-3 text-right text-gray-900">20%</td></tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-emerald-50 border border-emerald-150 rounded-2xl p-4">
                          <Calculator size={24} className="text-emerald-600 mb-2" />
                          <h5 className="font-bold text-emerald-950 text-xs mb-1">Abattement forfaitaire</h5>
                          <p className="text-sm font-extrabold text-emerald-900">2% <span className="font-normal text-xs text-emerald-700">du brut imposable</span></p>
                        </div>
                        <div className="bg-blue-50 border border-blue-150 rounded-2xl p-4">
                          <Users size={24} className="text-blue-600 mb-2" />
                          <h5 className="font-bold text-blue-950 text-xs mb-1">Décote par enfant</h5>
                          <p className="text-sm font-extrabold text-blue-900">2 000 Ar <span className="font-normal text-xs text-blue-700">par enfant</span></p>
                        </div>
                        <div className="bg-red-50 border border-red-150 rounded-2xl p-4">
                          <AlertTriangle size={24} className="text-red-600 mb-2" />
                          <h5 className="font-bold text-red-950 text-xs mb-1">Minimum IRSA</h5>
                          <p className="text-sm font-extrabold text-red-900">3 000 Ar <span className="font-normal text-xs text-red-700">minimum à retenir</span></p>
                        </div>
                      </div>

                      <div className="bg-gray-900 text-gray-100 rounded-2xl p-5 font-mono text-xs space-y-1.5 border border-gray-800 shadow-md">
                        <p className="font-bold text-gray-400 block mb-2 text-[10px] uppercase tracking-widest">📐 Formule algorithmique de calcul</p>
                        <p><span className="text-blue-400">1. Brut imposable</span> = Salaire brut - Cotisations (CNaPS + OSTIE)</p>
                        <p><span className="text-blue-400">2. Abattement</span> = Brut imposable × 2%</p>
                        <p><span className="text-blue-400">3. Base IRSA</span> = Brut imposable - Abattement</p>
                        <p><span className="text-blue-400">4. IRSA brut</span> = Somme des (tranche × taux)</p>
                        <p><span className="text-blue-400">5. IRSA net</span> = IRSA brut - (2 000 Ar × nombre d'enfants)</p>
                        <p><span className="text-amber-400">6. Minimum</span> = Si IRSA net &gt; 0 et &lt; 3 000 Ar → IRSA = 3 000 Ar</p>
                      </div>
                    </div>
                  )}

                  {docTab === 'heures-sup' && (
                    <div className="flex flex-col gap-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                          <div className="text-2xl font-extrabold text-blue-600 mb-1">130%</div>
                          <p className="font-bold text-xs text-gray-850">HS 130%</p>
                          <p className="text-[10px] text-gray-450">Heures 41 à 48 (+30%)</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                          <div className="text-2xl font-extrabold text-blue-600 mb-1">150%</div>
                          <p className="font-bold text-xs text-gray-850">HS 150%</p>
                          <p className="text-[10px] text-gray-450">Au-delà de 48h (+50%)</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                          <div className="text-2xl font-extrabold text-emerald-600 mb-1">140%</div>
                          <p className="font-bold text-xs text-gray-850">Dimanche</p>
                          <p className="text-[10px] text-gray-450">Travail dominical (+40%)</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                          <div className="text-2xl font-extrabold text-purple-600 mb-1">150%</div>
                          <p className="font-bold text-xs text-gray-850">Jours fériés</p>
                          <p className="text-[10px] text-gray-450">Jours chômés (+50%)</p>
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-150 rounded-2xl p-5">
                        <h5 className="font-bold text-blue-900 text-sm mb-3">📐 Exemple concret de calcul</h5>
                        <p className="font-mono text-xs text-blue-950 mb-1">
                          Salaire base = 900 000 Ar → Taux horaire = 900 000 / 173,33 = <strong>5 192 Ar/h</strong>
                        </p>
                        <p className="font-mono text-xs text-blue-950">
                          5 heures à 130% → 5 × 5 192 × 1,30 = <strong>33 748 Ar</strong>
                        </p>
                      </div>
                    </div>
                  )}

                  {docTab === 'rubriques' && (
                    <div className="flex flex-col gap-6">
                      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                        <div className="p-4 bg-gray-50 border-b border-gray-100">
                          <h4 className="font-bold text-gray-900 text-sm">📋 Liste des rubriques système</h4>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="bg-gray-100 text-gray-500 font-semibold border-b border-gray-200">
                                <th className="p-3">Code</th>
                                <th className="p-3">Libellé</th>
                                <th className="p-3">Type</th>
                                <th className="p-3">Mode calcul</th>
                                <th className="p-3 text-center">Modifiable</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-150 font-semibold">
                              <tr className="hover:bg-gray-50"><td className="p-3 font-mono font-bold text-[#FF4D00]">SAL_BASE</td><td className="p-3 text-gray-700">Salaire de base</td><td className="p-3 text-gray-600">GAIN</td><td className="p-3">FIXE</td><td className="p-3 text-center text-red-500">❌</td></tr>
                              <tr className="hover:bg-gray-50 bg-gray-50/20"><td className="p-3 font-mono font-bold text-[#FF4D00]">PRIME_PROD</td><td className="p-3 text-gray-700">Prime production</td><td className="p-3 text-gray-600">PRIME</td><td className="p-3">FIXE</td><td className="p-3 text-center text-emerald-500">✅</td></tr>
                              <tr className="hover:bg-gray-50"><td className="p-3 font-mono font-bold text-[#FF4D00]">HEURE130</td><td className="p-3 text-gray-700">HS 130%</td><td className="p-3 text-gray-600">GAIN</td><td className="p-3">TAUX_HORAIRE</td><td className="p-3 text-center text-emerald-500">✅</td></tr>
                              <tr className="hover:bg-gray-50 bg-gray-50/20"><td className="p-3 font-mono font-bold text-[#FF4D00]">HEURE150</td><td className="p-3 text-gray-700">HS 150%</td><td className="p-3 text-gray-600">GAIN</td><td className="p-3">TAUX_HORAIRE</td><td className="p-3 text-center text-emerald-500">✅</td></tr>
                              <tr className="hover:bg-gray-50"><td className="p-3 font-mono font-bold text-[#FF4D00]">CNaPS</td><td className="p-3 text-gray-700">CNaPS</td><td className="p-3 text-gray-600">RETENUE</td><td className="p-3">POURCENTAGE_SALAIRE</td><td className="p-3 text-center text-red-500">❌</td></tr>
                              <tr className="hover:bg-gray-50 bg-gray-50/20"><td className="p-3 font-mono font-bold text-[#FF4D00]">OSTIE</td><td className="p-3 text-gray-700">OSTIE</td><td className="p-3 text-gray-600">RETENUE</td><td className="p-3">POURCENTAGE_SALAIRE</td><td className="p-3 text-center text-red-500">❌</td></tr>
                              <tr className="hover:bg-gray-50"><td className="p-3 font-mono font-bold text-[#FF4D00]">FMFPR</td><td className="p-3 text-gray-700">FMFPR</td><td className="p-3 text-gray-600">RETENUE</td><td className="p-3">POURCENTAGE_SALAIRE</td><td className="p-3 text-center text-red-500">❌</td></tr>
                              <tr className="hover:bg-gray-50 bg-gray-50/20"><td className="p-3 font-mono font-bold text-[#FF4D00]">IRSA</td><td className="p-3 text-gray-700">IRSA</td><td className="p-3 text-gray-600">RETENUE</td><td className="p-3">FIXE</td><td className="p-3 text-center text-red-500">❌</td></tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex gap-3">
                        <AlertTriangle size={24} className="text-red-600 shrink-0" />
                        <div>
                          <h5 className="font-bold text-red-950 text-sm mb-1">⚠️ Rubriques à NE PAS modifier</h5>
                          <p className="text-xs text-red-800 leading-relaxed font-semibold">
                            SAL_BASE, CNaPS, OSTIE, FMFPR, IRSA sont essentielles au moteur de calcul.
                            Leur modification peut causer des erreurs irrécupérables dans les bulletins.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {docTab === 'variables' && (
                    <div className="flex flex-col gap-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
                          <div className="flex items-center gap-3 mb-4 text-emerald-800">
                            <CheckCircle2 size={20} className="shrink-0" />
                            <h3 className="font-bold text-sm md:text-base">✅ À saisir (variables)</h3>
                          </div>
                          <ul className="space-y-2 text-xs md:text-sm text-emerald-950 font-semibold list-disc pl-5">
                            <li>Heures supplémentaires (HEURE130, HEURE150)</li>
                            <li>Primes exceptionnelles (PRIME_PROD)</li>
                            <li>Indemnités forfaitaires (TRANSPORT, REPAS)</li>
                            <li>Avantages en nature (AV_NATURE)</li>
                            <li>Avances sur salaire</li>
                            <li>Absences / Retards</li>
                          </ul>
                        </div>

                        <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
                          <div className="flex items-center gap-3 mb-4 text-red-800">
                            <Calculator size={20} className="shrink-0" />
                            <h3 className="font-bold text-sm md:text-base">❌ Automatiques (non saisissables)</h3>
                          </div>
                          <ul className="space-y-2 text-xs md:text-sm text-red-950 font-semibold list-disc pl-5">
                            <li>Salaire de base (SAL_BASE) - vient de la fiche employé</li>
                            <li>CNaPS - calculé automatiquement</li>
                            <li>OSTIE - calculé automatiquement</li>
                            <li>FMFPR - calculé automatiquement</li>
                            <li>IRSA - calculé automatiquement</li>
                          </ul>
                        </div>

                      </div>

                      <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-2xl p-5 flex gap-3">
                        <FileText size={24} className="text-blue-600 shrink-0" />
                        <div>
                          <h5 className="font-bold text-blue-950 text-sm mb-1">💡 Bonne pratique</h5>
                          <p className="text-xs text-blue-800 leading-relaxed font-semibold">
                            Saisir les variables mensuelles AVANT de calculer le bulletin. 
                            Une fois le bulletin validé, la période est clôturée et plus aucune modification n'est possible.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* iHira Tabs content */}
                  {docTab === 'ihira-pres' && (
                    <div className="flex flex-col gap-6">
                      <div className="bg-[#EEF2F6] border border-[#CFD8DC] rounded-2xl p-5">
                        <div className="flex items-center gap-3 mb-3 text-slate-800">
                          <ShieldCheck size={24} className="text-[#02569B] shrink-0" />
                          <h4 className="font-extrabold text-sm md:text-base text-slate-900">🎵 Présentation générale de iHira</h4>
                        </div>
                        <p className="text-slate-700 text-xs md:text-sm leading-relaxed mb-3 text-justify">
                          <strong>iHira</strong> est une application mobile d'excellence conçue spécialement pour faciliter la gestion quotidienne des chorales, des groupes de chant et des assemblées musicales. Elle permet d'éliminer le besoin de carnets de chants physiques en offrant une numérisation haute performance des répertoires et un outil intelligent de répartition vocale.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                          <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                            <span className="font-bold text-xs text-[#02569B] block mb-1">📖 Gestion de Répertoire</span>
                            <p className="text-[11px] text-gray-500">Accès instantané à des centaines de chants, triés par catégorie, recueil ou thématique liturgique.</p>
                          </div>
                          <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                            <span className="font-bold text-xs text-[#02569B] block mb-1">👥 Répartition des Pupitres</span>
                            <p className="text-[11px] text-gray-500">Gestion interactive des voix Soprano, Alto, Ténor et Basse pour une préparation optimale des répétitions.</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-2xl p-5">
                        <div className="flex items-center gap-3 mb-3 text-blue-800">
                          <CheckCircle2 size={20} className="shrink-0" />
                          <h4 className="font-bold text-sm md:text-base">✨ Fonctionnalités Majeures</h4>
                        </div>
                        <ul className="space-y-2 text-xs md:text-sm text-blue-900 font-semibold list-disc pl-5">
                          <li><strong>Affichage dynamique des paroles</strong> optimisé pour la lecture pendant le chant.</li>
                          <li><strong>Recherche ultra-rapide</strong> par titre, numéro de cantique ou bribes de paroles.</li>
                          <li><strong>Mode 100% hors-ligne</strong> pour une utilisation fiable dans n'importe quel édifice ou lieu de répétition.</li>
                          <li><strong>Transposition d'accords</strong> à la volée pour les guitaristes, pianistes et chefs de chœur.</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {docTab === 'ihira-tononkira' && (
                    <div className="flex flex-col gap-6">
                      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                        <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                          <h4 className="font-bold text-gray-900 text-sm">📋 Types de Recueils Disponibles</h4>
                          <span className="bg-[#02569B]/10 text-[#02569B] text-[10px] font-bold px-2 py-0.5 rounded-full">Offline database</span>
                        </div>
                        <div className="divide-y divide-gray-100 font-semibold text-xs">
                          <div className="p-3.5 hover:bg-gray-50 flex justify-between items-center">
                            <div>
                              <span className="font-bold text-gray-900 block">Fihirana Fiangonana</span>
                              <span className="text-[10px] text-gray-450 font-normal">Cantiques traditionnels protestants et œcuméniques</span>
                            </div>
                            <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-mono text-[10px]">FF</span>
                          </div>
                          <div className="p-3.5 hover:bg-gray-50 flex justify-between items-center">
                            <div>
                              <span className="font-bold text-gray-900 block">Antema & Choeurs</span>
                              <span className="text-[10px] text-gray-455 font-normal">Chants chorals complexes et hymnes classiques</span>
                            </div>
                            <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-mono text-[10px]">ANT</span>
                          </div>
                          <div className="p-3.5 hover:bg-gray-50 flex justify-between items-center">
                            <div>
                              <span className="font-bold text-gray-900 block">Chants de Réveil (Fifohazana)</span>
                              <span className="text-[10px] text-gray-455 font-normal">Cantiques rythmés de célébration et louange spirituelle</span>
                            </div>
                            <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-mono text-[10px]">FIF</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                        <h5 className="font-bold text-amber-900 text-sm mb-2">🎸 Support des Accords Musicaux</h5>
                        <p className="text-xs text-amber-800 leading-relaxed font-semibold">
                          L'application intègre un afficheur d'accords au-dessus des paroles. D'un simple geste, l'utilisateur peut transposer les accords pour s'adapter à la tessiture des chanteurs ou à la tonalité des instruments d'accompagnement.
                        </p>
                      </div>
                    </div>
                  )}

                  {docTab === 'ihira-repartition' && (
                    <div className="flex flex-col gap-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm border-t-4 border-t-pink-500">
                          <div className="text-xl font-extrabold text-pink-600 mb-1">Soprano</div>
                          <p className="font-bold text-xs text-gray-850">Voix 1 (Aigüe)</p>
                          <p className="text-[10px] text-gray-400">Pupitre Féminin</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm border-t-4 border-t-purple-500">
                          <div className="text-xl font-extrabold text-purple-600 mb-1">Alto</div>
                          <p className="font-bold text-xs text-gray-850">Voix 2 (Grave)</p>
                          <p className="text-[10px] text-gray-400">Pupitre Féminin</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm border-t-4 border-t-blue-500">
                          <div className="text-xl font-extrabold text-blue-600 mb-1">Ténor</div>
                          <p className="font-bold text-xs text-gray-850">Voix 3 (Aigüe)</p>
                          <p className="text-[10px] text-gray-400">Pupitre Masculin</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm border-t-4 border-t-emerald-500">
                          <div className="text-xl font-extrabold text-emerald-600 mb-1">Basse</div>
                          <p className="font-bold text-xs text-gray-850">Voix 4 (Grave)</p>
                          <p className="text-[10px] text-gray-400">Pupitre Masculin</p>
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-150 rounded-2xl p-5">
                        <h5 className="font-bold text-blue-900 text-sm mb-3">🎧 Guides Vocaux & Auditions</h5>
                        <p className="text-xs text-blue-800 leading-relaxed font-semibold">
                          Le module de répartition vocale permet aux choristes d'écouter les guides mélodiques isolés par pupitre (par exemple, jouer uniquement la voix d'Alto avec accompagnement atténué) pour faciliter l'apprentissage à la maison ou en dehors des répétitions physiques.
                        </p>
                      </div>
                    </div>
                  )}

                  {docTab === 'ihira-flutter' && (
                    <div className="flex flex-col gap-6">
                      <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 font-mono text-xs space-y-2 border border-slate-800 shadow-md">
                        <p className="font-bold text-[#0175C2] block mb-2 text-[10px] uppercase tracking-widest">🛠️ Stack Technique iHira (Flutter & Dart)</p>
                        <p><span className="text-purple-400">• Framework</span> : Flutter (UI multiplateforme ultra fluide à 60fps)</p>
                        <p><span className="text-purple-400">• State Management</span> : flutter_bloc (architecture prédictible et maintenable)</p>
                        <p><span className="text-purple-400">• Base de données</span> : SQFlite / Hive (stockage local sécurisé pour mode offline)</p>
                        <p><span className="text-purple-400">• Accompagnement</span> : flutter_midi / custom audio engine pour l'apprentissage des pupitres</p>
                        <p><span className="text-purple-400">• UI Design</span> : Material Design 3 personnalisé, avec Dark/Light themes harmonieux</p>
                      </div>

                      <div className="bg-gray-50 border border-gray-150 rounded-2xl p-4">
                        <h5 className="font-bold text-gray-900 text-sm mb-1">📈 Performances de rendu</h5>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          Grâce à Flutter, iHira assure des performances natives excellentes sur Android et iOS. Le chargement instantané de la base de données de chants, combiné à des transitions fluides, garantit une expérience utilisateur optimale pour tous les membres de la chorale.
                        </p>
                      </div>
                    </div>
                  )}

                </div>

              </div>

            </div>

          </div>
        </>
      )}

      {/* CSS */}
      <style jsx>{`
        :root { --gap: 24px; }

        /* Hide Scrollbar */
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Mobile: Grande card avec image pleine */
        .project-card {
          flex: 0 0 auto;
          width: 100%;
          max-width: 100%;
          height: 480px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 6px 18px rgba(10,10,10,0.06);
          border-radius: 0.75rem;
        }

        /* Tablet */
        @media (min-width: 640px) {
          :root { --gap: 20px; }
          .project-card { 
            height: 520px;
          }
        }

        /* Desktop: Slider horizontal avec 3 cards */
        @media (min-width: 1024px) {
          :root { --gap: 24px; }
          .project-card {
            flex: 0 0 calc((100% - (var(--gap) * 2)) / 3);
            max-width: calc((100% - (var(--gap) * 2)) / 3);
            height: 540px;
          }
        }
      `}</style>
    </div>
  );
};

export default Projet;