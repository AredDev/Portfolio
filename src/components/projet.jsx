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

import sary1 from "../images/sirius.webp";
import sary2 from "../images/pro.jpg";
import tourImg from "../images/tour.jpg";
import ibiznaImg from "../images/ibizna.webp";
import ittImg from "../images/itt.jpg";
import hihaonaImg from "../images/hihaona.webp";
import placeholderImg from "../images/placeholder.png";
import portfolioImg from "../images/portfolio.jpg";

// Custom Card component
const Card = ({ children, className }) => (
  <div className={`bg-gray-200  p-6 text-xs ${className}`}>
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
    name: "Gestion de contrôle d'accès via QR code",
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
    image: placeholderImg,
    techIcons: [
      { Icon: SiFlutter, color: "#02569B" },
      { Icon: SiDart, color: "#0175C2" },
    ],
    status: "En attente"
  },
];

gsap.registerPlugin(ScrollTrigger);

const Projet = () => {
  const scrollRef = useRef();
  const pinSection = useRef();

  const [likes, setLikes] = useState({});
  const [likedProjects, setLikedProjects] = useState([]);

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
            <span className="text-xl font-bold tracking-wide">Mes <span className="text-[#FF4D00] ">Projets</span></span>
          </div>

          <p className="text-gray-500 text-sm md:text-xl max-w-2xl mx-auto ">
            Des expériences digitales uniques et performantes, conçues avec passion.
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
            <Card key={project.id} className="project-card group relative overflow-hidden">
              {/* Lien overlay absolu (uniquement si le projet a un lien externe) */}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10 cursor-pointer"
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
                    <h1 className="text-xs md:text-base">{project.role}</h1>
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
                        En attente
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
                        {project.category}
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

      {/* Scroll Hint */}
      <div className="hidden lg:block text-center mt-4 text-sm text-gray-500 px-4 md:px-8">
        Scrollez pour voir plus de projets
      </div>

      {/* CSS */}
      <style jsx>{`
        :root { --gap: 24px; }

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