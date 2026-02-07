import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
import ProtectedRoute from "./routes/ProtectedRoute";
import OnboardingPage from "./pages/onboarding/OnboardingPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ChildSelectPage from "./pages/child/ChildSelectPage";
import ChildDashboardPage from "./pages/child/ChildDashboardPage";
import LessonPage from "./pages/child/LessonPage";
import QuizPage from "./pages/child/QuizPage";
import PlaygroundPage from "./pages/child/PlaygroundPage";
import ParentDashboardPage from "./pages/parent/ParentDashboardPage";

const App = () => {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Navigate to="/onboarding" replace />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route
          path="/child"
          element={
            <ProtectedRoute>
              <ChildSelectPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/child/dashboard"
          element={
            <ProtectedRoute>
              <ChildDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/child/lesson"
          element={
            <ProtectedRoute>
              <LessonPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/child/quiz"
          element={
            <ProtectedRoute>
              <QuizPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/child/playground"
          element={
            <ProtectedRoute>
              <PlaygroundPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent"
          element={
            <ProtectedRoute>
              <ParentDashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AppShell>
  );
};

export default App;
