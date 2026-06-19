import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { pathname } = useLocation();

  // Floating-pill nav: dark glass over the home hero, light glass on scroll / other pages.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
  ];

  const navItems = [
    { key: 'nav.home', href: '/' },
    { key: 'nav.about', href: '/about' },
    { key: 'nav.services', href: '/services' },
    { key: 'nav.projects', href: '/projects' },
    { key: 'nav.blog', href: '/blog' },
    { key: 'nav.contact', href: '/contact' },
  ];

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');

  const onDark = pathname === '/' && !scrolled;

  const pillCls = onDark
    ? 'bg-white/10 border-white/15'
    : 'bg-white/75 border-black/[0.06] shadow-lg shadow-gray-900/5';
  const wordmarkCls = onDark
    ? 'text-white'
    : 'bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent';
  const iconCls = onDark
    ? 'text-white/85 hover:text-white hover:bg-white/10'
    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-900/[0.05]';
  const linkInactiveCls = onDark
    ? 'text-white/80 hover:text-white'
    : 'text-gray-600 hover:text-gray-900';
  const linkActiveCls = onDark ? 'text-white' : 'text-indigo-700';
  const activeBgCls = onDark ? 'bg-white/20' : 'bg-indigo-600/10';

  return (
    <nav className="fixed top-0 inset-x-0 z-50 pt-3">
      <div className="flex justify-center px-4">
        <div
          className={`pointer-events-auto inline-flex items-center gap-1 rounded-full border backdrop-blur-xl px-2.5 py-2 transition-colors duration-300 ${pillCls}`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 pl-1 pr-2">
            <motion.img
              src="/logo-mark.svg"
              alt="Step UpAI logo"
              width={32}
              height={32}
              className="h-8 w-8 rounded-lg"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.3 }}
            />
            <span className={`hidden sm:block text-lg font-bold ${wordmarkCls}`}>Step UpAI</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.key}
                  to={item.href}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    active ? linkActiveCls : linkInactiveCls
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className={`absolute inset-0 rounded-full ${activeBgCls}`}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{t(item.key)}</span>
                </Link>
              );
            })}
          </div>

          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={`flex items-center gap-1 px-3 py-2 rounded-full transition-colors duration-200 ${iconCls}`}
              aria-label="Change language"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">{languages.find((l) => l.code === language)?.flag}</span>
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 mt-2 w-40 bg-white rounded-2xl shadow-xl border border-gray-100 py-1"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as any);
                        setIsLangOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2 ${
                        language === lang.code ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-200 ${iconCls}`}
            aria-label="Open menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer (floating card under the pill) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden mx-4 mt-2 rounded-3xl bg-white/90 backdrop-blur-xl border border-black/[0.06] shadow-xl p-2"
          >
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.key}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2.5 text-base font-medium rounded-2xl transition-colors duration-200 ${
                    active ? 'text-indigo-700 bg-indigo-50' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
