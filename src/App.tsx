import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './contexts/LanguageContext';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import { getAllGeoRoutes } from './data/geoData';
import { Bot } from 'lucide-react';

const GeoServicePage = React.lazy(() => import('./pages/GeoServicePage'));

const geoRoutes = getAllGeoRoutes();

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
            <Navigation />

            <main>
              <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div></div>}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/privacy" element={<PrivacyPolicyPage />} />
                  <Route path="/terms" element={<TermsOfServicePage />} />
                  {geoRoutes.map(({ path, serviceId, citySlug }) => (
                    <Route
                      key={path}
                      path={path}
                      element={<GeoServicePage serviceId={serviceId} citySlug={citySlug} />}
                    />
                  ))}
                </Routes>
              </Suspense>
            </main>

            {/* Footer */}
            <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
                        <Bot className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xl font-bold">Stepup AI</span>
                    </div>
                    <p className="text-gray-300 mb-4">
                      Transforming businesses with intelligent AI automation solutions.
                    </p>
                    <div className="flex flex-col space-y-1 text-gray-300 text-sm">
                      <span>Instagram: <a href="https://instagram.com/step.upparis" target="_blank" rel="noreferrer" className="hover:text-white">@step.upparis</a></span>
                      <span>Email: <a href="mailto:contact@step-upai.com" className="hover:text-white">contact@step-upai.com</a></span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Services</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li><Link to="/automatisation-ia-paris" className="hover:text-white transition-colors duration-200">Automatisation IA</Link></li>
                      <li><Link to="/appels-ia-paris" className="hover:text-white transition-colors duration-200">Appels IA</Link></li>
                      <li><Link to="/email-marketing-ia-paris" className="hover:text-white transition-colors duration-200">Email Marketing IA</Link></li>
                      <li><Link to="/developpement-web-paris" className="hover:text-white transition-colors duration-200">Développement Web</Link></li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Île-de-France</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li><Link to="/automatisation-ia-paris" className="hover:text-white transition-colors duration-200">Paris</Link></li>
                      <li><Link to="/automatisation-ia-nanterre" className="hover:text-white transition-colors duration-200">La Défense</Link></li>
                      <li><Link to="/automatisation-ia-boulogne-billancourt" className="hover:text-white transition-colors duration-200">Boulogne-Billancourt</Link></li>
                      <li><Link to="/automatisation-ia-neuilly-sur-seine" className="hover:text-white transition-colors duration-200">Neuilly-sur-Seine</Link></li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Contact</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>contact@step-upai.com</li>
                      <li>+33 6 98 22 95 33</li>
                      <li><Link to="/contact" className="hover:text-white transition-colors duration-200">Nous Contacter</Link></li>
                      <li><Link to="/about" className="hover:text-white transition-colors duration-200">À Propos</Link></li>
                    </ul>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center text-gray-300">
                  <p>&copy; 2025 Stepup AI. Tous droits réservés.</p>
                  <div className="flex space-x-6 mt-4 md:mt-0">
                    <Link to="/privacy" className="hover:text-white transition-colors duration-200">Politique de Confidentialité</Link>
                    <Link to="/terms" className="hover:text-white transition-colors duration-200">Conditions d'Utilisation</Link>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </Router>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;
