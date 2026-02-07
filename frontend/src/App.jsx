import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Onboarding from "./pages/Onboarding.jsx";
import Login from "./pages/Login.jsx";
import ChildDashboard from "./pages/ChildDashboard.jsx";
import LessonView from "./pages/LessonView.jsx";
import QuizView from "./pages/QuizView.jsx";
import Playground from "./pages/Playground.jsx";
import ParentDashboard from "./pages/ParentDashboard.jsx";
import NavBar from "./components/NavBar.jsx";

const App = () => {
  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/child" element={<ChildDashboard />} />
        <Route path="/lesson" element={<LessonView />} />
        <Route path="/quiz" element={<QuizView />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/parent" element={<ParentDashboard />} />
      </Routes>
    </div>
  );
};

export default App;
