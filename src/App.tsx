import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Review from './pages/Review';
import Exhibitions from './pages/Exhibitions';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <Router>
          <div className="min-h-screen bg-primary-900 text-neutral-100">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/review" element={<Review />} />
                <Route path="/exhibitions" element={<Exhibitions />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;