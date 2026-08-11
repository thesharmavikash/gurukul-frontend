import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Test from './pages/Test';
import AboutAuthor from './pages/AboutAuthor';
import History from './pages/History';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test/:id" element={<Test />} />
        <Route path="/about" element={<AboutAuthor />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
