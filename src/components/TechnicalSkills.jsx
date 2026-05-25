import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';

const TechnicalSkills = () => {
    useEffect(() => {
        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '50px',
            duration: 800,
            delay: 200,
            reset: false,
        });

        // Animate header from top
        sr.reveal('.skills-header', {
            origin: 'top',
            distance: '80px',
            duration: 1000,
            delay: 100,
        });

        // Animate skill cards one by one
        sr.reveal('.skill-card', {
            origin: 'bottom',
            distance: '60px',
            duration: 600,
            interval: 150,
        });
    }, []);
    const skillsData = [
        {
            id: 'L',
            category: 'LANGAGE DE PROGRAMMATION',
            skills: [
                'JavaScript',
                'TypeScript',
                'Python',
                'PHP'
            ]
        },
        {
            id: 'F',
            category: 'FRONTEND',
            skills: [
                'ReactJS',
                'VueJS',
                'NextJS',
                'TailwindCSS',
                'React Native'
            ]
        },
        {
            id: 'U',
            category: 'UI/UX DESIGN',
            skills: [
                'Adobe XD',
                'Figma'
            ]
        },
        {
            id: 'B',
            category: 'BACKEND',
            skills: [
                'NodeJS',
                'Laravel',
                'ExpressJS'
            ]
        },
        {
            id: 'D',
            category: 'BASE DE DONNÉES',
            skills: [
                'MySQL',
                'PostgreSQL',
                'MS Access',
                'MongoDB',
                'Firebase',
                'Supabase'
            ]
        },
        {
            id: 'O',
            category: 'OUTILS DE VERSIONNING',
            skills: [
                'GitHub',
                'GitLab'
            ]
        }
    ];

    return (
        <div className="bg-gray-50 py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 lg:px-16">
            {/* Header Section */}
            <div className="skills-header mb-8 sm:mb-10 md:mb-12">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-5 md:mb-6">
                    {/* Number Badge */}
                    <div className="bg-black text-white font-bold text-3xl sm:text-4xl md:text-5xl px-4 sm:px-5 md:px-6 py-6 sm:py-7 md:py-8 rounded-t-2xl flex-shrink-0">
                        02
                    </div>

                    {/* Title and Description */}
                    <div className="flex-1 text-center">
                        <div className="inline-block mb-3 sm:mb-4 border border-black rounded-full px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4">
                            <span className="text-base sm:text-lg md:text-xl font-bold tracking-wide">Compétences <span className="text-[#FF4D00]">Techniques</span></span>
                        </div>
                        <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                            Mes armes pour construire des interfaces intuitives
                        </p>
                    </div>
                </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mt-12 sm:mt-16 md:mt-20 lg:mt-24">
                {skillsData.map((category, index) => (
                    <div
                        key={index}
                        className="skill-card bg-[#F1F1F1] rounded-2xl px-5 sm:px-6 pt-5 sm:pt-6 pb-6 sm:pb-7 md:pb-8 border border-gray-100 "
                    >
                        {/* Category Header */}
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                            <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg border-2 border-orange flex items-center justify-center flex-shrink-0">
                                <span className="text-orange font-bold text-lg sm:text-xl">
                                    {category.id}
                                </span>
                            </div>
                            <h3 className="font-bold text-lg sm:text-xl text-gray-900">
                                {category.category}
                            </h3>
                        </div>

                        {/* Divider Line */}
                        <div className="w-full h-px bg-gray-200 mb-4 sm:mb-5 md:mb-6"></div>

                        {/* Skills Tags */}
                        <div className="flex flex-wrap gap-2 sm:gap-2.5 md:gap-3">
                            {category.skills.map((skill, skillIndex) => (
                                <span
                                    key={skillIndex}
                                    className="px-4 sm:px-5 py-1.5 sm:py-2 bg-white text-gray-700 text-xs sm:text-sm rounded-full border-2 border-orange-500 hover:bg-orange-50 transition-all duration-200"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TechnicalSkills;
