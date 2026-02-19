import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Linkedin, Github, Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const links = [
    { path: '/writing', label: 'Writing' },
    { path: '/bookshelf', label: 'Bookshelf' },
    { path: '/work', label: 'Work' },
  ];

  const socialLinks = [
    { icon: Linkedin, url: 'https://linkedin.com/in/arushinigam', label: 'LinkedIn' },
    { icon: Github, url: 'https://github.com/Arushi1912', label: 'GitHub' },
    { icon: Mail, url: 'mailto:an452@cornell.edu', label: 'Email' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-beige/95 backdrop-blur-sm border-b border-gold-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-semibold text-lg text-slate hover:text-slate-blue transition-colors">
            Arushi Nigam
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm transition-colors ${
                    isActive
                      ? 'text-slate-blue font-medium'
                      : 'text-slate/70 hover:text-slate-blue'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate/60 hover:text-slate-blue transition-colors"
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>

            <button
              className="md:hidden p-1.5 text-slate/70 hover:text-slate-blue transition-colors"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gold-muted/30 bg-beige/95 backdrop-blur-sm">
          <div className="px-6 py-4 space-y-3">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block text-sm py-1.5 transition-colors ${
                    isActive
                      ? 'text-slate-blue font-medium'
                      : 'text-slate/70 hover:text-slate-blue'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="flex items-center gap-4 pt-2 border-t border-gold-muted/20">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate/60 hover:text-slate-blue transition-colors"
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
