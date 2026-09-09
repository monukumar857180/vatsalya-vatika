import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu, X, Heart, Shield, LogIn, UserPlus, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './AuthModal';

interface NavbarProps {
  onOpenContributeModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContributeModal }) => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const [isScrolledState, setIsScrolledState] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [exploreDropdownOpen, setExploreDropdownOpen] = useState(false);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const location = useLocation();
  const navigate = useNavigate();

  const isScrolled = isScrolledState || location.pathname !== '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolledState(true);
      } else {
        setIsScrolledState(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const primaryNavLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Guruji', href: '#guruji' },
    { name: 'Facilities', href: '#facilities' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const secondaryNavLinks = [
    { name: 'Students & Life', href: '#students' },
    { name: 'Events & Programs', href: '#events' },
    { name: 'Photo Gallery', href: '/gallery' },
    { name: 'Memory Vault', href: '/cards' },
    { name: 'Reviews', href: '#reviews' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setExploreDropdownOpen(false);

    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate(`/${href}`);
      } else {
        const element = document.querySelector(href);
        if (element) {
          const headerOffset = 90; // Approximate height of the header
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    } else {
      navigate(href);
    }
    setMobileMenuOpen(false);
  };

  const openAuth = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };


  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-white/95 dark:bg-darkAshram-bg/75 backdrop-blur-xl shadow-lg py-2.5 border-b border-gray-200 dark:border-darkAshram-border/40'
          : 'bg-transparent backdrop-blur-sm py-4 border-b border-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">

          {/* Left: Brand Identity */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            {/* High-quality Glowing Om Icon */}
            <div className="relative w-11 h-11 rounded-full border-[1.5px] border-amber-400/80 bg-slate-900 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.6),inset_0_0_10px_rgba(251,191,36,0.4)] group-hover:shadow-[0_0_20px_rgba(251,191,36,0.8),inset_0_0_15px_rgba(251,191,36,0.6)] group-hover:scale-105 transition-all duration-300">
              <span className="text-2xl font-bold drop-shadow-[0_0_10px_rgba(251,191,36,1)] leading-none mt-0.5">ॐ</span>
            </div>
            <div className="flex flex-col">
              <span
                className="font-heading font-bold text-2xl tracking-tight leading-none transition-colors duration-200 dark:text-darkAshram-gold group-hover:brightness-110"
                style={
                  theme === 'light'
                    ? {
                      color: isScrolled ? '#1C3D2F' : '#FBBF24',
                      textShadow: isScrolled ? 'none' : '0 2px 8px rgba(0,0,0,0.5), 0 0 10px rgba(251,191,36,0.35)'
                    }
                    : {}
                }
              >
                Vatsalya Vatika
              </span>
              <span
                className="text-[10px] uppercase tracking-widest font-sans font-bold mt-1 transition-colors duration-200 dark:text-ashram-gold"
                style={
                  theme === 'light'
                    ? {
                      color: isScrolled ? '#D96B27' : '#FDE68A',
                      textShadow: isScrolled ? 'none' : '0 1px 4px rgba(0,0,0,0.4)'
                    }
                    : {}
                }
              >
                Ashram
              </span>
            </div>
          </Link>

          {/* Center-Left: Streamlined Navigation Links (High contrast text in Light mode) */}
          <nav className="hidden lg:flex items-center gap-5">
            {primaryNavLinks.slice(0, 3).map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`font-sans text-xs font-bold uppercase tracking-wider transition-colors py-1 relative group ${isScrolled ? 'text-ashram-charcoal hover:text-ashram-saffron dark:text-darkAshram-text dark:hover:text-darkAshram-gold' : 'text-white hover:text-ashram-goldLight dark:text-darkAshram-text dark:hover:text-darkAshram-gold'}`}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-ashram-saffron dark:bg-darkAshram-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}

            {/* Explore Dropdown */}
            <div className="relative">
              <button
                onClick={() => setExploreDropdownOpen(!exploreDropdownOpen)}
                className={`font-sans text-xs font-bold uppercase tracking-wider transition-colors py-1 flex items-center gap-1 ${isScrolled ? 'text-ashram-charcoal hover:text-ashram-saffron dark:text-darkAshram-text dark:hover:text-darkAshram-gold' : 'text-white hover:text-ashram-goldLight dark:text-darkAshram-text dark:hover:text-darkAshram-gold'}`}
              >
                <span>Explore</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${exploreDropdownOpen ? 'rotate-180 text-ashram-saffron' : ''}`} />
              </button>

              {exploreDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-darkAshram-card rounded-2xl shadow-xl border border-ashram-border dark:border-darkAshram-border p-2 space-y-1 z-50 animate-fadeIn">
                  {secondaryNavLinks.map((sLink) => (
                    <a
                      key={sLink.name}
                      href={sLink.href}
                      onClick={(e) => handleNavClick(e, sLink.href)}
                      className="group relative block px-3.5 py-2 rounded-xl text-xs font-bold text-ashram-green dark:text-darkAshram-text
                        transition-all duration-[280ms] ease-out
                        hover:-translate-y-px hover:shadow-[0_2px_10px_rgba(180,140,60,0.12)]
                        overflow-hidden"
                    >
                      {sLink.name}
                      {/* Gold underline: slides in from left on hover */}
                      <span className="absolute bottom-1 left-3.5 right-3.5 h-px bg-ashram-gold dark:bg-darkAshram-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[280ms] ease-out rounded-full opacity-70" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            {primaryNavLinks.slice(3).map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`font-sans text-xs font-bold uppercase tracking-wider transition-colors py-1 relative group ${isScrolled ? 'text-ashram-charcoal hover:text-ashram-saffron dark:text-darkAshram-text dark:hover:text-darkAshram-gold' : 'text-white hover:text-ashram-goldLight dark:text-darkAshram-text dark:hover:text-darkAshram-gold'}`}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-ashram-saffron dark:bg-darkAshram-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}

            {isAuthenticated && user?.role === 'admin' && (
              <Link
                to="/admin/dashboard"
                className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-ashram-green text-white dark:bg-darkAshram-gold/20 dark:text-darkAshram-gold flex items-center gap-1 shadow-sm"
              >
                <Shield className="w-3 h-3" /> Admin
              </Link>
            )}
          </nav>


          {/* Right Controls: Dark Mode Toggle -> Sign In/Up -> Contribute */}
          <div className="flex items-center gap-2 shrink-0">
            {/* DARK MODE TOGGLE BUTTON */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-8 h-8 rounded-full border border-ashram-green/30 dark:border-darkAshram-border bg-white dark:bg-darkAshram-card text-ashram-green dark:text-darkAshram-gold hover:bg-ashram-saffron/10 dark:hover:bg-darkAshram-gold/20 flex items-center justify-center transition-all transform hover:scale-105 shadow-sm shrink-0"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? (
                <Sun className="w-4 h-4 text-ashram-saffron theme-btn-icon" />
              ) : (
                <Moon className="w-4 h-4 text-darkAshram-gold theme-btn-icon" />
              )}
            </button>

            {/* Sign In & Sign Up Buttons */}
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-2">
                <span className={`text-xs font-bold drop-shadow dark:text-darkAshram-gold ${isScrolled ? 'text-ashram-green' : 'text-white'}`}>
                  Hi, {user?.name.split(' ')[0]}
                </span>
                <button
                  onClick={() => logout()}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all duration-200 dark:border-darkAshram-border dark:text-darkAshram-muted dark:hover:text-red-400 border ${isScrolled ? 'border-ashram-border text-ashram-muted hover:text-red-500 hover:border-red-300' : 'border-white/40 text-white/80 hover:text-white hover:border-white hover:bg-white/10'}`}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-1.5">
                <button
                  onClick={() => openAuth('signin')}
                  className={`px-3.5 py-1.5 rounded-full font-sans font-bold text-xs shadow-sm transition-all duration-200 flex items-center gap-1 dark:border-darkAshram-border dark:bg-darkAshram-card dark:text-darkAshram-text dark:hover:border-darkAshram-gold dark:hover:text-darkAshram-gold ${isScrolled ? 'border border-ashram-green/40 bg-white text-ashram-green hover:border-ashram-saffron hover:text-ashram-saffron' : 'border border-white/50 bg-white/10 backdrop-blur-sm text-white hover:bg-white/25 hover:border-white'}`}
                >
                  <LogIn className={`w-3 h-3 ${isScrolled ? 'text-ashram-saffron' : 'text-ashram-goldLight'}`} />
                  <span>Sign In</span>
                </button>

                <button
                  onClick={() => openAuth('signup')}
                  className={`px-3.5 py-1.5 rounded-full font-sans font-bold text-xs shadow-sm transition-all duration-200 flex items-center gap-1 dark:bg-ashram-green dark:hover:bg-ashram-greenHover dark:text-white dark:border-transparent dark:hover:shadow-md ${isScrolled ? 'bg-ashram-green text-white border border-transparent hover:bg-ashram-greenHover hover:shadow-md hover:-translate-y-0.5' : 'bg-white/20 backdrop-blur-sm border border-white/60 text-white hover:bg-white/30 hover:border-white hover:-translate-y-0.5'}`}
                >
                  <UserPlus className="w-3 h-3 text-ashram-goldLight dark:text-ashram-goldLight" />
                  <span>Sign Up</span>
                </button>
              </div>
            )}

            {/* Contribute CTA */}
            <button
              onClick={() => {
                if (onOpenContributeModal) {
                  onOpenContributeModal();
                } else {
                  const el = document.getElementById('contribute');
                  if (el) {
                    const headerOffset = 90;
                    const elementPosition = el.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
                }
              }}
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-ashram-saffron text-white font-bold text-xs border border-transparent shadow-md transition-all duration-200 hover:bg-ashram-saffronHover hover:shadow-lg hover:-translate-y-0.5 hover:border-ashram-saffron/30"
            >
              <Heart className="w-3 h-3 fill-white/20" />
              <span>Contribute</span>
            </button>


            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-ashram-green dark:text-darkAshram-text hover:bg-ashram-border/40 dark:hover:bg-darkAshram-card transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/98 dark:bg-darkAshram-bg/98 border-b border-ashram-border dark:border-darkAshram-border px-4 pt-3 pb-6 shadow-xl space-y-3 animate-fadeIn">
            <nav className="flex flex-col gap-1">
              {[...primaryNavLinks, ...secondaryNavLinks].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="group relative px-3.5 py-2.5 rounded-xl font-sans text-sm font-bold text-ashram-green dark:text-darkAshram-text
                    hover:text-ashram-gold dark:hover:text-darkAshram-gold
                    hover:bg-gradient-to-r hover:from-ashram-gold/10 hover:to-transparent dark:hover:from-darkAshram-gold/10 dark:hover:to-transparent
                    transition-all duration-250 ease-out
                    hover:translate-x-1 hover:pl-4
                    overflow-hidden"
                >
                  {/* Gold left accent bar on hover */}
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 bg-ashram-gold dark:bg-darkAshram-gold rounded-full transition-all duration-250 group-hover:h-5 opacity-0 group-hover:opacity-100" />
                  {link.name}
                </a>
              ))}

              {isAuthenticated && user?.role === 'admin' && (
                <Link
                  to="/admin/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="group relative px-3.5 py-2.5 rounded-xl font-sans text-sm font-bold
                    text-ashram-green dark:text-darkAshram-gold
                    hover:text-ashram-gold dark:hover:text-darkAshram-gold
                    hover:bg-gradient-to-r hover:from-ashram-gold/10 hover:to-transparent
                    transition-all duration-250 ease-out hover:translate-x-1 hover:pl-4
                    flex items-center gap-2 overflow-hidden"
                >
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 bg-ashram-gold dark:bg-darkAshram-gold rounded-full transition-all duration-250 group-hover:h-5 opacity-0 group-hover:opacity-100" />
                  <Shield className="w-4 h-4" /> Admin Dashboard
                </Link>
              )}

              {/* Mobile Contribute Button */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenContributeModal) {
                    onOpenContributeModal();
                  } else {
                    const el = document.getElementById('contribute');
                    if (el) {
                      const headerOffset = 90;
                      const elementPosition = el.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.scrollY - headerOffset;
                      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    }
                  }
                }}
                className="mt-1 w-full px-3.5 py-2.5 rounded-xl font-sans text-sm font-bold
                  bg-ashram-saffron text-white hover:bg-ashram-saffronHover
                  transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm"
              >
                <Heart className="w-4 h-4 fill-white/20" />
                Contribute
              </button>
            </nav>

            {/* Mobile Auth: Login & Sign Up */}
            <div className="pt-3 border-t border-ashram-border/60 dark:border-darkAshram-border/60">
              {isAuthenticated ? (
                <div className="flex items-center justify-between px-2 py-1">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ashram-saffron to-ashram-gold text-white flex items-center justify-center text-xs font-bold shadow-sm">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-ashram-green dark:text-darkAshram-gold">{user?.name}</p>
                      <p className="text-[10px] text-ashram-muted">{user?.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-red-200 text-red-600 dark:border-red-900/50 dark:text-red-400 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => openAuth('signin')}
                    className="py-2.5 px-3 rounded-xl border border-ashram-green/40 dark:border-darkAshram-border bg-white dark:bg-darkAshram-card
                      text-ashram-green dark:text-darkAshram-text
                      hover:border-ashram-gold hover:text-ashram-gold dark:hover:border-darkAshram-gold dark:hover:text-darkAshram-gold
                      text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all duration-200"
                  >
                    <LogIn className="w-3.5 h-3.5 text-ashram-saffron" />
                    <span>Login</span>
                  </button>
                  <button
                    onClick={() => openAuth('signup')}
                    className="py-2.5 px-3 rounded-xl bg-ashram-green hover:bg-ashram-greenHover text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors duration-200"
                  >
                    <UserPlus className="w-3.5 h-3.5 text-ashram-goldLight" />
                    <span>Sign Up</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
};
