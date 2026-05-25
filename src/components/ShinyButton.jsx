import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const ShinyButton = ({ text, href, download, className = "" }) => {
    const buttonRef = useRef(null);

    useEffect(() => {
        const buttonElement = buttonRef.current;
        if (!buttonElement) return;

        class Button {
            constructor(buttonElement) {
                this.block = buttonElement;
                this.init();
                this.initEvents();
            }

            init() {
                const el = gsap.utils.selector(this.block);

                this.DOM = {
                    button: this.block,
                    flair: el(".button__flair"),
                };

                this.xSet = gsap.quickSetter(this.DOM.flair, "xPercent");
                this.ySet = gsap.quickSetter(this.DOM.flair, "yPercent");
            }

            getXY(e) {
                const { left, top, width, height } =
                    this.DOM.button.getBoundingClientRect();

                const xTransformer = gsap.utils.pipe(
                    gsap.utils.mapRange(0, width, 0, 100),
                    gsap.utils.clamp(0, 100)
                );

                const yTransformer = gsap.utils.pipe(
                    gsap.utils.mapRange(0, height, 0, 100),
                    gsap.utils.clamp(0, 100)
                );

                return {
                    x: xTransformer(e.clientX - left),
                    y: yTransformer(e.clientY - top),
                };
            }

            initEvents() {
                this.DOM.button.addEventListener("mouseenter", (e) => {
                    const { x, y } = this.getXY(e);

                    this.xSet(x);
                    this.ySet(y);

                    gsap.to(this.DOM.flair, {
                        scale: 1,
                        duration: 0.4,
                        ease: "power2.out",
                    });
                });

                this.DOM.button.addEventListener("mouseleave", (e) => {
                    const { x, y } = this.getXY(e);

                    gsap.killTweensOf(this.DOM.flair);

                    gsap.to(this.DOM.flair, {
                        xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
                        yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
                        scale: 0,
                        duration: 0.3,
                        ease: "power2.out",
                    });
                });

                this.DOM.button.addEventListener("mousemove", (e) => {
                    const { x, y } = this.getXY(e);

                    gsap.to(this.DOM.flair, {
                        xPercent: x,
                        yPercent: y,
                        duration: 0.4,
                        ease: "power2",
                    });
                });

                // Click reset to prevent stuck state
                this.DOM.button.addEventListener("click", (e) => {
                    const { x, y } = this.getXY(e);

                    gsap.killTweensOf(this.DOM.flair);

                    gsap.to(this.DOM.flair, {
                        xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
                        yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
                        scale: 0,
                        duration: 0.3,
                        ease: "power2.out",
                    });
                });
            }
        }

        const btn = new Button(buttonElement);

        // Cleanup
        return () => {
            // Remove specific listeners if possible, or just let potential GC handle it
            // but ideally we remove them. The class adds them to DOM elements.
            // We can recreate the removal logic or just clone the element to strip listeners
            // For now, React unmount handles the DOM removal, so it's mostly fine.
            // If we seek perfection, we'd store the handler references in the class instance.
        };
    }, []);

    return (
        <a
            ref={buttonRef}
            href={href}
            download={download}
            className={`button button--stroke ${className}`}
            style={{
                backgroundColor: "black",
            }}
        >
            <span className="button__flair"></span>
            <span className="button__label">{text}</span>
        </a>
    );
};

export default ShinyButton;
