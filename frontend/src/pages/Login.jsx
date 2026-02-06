import React from "react";

const Login = () => {
  return (
    <main className="page">
      <h2>Parent Login</h2>
      <form className="form">
        <label>
          Email
          <input type="email" placeholder="parent@example.com" />
        </label>
        <label>
          Password
          <input type="password" placeholder="••••••••" />
        </label>
        <button type="submit" className="button">Log In</button>
      </form>
      <p className="helper">New here? Start with onboarding to create an account.</p>
    </main>
  );
};

export default Login;
