import React from "react";

const Onboarding = () => {
  return (
    <main className="page">
      <h2>Welcome, Parent!</h2>
      <p>Set up your family learning space in three steps.</p>
      <ol className="steps">
        <li>Create your parent account and accept consent.</li>
        <li>Add your child profile and choose their age.</li>
        <li>Pick a learning path and start the first lesson.</li>
      </ol>
      <div className="card">
        <h3>Consent & Privacy</h3>
        <p>
          We collect only what we need. No ads, no tracking, and you can delete data anytime.
        </p>
      </div>
    </main>
  );
};

export default Onboarding;
