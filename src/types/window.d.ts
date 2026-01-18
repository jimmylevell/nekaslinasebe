import AOS from 'aos';
import Isotope from 'isotope-layout';
import Swiper from 'swiper/bundle';

declare global {
  interface Window {
    AOS: typeof AOS;
    Isotope: typeof Isotope;
    Swiper: typeof Swiper;
  }
}

export {};
