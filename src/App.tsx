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
                    <div className="flex space-x-4">
                      <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                        <span className="sr-only">LinkedIn</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                        <span className="sr-only">Twitter</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
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
                      <li>hello@step-upai.com</li>
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