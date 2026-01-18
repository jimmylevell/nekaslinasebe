/**
* Template Name: MyPortfolio
* Updated: Jan 09 2024 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/myportfolio-bootstrap-portfolio-website-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function () {
  "use strict";

  // Wait for libraries to be loaded by React app
  const initWhenReady = () => {
    if (typeof window.Isotope === 'undefined' || 
        typeof window.AOS === 'undefined' || 
        typeof window.Swiper === 'undefined') {
      setTimeout(initWhenReady, 100);
      return;
    }

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
      el = el.trim()
      if (all) {
        return [...document.querySelectorAll(el)]
      } else {
        return document.querySelector(el)
      }
    }

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
      let selectEl = select(el, all)
      if (selectEl) {
        if (all) {
          selectEl.forEach(e => e.addEventListener(type, listener))
        } else {
          selectEl.addEventListener(type, listener)
        }
      }
    }

    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
      el.addEventListener('scroll', listener)
    }

    /**
     * burgerMenu
     */
    const burgerMenu = select('.burger')
    on('click', '.burger', function (e) {
      burgerMenu.classList.toggle('active');
    })

    /**
     * Porfolio isotope and filter
     */
    window.addEventListener('load', () => {
      let portfolioContainer = select('#portfolio-grid');
      if (portfolioContainer) {
        let portfolioIsotope = new window.Isotope(portfolioContainer, {
          itemSelector: '.item',
        });

        let portfolioFilters = select('#filters a', true);

        on('click', '#filters a', function (e) {
          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove('active');
          });
          this.classList.add('active');

          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          portfolioIsotope.on('arrangeComplete', function () {
            window.AOS.refresh()
          });
        }, true);
      }

    });

    /**
     * Testimonials slider
     */
    if (document.querySelector('.testimonials-slider')) {
      new window.Swiper('.testimonials-slider', {
        speed: 600,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        slidesPerView: 'auto',
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        }
      });
    }
  };

  // Start initialization check
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWhenReady);
  } else {
    initWhenReady();
  }

})()