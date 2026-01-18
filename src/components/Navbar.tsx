import { Link } from 'react-router-dom';

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
  return (
    <>
      {/* Collapsed Menu */}
      <div className="collapse navbar-collapse custom-navmenu" id="main-navbar">
        <div className="container py-2 py-md-5">
          <div className="row align-items-start">
            <div className="col-md-3">
              <ul className="custom-menu">
                <NavItem to="/" active={currentPath === '/'}>
                  #nekaslinasebe
                </NavItem>
                <NavItem to="/about" active={currentPath === '/about'}>
                  O nás
                </NavItem>
                <NavItem to="/workshop" active={currentPath === '/workshop'}>
                  Jak tipy používat
                </NavItem>
                <NavItem to="/archive" active={currentPath === '/archive'}>
                  Archiv tipů
                </NavItem>
                <NavItem to="/week-planner" active={currentPath === '/week-planner'}>
                  Plánovač týdnů
                </NavItem>
                <NavItem to="/contact" active={currentPath === '/contact'}>
                  Kontakt
                </NavItem>
              </ul>
            </div>
            <div className="col-md-9 d-none d-md-block mr-auto">
              <div className="tweet d-flex">
                <div>
                  <p>
                    <em>
                      #nekaslinasebe tipy jsou tu pro každého, kdo se ve starání o sebe někdy
                      ztrácí, zahlcuje ho nebo neví, jak na to.
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
          <a
            href="/#"
            className="burger"
            data-bs-toggle="collapse"
            data-bs-target="#main-navbar"
          >
            <span></span>
          </a>
        </div>
      </nav>
    </>
  );
};
