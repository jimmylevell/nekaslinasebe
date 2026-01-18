import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface NavItemProps {
  to: string;
  children: React.ReactNode;
  active?: boolean;
}

const NavItem = ({ to, children, active }: NavItemProps) => (
  <li className={active ? 'active' : ''}>
    <Link to={to}>{children}</Link>
  </li>
);

interface NavbarProps {
  currentPath?: string;
}

export const Navbar = ({ currentPath = '/' }: NavbarProps) => {
  const { t, i18n } = useTranslation();
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      {/* Collapsed Menu */}
      <div className="collapse navbar-collapse custom-navmenu" id="main-navbar">
        <div className="container py-2 py-md-5">
          <div className="row align-items-start">
            <div className="col-md-3">
              <ul className="custom-menu">
                <NavItem to="/" active={currentPath === '/'}>
                  {t('navbar.home')}
                </NavItem>
                <NavItem to="/about" active={currentPath === '/about'}>
                  {t('navbar.about')}
                </NavItem>
                <NavItem to="/workshop" active={currentPath === '/workshop'}>
                  {t('navbar.workshop')}
                </NavItem>
                <NavItem to="/archive" active={currentPath === '/archive'}>
                  {t('navbar.archive')}
                </NavItem>
                <NavItem to="/week-planner" active={currentPath === '/week-planner'}>
                  {t('navbar.weekPlanner')}
                </NavItem>
                <NavItem to="/contact" active={currentPath === '/contact'}>
                  {t('navbar.contact')}
                </NavItem>
              </ul>
            </div>
            <div className="col-md-9 d-none d-md-block mr-auto">
              <div className="tweet d-flex">
                <div>
                  <p>
                    <em>
                      {t('navbar.tagline')}
                    </em>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="navbar navbar-light custom-navbar">
        <div className="container">
          <Link className="navbar-brand" to="/">
            #nekaslinasebe tipy
          </Link>
          <div className="d-flex align-items-center">
            <div className="btn-group me-3" role="group">
              <button
                type="button"
                className={`btn btn-sm ${i18n.language === 'cs' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => changeLanguage('cs')}
              >
                CZ
              </button>
              <button
                type="button"
                className={`btn btn-sm ${i18n.language === 'en' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => changeLanguage('en')}
              >
                EN
              </button>
            </div>
            <a
              href="/#"
              className="burger"
              data-bs-toggle="collapse"
              data-bs-target="#main-navbar"
            >
              <span></span>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};
