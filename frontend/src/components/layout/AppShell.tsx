import React from "react";
import { Link, NavLink } from "react-router-dom";

const AppShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-20 border-b border-slate-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-ink">
            <span className="text-2xl">🌟</span> BrightByte AI
          </Link>
          <nav className="flex gap-4 text-sm font-semibold text-slate-600">
            <NavLink className={({ isActive }) => (isActive ? "text-ocean" : "")} to="/onboarding">
              Onboarding
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? "text-ocean" : "")} to="/child">
              Child Zone
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? "text-ocean" : "")} to="/parent">
              Parent Hub
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
};

export default AppShell;
