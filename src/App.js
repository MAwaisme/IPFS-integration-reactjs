import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Home from './pages/Home';
import Upload from './pages/Upload';
import Dapp from './pages/dApp/Dapp';
import Staking from './pages/dApp/Staking';

function App() {
  return (


    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/swap" element={<Dapp />} />
        <Route path="/staking" element={<Staking />} />
      </Routes>
    </Router>
  );
}

export default App;
