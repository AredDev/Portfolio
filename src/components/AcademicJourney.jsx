import React, { useState, useEffect } from 'react';
import photo from '../images/eni.jpg';
import profile from '../images/4.webp'

const AcademicJourney = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollSection = document.getElementById('academic-section');
            if (!scrollSection) return;

            const rect = scrollSection.getBoundingClientRect();
            const sectionTop = rect.top;
            const sectionHeight = rect.height;
            const windowHeight = window.innerHeight;

            // Calculer la progression du scroll dans cette section
            if (sectionTop < windowHeight && sectionTop > -sectionHeight) {
                const progress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight * 0.8)));
                setScrollProgress(progress);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const academicData = [
        {
            year: '2025 - 2026',
            degree: 'DEUXIÈME ANNÉE DE MASTER',
            institution: 'ÉCOLE NATIONALE D\'INFORMATIQUE'
        },
        {
            year: '2024 - 2025',
            degree: 'PREMIÈRE ANNÉE DE MASTER',
            institution: 'ÉCOLE NATIONALE D\'INFORMATIQUE'
        },
        {
            year: '2023 - 2024',
            degree: 'TROISIÈME ANNÉE DE LICENCE',
            institution: 'ÉCOLE NATIONALE D\'INFORMATIQUE'
        },
        {
            year: '2022 - 2023',
            degree: 'DEUXIÈME ANNÉE DE LICENCE',
            institution: 'ÉCOLE NATIONALE D\'INFORMATIQUE'
        },
        {
            year: '2021 - 2022',
            degree: 'PREMIÈRE ANNÉE DE LICENCE',
            institution: 'ÉCOLE NATIONALE D\'INFORMATIQUE'
        }
    ];

    return (
        <>
            {/* Mobile Layout - Vertical Stack */}
            <div className="lg:hidden bg-black py-12 px-6">
                {/* En-tête */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-white text-xs tracking-[0.1em] font-bold">
                            PARCOURS ACADÉMIQUE
                        </h2>

                        {/* Numéro avec style moderne */}
                        <div className="relative w-16 h-14 flex-shrink-0">
                            <div className="absolute top-0 left-0 right-0 h-1/2 bg-black"></div>
                            <div className="absolute bottom-0 top-[-50px] left-0 right-0 h-20 bg-white rounded-b-2xl flex items-center justify-center">
                                <span className="text-black text-3xl font-bold">01</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-24 h-px bg-gray-50"></div>
                </div>

                {/* Liste des diplômes */}
                <div className="space-y-4 mb-8">
                    {academicData.map((item, index) => (
                        <div
                            key={index}
                            className="border-b border-gray-700 pb-4"
                        >
                            <div className="flex flex-col gap-1">
                                <h3 className="text-white text-base font-bold leading-tight">
                                    {item.degree}
                                </h3>
                                <span className="text-red-500 text-xs font-semibold">
                                    {item.year}
                                </span>
                            </div>
                        </div>
                    ))}

                    {/* Badge institution */}
                    <div className="mt-6 inline-block">
                        <div className="bg-green-700 text-white px-6 py-3 rounded-full text-xs font-semibold">
                            ÉCOLE NATIONALE D'INFORMATIQUE
                        </div>
                    </div>
                </div>

                {/* Photo en bas */}
                <div className="relative w-full h-64 rounded-2xl overflow-hidden mt-8">
                    <img
                        src={photo}
                        alt="École Nationale"
                        className="w-full h-full object-cover"
                    />
                    {/* Photo de profil superposée */}
                    <div className="absolute left-6 bottom-6 w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                        <img
                            src={profile}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Desktop Layout - Horizontal Split */}
            <div id="academic-section" className="hidden lg:block relative h-[110vh] bg-gray-50">
                <div className="sticky top-0 h-screen w-full overflow-hidden flex">

                    {/* Image qui passe de 100% à 50% */}
                    <div
                        className="relative h-full transition-all duration-300 overflow-hidden"
                        style={{
                            width: `${100 - scrollProgress * 50}%`
                        }}
                    >
                        <img
                            src={photo}
                            alt="École Nationale"
                            className="absolute inset-0 w-full h-full object-cover"
                        />

                        {/* Photo de profil */}
                        <div
                            className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl transition-all duration-500"
                            style={{
                                opacity: 2 - scrollProgress * 0.8,
                                transform: `translateY(-50%) scale(${1 - scrollProgress * 0.3})`
                            }}
                        >
                            <img
                                src={profile}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Panneau noir qui apparaît à droite (0% → 50%) */}
                    <div
                        className="relative h-full bg-black transition-all duration-300 overflow-hidden"
                        style={{
                            width: `${scrollProgress * 50}%`
                        }}
                    >
                        {/* Contenu du panneau noir */}
                        <div
                            className="h-full w-full flex flex-col justify-center px-8 md:px-12 lg:px-16"
                            style={{
                                opacity: Math.max(0, (scrollProgress - 0.3) * 1.5),
                                transform: `translateX(${Math.max(0, 30 - scrollProgress * 30)}px)`
                            }}
                        >
                            {/* En-tête */}
                            <div className="mb-8 md:mb-20">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-white text-xs md:text-lg tracking-[0.1em] font-bold">
                                        PARCOURS ACADÉMIQUE
                                    </h2>

                                    {/* Numéro avec style moderne */}
                                    <div className="relative w-12 h-14 md:w-28 md:h-18 flex-shrink-0">
                                        {/* Partie supérieure noire */}
                                        <div className="absolute top-0 left-0 right-0 h-1/2 bg-black"></div>
                                        {/* Partie inférieure blanche arrondie */}
                                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-white rounded-b-2xl flex items-center justify-center">
                                            <span className="text-black text-3xl md:text-5xl font-bold">01</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Ligne décorative */}
                                <div className="w-24 md:w-72 h-px bg-gray-50 mt-4"></div>
                            </div>

                            {/* Liste des diplômes */}
                            <div className="space-y-4 md:space-y-6 mb-20">
                                {academicData.map((item, index) => (
                                    <div
                                        key={index}
                                        className="border-b border-gray-700 pb-4 md:pb-6 transition-all duration-500"
                                        style={{
                                            opacity: Math.max(0, (scrollProgress - 0.4 - index * 0.05) * 2),
                                            transform: `translateY(${Math.max(0, 20 - (scrollProgress - 0.4 - index * 0.05) * 40)}px)`
                                        }}
                                    >
                                        <div className="flex flex-col gap-1">
                                            <h3 className="text-white text-base md:text-xl lg:text-2xl font-bold leading-tight">
                                                {item.degree}
                                            </h3>
                                            <span className="text-red-500 text-xs md:text-sm font-semibold">
                                                {item.year}
                                            </span>
                                        </div>
                                    </div>
                                ))}

                                {/* Badge institution */}
                                <div
                                    className="mt-8 inline-block"
                                    style={{
                                        opacity: Math.max(0, (scrollProgress - 0.7) * 2),
                                        transform: `translateY(${Math.max(0, 30 - (scrollProgress - 0.7) * 60)}px)`
                                    }}
                                >
                                    <div className="bg-green-700 text-white px-6 py-3 rounded-full text-xs md:text-sm font-semibold">
                                        ÉCOLE NATIONALE D'INFORMATIQUE
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AcademicJourney;
