import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/20">
            <Navigation />
            
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsOfServicePage />} />
              </Routes>
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
                      <li><a href="/services" className="hover:text-white transition-colors duration-200">AI Automation</a></li>
                      <li><a href="/services" className="hover:text-white transition-colors duration-200">Cold Calling Systems</a></li>
                      <li><a href="/services" className="hover:text-white transition-colors duration-200">Email Marketing</a></li>
                      <li><a href="/services" className="hover:text-white transition-colors duration-200">Web Development</a></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Technologies</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>n8n & Make.com</li>
                      <li>VAPI & Telnyx</li>
                      <li>React & Supabase</li>
                      <li>Airtable Integration</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Contact</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>contact@step-upai.com</li>
                      <li>+1 (555) 123-4567</li>
                      <li><a href="/contact" className="hover:text-white transition-colors duration-200">Get in Touch</a></li>
                      <li><a href="/about" className="hover:text-white transition-colors duration-200">About Us</a></li>
                    </ul>
                  </div>
                </div>
                
                <div className="border-t border-gray-700 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center text-gray-300">
                  <p>&copy; 2024 Stepup AI. All rights reserved.</p>
                  <div className="flex space-x-6 mt-4 md:mt-0">
                    <a href="/privacy" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
                    <a href="/terms" className="hover:text-white transition-colors duration-200">Terms of Service</a>
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

import { Bot } from 'lucide-react';

export default App;