
$(function () {

  if (!document.querySelector('#smooth-wrapper')) {
    return;
  }

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
  var isServicesPage = document.body.classList.contains('home-personal');

  if (prefersReducedMotion || isCoarsePointer || isServicesPage) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  ScrollTrigger.normalizeScroll(false);

  ScrollSmoother.create({
    smooth: 1,
    effects: true,
    smoothTouch: 0.1,
  });

});
