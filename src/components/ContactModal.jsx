import { Mail, Phone, X, CheckCircle, Clock, ShieldCheck, Github, Download, Calendar } from "lucide-react";
import myPhoto from "../images/dera-mobile.webp";
import { useLanguage } from "./LanguageContext";

const translations = {
  FR: {
    title: "Je suis Dera",
    intro: "J'ai créé mon portfolio pour vous montrer mes compétences et vous faire gagner du temps dans vos projets !",
    question: "Une question ?",
    answerPersonal: "Je vous réponds personnellement !",
    bookVideo: "Réserver un appel vidéo",
    onlineStatus: "En ligne • Réponse immédiate",
    emailStatus: "Réponse sous 24h maximum",
    githubStatus: "Voir mes projets",
    downloadCv: "Télécharger mon CV",
    pdfFormat: "Format PDF",
    trust1: "100% de réussite sur toutes les demandes traitées",
    trust2: "Respect des délais et suivi régulier",
    trust3: "Option, échange, révision : on s'occupe de tout !",
    close: "Fermer"
  },
  EN: {
    title: "I am Dera",
    intro: "I created my portfolio to show you my skills and save you time in your projects!",
    question: "A question?",
    answerPersonal: "I answer you personally!",
    bookVideo: "Book a video call",
    onlineStatus: "Online • Immediate response",
    emailStatus: "Response within 24h maximum",
    githubStatus: "View my projects",
    downloadCv: "Download my CV",
    pdfFormat: "PDF Format",
    trust1: "100% success rate on all requests handled",
    trust2: "Respect of deadlines and regular follow-up",
    trust3: "Option, exchange, revision: we take care of everything!",
    close: "Close"
  }
};

const ContactModal = ({ isOpen, onClose }) => {
    const { language } = useLanguage();
    const t = translations[language];

    if (!isOpen) return null;

    return (
        <>
            <style>{`
                .contact-modal-content, .contact-modal-content * {
                    cursor: auto !important;
                }
                .contact-modal-content a, .contact-modal-content button {
                    cursor: pointer !important;
                }
            `}</style>

            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className={`
                fixed z-[70] bg-white text-black flex flex-col
                /* Mobile: Full Screen, but rounded top */
                inset-x-0 bottom-0 rounded-t-3xl h-[85vh]
                /* Desktop: Floating Bottom Right */
                lg:inset-auto lg:bottom-8 lg:right-8 lg:w-[400px] lg:h-[650px] lg:rounded-3xl lg:shadow-2xl
                transition-transform duration-300 ease-out
                contact-modal-content
            `}>
                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto px-6 pt-10 pb-28 scrollbar-hide">

                    {/* Header/Profile */}
                    <div className="flex flex-col items-center text-center">
                        <div className="relative mb-5">
                            <div className="w-24 h-24 rounded-full p-1 border border-gray-100 shadow-sm bg-white">
                                <img
                                    src={myPhoto}
                                    alt="Dera"
                                    className="w-full h-full rounded-full object-cover object-[center_0%]"
                                />
                            </div>
                            <div className="absolute bottom-1 right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white animate-pulse"></div>
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                            <h2 className="text-lg font-bold text-gray-900">{t.title}</h2>
                        </div>

                        <p className="text-gray-500 text-sm leading-relaxed mb-8 px-4">
                            {t.intro}
                        </p>
                    </div>

                    {/* Contact Options Box */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-8">
                        <h3 className="text-center font-bold text-gray-900 mb-6 text-sm">
                            {t.question} <span className="text-[#FF4D00]">{t.answerPersonal}</span>
                        </h3>

                        <div className="space-y-4">
                            {/* Calendly */}
                            <a
                                href="https://calendly.com/derasosialy/new-meeting"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 bg-white border border-[#FF4D00]/20 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-[#FF4D00]/40 transition-all group"
                            >
                                <div className="w-10 h-10 rounded-full bg-[#FF4D00] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#FF4D00]/20">
                                    <Calendar size={20} />
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="font-bold text-gray-900">Calendly</p>
                                    <p className="text-xs text-[#FF4D00] font-medium">{t.bookVideo}</p>
                                </div>
                                <div className="text-gray-300 group-hover:translate-x-1 transition-transform">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </a>

                            {/* WhatsApp */}
                            <a
                                href="tel:+261341712742"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 bg-white border border-green-200 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-green-300 transition-all group"
                            >
                                <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-green-200">
                                    <Phone size={20} className="fill-current" />
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="font-bold text-gray-900">WhatsApp</p>
                                    <p className="text-xs text-green-600 font-medium">{t.onlineStatus}</p>
                                </div>
                                <div className="text-gray-300 group-hover:translate-x-1 transition-transform">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </a>

                            {/* Email */}
                            <a
                                href="mailto:derasosialy@gmail.com"
                                className="flex items-center gap-4 p-4 bg-white border border-[#FF4D00]/20 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-[#FF4D00]/40 transition-all group"
                            >
                                <div className="w-10 h-10 rounded-full bg-[#FF4D00] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#FF4D00]/20">
                                    <Mail size={20} />
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="font-bold text-gray-900">Email</p>
                                    <p className="text-xs text-gray-500">{t.emailStatus}</p>
                                </div>
                                <div className="text-gray-300 group-hover:translate-x-1 transition-transform">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </a>

                            {/* GitHub */}
                            <a
                                href="https://github.com/dera"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-gray-400 transition-all group"
                            >
                                <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center shrink-0 shadow-lg shadow-gray-400">
                                    <Github size={20} />
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="font-bold text-gray-900">GitHub</p>
                                    <p className="text-xs text-gray-500">{t.githubStatus}</p>
                                </div>
                                <div className="text-gray-300 group-hover:translate-x-1 transition-transform">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </a>

                            {/* Download CV */}
                            <a
                                href="/cv.pdf"
                                download="CV_Dera.pdf"
                                className="flex items-center gap-4 p-4 bg-white border border-[#FF4D00]/20 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-[#FF4D00]/40 transition-all group"
                            >
                                <div className="w-10 h-10 rounded-full bg-[#FF4D00] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#FF4D00]/20">
                                    <Download size={20} />
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="font-bold text-gray-900">{t.downloadCv}</p>
                                    <p className="text-xs text-gray-500">{t.pdfFormat}</p>
                                </div>
                                <div className="text-gray-300 group-hover:translate-x-1 transition-transform">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Trust Points */}
                    <div className="space-y-2 px-4">
                        <div className="flex items-center gap-3">
                            <CheckCircle size={16} className="text-green-500 shrink-0" />
                            <p className="text-[11px] text-gray-500">{t.trust1}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Clock size={16} className="text-blue-500 shrink-0" />
                            <p className="text-[11px] text-gray-500">{t.trust2}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <ShieldCheck size={16} className="text-purple-500 shrink-0" />
                            <p className="text-[11px] text-gray-500">{t.trust3}</p>
                        </div>
                    </div>

                </div>

                {/* Floating Footer Button */}
                <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20 pointer-events-none">
                    <button
                        onClick={onClose}
                        className="bg-[#FF4D00] hover:bg-[#e64600] text-white px-6 py-2.5 rounded-lg shadow-lg shadow-[#FF4D00]/30 flex items-center gap-2 text-sm font-medium transition-all active:scale-95 pointer-events-auto"
                    >
                        <X size={18} />
                        {t.close}
                    </button>
                </div>

                {/* Gradient fade at bottom to blend content */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />
            </div>
        </>
    );
};

export default ContactModal;
