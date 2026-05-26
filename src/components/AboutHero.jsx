import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import photo from '../images/photo.png';
import { useLanguage } from './LanguageContext';

const translations = {
  FR: {
    about: "À PROPOS",
    academic: "PARCOURS ACADÉMIQUE",
    bookMeeting: "Prendre un rendez-vous avec Dera",
    technical: "COMPÉTENCES TECHNIQUES",
  },
  EN: {
    about: "ABOUT ME",
    academic: "ACADEMIC JOURNEY",
    bookMeeting: "Book a meeting with Dera",
    technical: "TECHNICAL SKILLS",
  }
};

const AboutHero = () => {
    const { language } = useLanguage();
    const t = translations[language];

    useEffect(() => {
        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '50px',
            duration: 1000,
            delay: 200,
            reset: true,
        });

        // Title animation from top
        sr.reveal('.title-apropos', {
            origin: 'top',
            distance: '80px',
            delay: 300,
        });

        // Left section from left
        sr.reveal('.section-gauche', {
            origin: 'left',
            distance: '100px',
            delay: 500,
        });

        // Right section from right
        sr.reveal('.section-droite', {
            origin: 'right',
            distance: '100px',
            delay: 500,
        });

        // Center button from bottom
        sr.reveal('.button-centre', {
            origin: 'bottom',
            distance: '50px',
            delay: 600,
        });
    }, []);

    return (
        <div className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-16 py-8 md:py-14">
            {/* Titre principal */}
            <div className="title-apropos mb-16 sm:mb-24 md:mb-32 lg:mb-50">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[170px] font-bold text-center tracking-tight">
                    {t.about}
                </h1>
            </div>

            {/* Section inférieure avec les trois éléments */}
            <div className="flex flex-col md:flex-row items-center md:items-stretch justify-between gap-6 sm:gap-8 md:gap-12 mb-6 md:mb-10 w-full max-w-9xl">
                {/* Gauche - Parcours Académiques */}
                <div className="section-gauche flex-1 flex flex-col w-full md:w-auto items-start md:items-start">
                    <div className="border-t border-gray-300 pt-2 pb-2 border-b w-full md:w-auto">
                        <div className="flex items-center justify-between md:justify-start gap-2">
                            <h2 className="text-xs sm:text-sm md:text-base font-semibold tracking-wide">
                                {t.academic}
                            </h2>
                            <span className="text-xs sm:text-sm font-medium text-gray-500">01</span>
                        </div>
                    </div>
                </div>

                {/* Centre - Bouton avec image */}
                <a
                    href="https://calendly.com/derasosialy/new-meeting"
                    target="_blank"
                    rel="noopener noreferrer"
                    className='button-centre inline-flex items-center gap-3 sm:gap-4 bg-mocha dark:bg-gray-700 text-white pl-1 pr-4 sm:pr-6 md:pr-8 py-1 rounded-full font-medium bg-black hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors cursor-pointer w-full md:w-auto justify-start'
                >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-300 dark:bg-gray-600 overflow-hidden shrink-0">
                        <img
                            src={photo}
                            alt="Dera"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <span className='text-sm sm:text-base md:text-lg lg:text-xl font-semibold whitespace-nowrap'>{t.bookMeeting}</span>
                </a>

                {/* Droite - Compétences Techniques */}
                <div className="section-droite flex-1 flex flex-col w-full md:w-auto items-start md:items-end">
                    <div className="border-t border-gray-300 pt-2 pb-2 border-b w-full md:w-auto">
                        <div className="flex items-center justify-between md:justify-start gap-2">
                            <h2 className="text-xs sm:text-sm md:text-base font-semibold tracking-wide">
                                {t.technical}
                            </h2>
                            <span className="text-xs sm:text-sm font-medium text-gray-500">02</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutHero;
