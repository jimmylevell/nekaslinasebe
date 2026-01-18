import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <p className="mb-1">
              &copy; {t('footer.copyright')}{' '}
              <b>
                <a href="https://luciebasniar.com/" target="_blank" rel="noopener noreferrer">
                  Lucie Bašniarová
                </a>
              </b>{' '}
              {t('footer.and')} Pavla Melenová
            </p>
            <div className="credits">
              {t('footer.designedBy')}{' '}
              <a href="https://bootstrapmade.com/" target="_blank" rel="noopener noreferrer">
                BootstrapMade a James Levell
              </a>
            </div>
          </div>
          <div className="col-sm-6 social text-md-end">
            <a href="https://www.kpsychologovi.cz" target="_blank" rel="noopener noreferrer">
              <span className="bi bi-globe"></span>
            </a>
            <a href="https://kpsychologovi.cz/shop/" target="_blank" rel="noopener noreferrer">
              <span className="bi bi-cart-check"></span>
            </a>
            <a
              href="https://www.kurzyproradost.cz/kurz/jak-na-uzkosti-obavy-stres-a-emoce-353?pid=774708"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="bi bi-camera-reels"></span>
            </a>
            <a
              href="https://www.instagram.com/kpsychologovi/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="bi bi-instagram"></span>
            </a>
            <a
              href="https://www.linkedin.com/in/tereza-hrušková-psycholog/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="bi bi-linkedin"></span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
