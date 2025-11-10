import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaReact,
  FaNodeJs,
  FaPhp,
  FaSymfony,
  FaVuejs,
  FaAngular,
  FaPython,
  FaDatabase,
  FaJs,
  FaCss3Alt,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiNextdotjs,
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

// Custom Card component
const Card = ({ children, className }) => (
  <div className={`bg-gray-200  p-6 text-xs ${className}`}>
    {children}
  </div>
);

// TechBadge avec react-icons
const TechBadge = ({ Icon }) => (
  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-2 shadow-sm">
    <Icon className="w-full h-full" />
  </div>
);

// === Données projets avec react-icons ===
const projects = [
  {
    id: 1,
    name: "Projet Pnud",
    category: "Urbanisme",
    techIcons: [
      { Icon: FaReact, color: "#61DAFB" },
      { Icon: SiExpress, color: "#000000" },
      { Icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    id: 2,
    name: "E-Commerce App",
    category: "Web",
    techIcons: [
      { Icon: FaReact, color: "#61DAFB" },
      { Icon: FaSymfony, color: "#000000" },
      { Icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    id: 3,
    name: "Mobile Banking",
    category: "Mobile",
    techIcons: [
      { Icon: FaReact, color: "#61DAFB" },
      { Icon: FaNodeJs, color: "#339933" },
      { Icon: SiMongodb, color: "#47A248" },
    ],
  },
  {
    id: 4,
    name: "Dashboard Analytics",
    category: "Web",
    techIcons: [
      { Icon: FaVuejs, color: "#42B883" },
      { Icon: FaPython, color: "#3776AB" },
      { Icon: SiPostgresql, color: "#336791" },
    ],
  },
  {
    id: 5,
    name: "Social Network",
    category: "Web",
    techIcons: [
      { Icon: FaAngular, color: "#DD0031" },
      { Icon: SiFirebase, color: "#FFCA28" },
      { Icon: FaReact, color: "#61DAFB" }, // Material UI ≈ React + MUI, on garde React
    ],
  },
  {
    id: 6,
    name: "Fitness Tracker",
    category: "Mobile",
    techIcons: [
      { Icon: SiFlutter, color: "#02569B" },
      { Icon: SiDart, color: "#0175C2" },
      { Icon: FaDatabase, color: "#003B57" }, // SQLite
    ],
  },
  {
    id: 7,
    name: "CRM System",
    category: "Enterprise",
    techIcons: [
      { Icon: FaReact, color: "#61DAFB" },
      { Icon: SiExpress, color: "#000000" },
      { Icon: SiMysql, color: "#4479A1" },
    ],
  },
  {
    id: 8,
    name: "Blog Platform",
    category: "Web",
    techIcons: [
      { Icon: SiNextdotjs, color: "#000000" },
      { Icon: SiPrisma, color: "#2D3748" },
      { Icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    id: 9,
    name: "Delivery App",
    category: "Mobile",
    techIcons: [
      { Icon: FaReact, color: "#61DAFB" },
      { Icon: SiGraphql, color: "#E535AB" },
      { Icon: SiRedis, color: "#DC382D" },
    ],
  },
  {
    id: 10,
    name: "Portfolio Builder",
    category: "Web",
    techIcons: [
      { Icon: SiSvelte, color: "#FF3E00" },
      { Icon: SiSupabase, color: "#3ECF8E" },
      { Icon: FaCss3Alt, color: "#1572B6" },
    ],
  },
];

gsap.registerPlugin(ScrollTrigger);

const Projet = () => {
  const scrollRef = useRef();
  const pinSection = useRef();

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
    <div className="w-full mb-28 bg-white" ref={pinSection}>
      {/* Title Section */}
      <div className="px-4 md:px-8 py-12">
        <h1 className="text-3xl md:text-5xl lg:text-5xl font-bold text-center mb-0 md:mb-10 leading-tight [letter-spacing:-0.05em]">
          Tout les projets <br />
          <span className="text-orange">Réalisés</span> par moi
        </h1>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="relative w-full overflow-hidden">
        <div
          className="flex flex-col lg:flex-row gap-6 px-4 md:px-8 pb-4"
          ref={scrollRef}
          style={{ willChange: "transform" }}
        >
          {projects.map((project) => (
            <Card key={project.id} className="project-card group">
              {/* Technology Badges */}
              <div className="flex gap-4">
                {project.techIcons.map(({ Icon, color }, index) => (
                  <TechBadge
                    key={index}
                    Icon={(props) => <Icon {...props} style={{ color }} />}
                  />
                ))}
              </div>

              {/* Espace image */}
              <div className="flex-1" />

              {/* Project Info */}
              <div className="flex flex-col gap-2 mt-[30rem]">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex gap-4">
                    <span className="text-sm font-medium bg-white px-4 py-2 rounded-full">
                      {project.name}
                    </span>
                    <span className="text-sm font-medium bg-white px-4 py-2 rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="text-center mt-4 text-sm text-gray-500 px-4 md:px-8">
        Scrollez pour voir plus de projets
      </div>

      {/* CSS */}
      <style jsx>{`
        :root { --gap: 24px; }

        .project-card {
          flex: 0 0 100%;
          max-width: 100%;
          height: 520px;
          box-shadow: 0 6px 18px rgba(10,10,10,0.03);
          border-radius: 0.5rem;
        }

        @media (min-width: 640px) {
          :root { --gap: 20px; }
          .project-card { height: 560px; }
        }

        @media (min-width: 1024px) {
          :root { --gap: 24px; }
          .project-card {
            flex: 0 0 calc((100% - (var(--gap) * 2)) / 3);
            max-width: calc((100% - (var(--gap) * 2)) / 3);
            height: 600px;
          }
        }
      `}</style>
    </div>
  );
};

export default Projet;