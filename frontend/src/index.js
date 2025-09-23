import React from 'react';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import HomePage from './home/homePage';
import MonasteryPage from './monastery/monasteryPage';
import Navbar from './Navbar';
import Footer from './Footer';
import NotFound from './NotFound';
import { SearchProvider } from './SearchContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <SearchProvider>
      <Navbar />
      <Routes>
      <Route path="/" element={<HomePage />} />
  <Route path="/monastery/:id" element={<MonasteryPage />} />
      <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </SearchProvider>
  </BrowserRouter>
);