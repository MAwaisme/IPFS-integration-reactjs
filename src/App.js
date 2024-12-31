import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Home from './pages/Home';
import Upload from './pages/Upload';

function App() {
  return (


    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </Router>
  );
}

export default App;
