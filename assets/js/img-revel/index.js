// 'preloadImages' is a utility function that handles the preloading of images to ensure they are fully loaded before being used.
import { preloadImages } from './utils.js';
// 'ImageTrail' is a class designed to manage and animate a sequence of images, reacting to mouse movements.
import { ImageTrail } from './imageTrail.js';

const content = document.querySelector('.content');
const heroSection = document.querySelector('.hero-style4');

const supportsPointer =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(pointer: fine)").matches;

const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const MIN_WIDTH = 992;

const startImageTrail = () => {
    if (!content) {
        document.body.classList.remove('loading');
        return;
    }

    preloadImages('.content__img-inner').then(() => {
        document.body.classList.remove('loading');
        new ImageTrail(content);
    });
};

const shouldEnableTrail = content && supportsPointer && !reducedMotion && window.innerWidth >= MIN_WIDTH;

if (!shouldEnableTrail) {
    document.body.classList.remove('loading');
} else {
    const triggerTrail = () => {
        startImageTrail();
    };

    if ('IntersectionObserver' in window && heroSection) {
        const onceObserver = new IntersectionObserver((entries, observer) => {
            if (entries.some((entry) => entry.isIntersecting)) {
                observer.disconnect();
                triggerTrail();
            }
        }, { rootMargin: '150px 0px' });
        onceObserver.observe(heroSection);
    } else {
        if (document.readyState === 'complete') {
            triggerTrail();
        } else {
            window.addEventListener('load', triggerTrail, { once: true });
        }
    }
}
