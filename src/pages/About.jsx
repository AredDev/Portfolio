import React from 'react';
import AboutHero from '../components/AboutHero';
import AcademicJourney from '../components/AcademicJourney';
import TechnicalSkills from '../components/TechnicalSkills';

const About = () => {
    return (
        <div className="pt-20">
            <AboutHero />
            <AcademicJourney />
            <TechnicalSkills />
        </div>
    );
};

export default About;
