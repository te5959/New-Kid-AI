import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Mascot from "../../components/mascot/Mascot";

const OnboardingPage = () => {
  return (
    <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
      <section className="space-y-6">
        <div className="rounded-3xl bg-ocean/10 p-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-ocean">Welcome</p>
          <h1 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
            BrightByte AI helps kids learn AI safely
          </h1>
          <p className="mt-4 text-base text-slate-600">
            Guided lessons, playful quizzes, and a controlled AI playground help children ages 8–14
            explore artificial intelligence with confidence. Parents stay in control with screen
            time and lesson approvals.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link to="/auth/signup">
              <Button>Get Started</Button>
            </Link>
            <Link to="/auth/login">
              <Button variant="ghost">Parent Login</Button>
            </Link>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <h3 className="text-lg font-semibold text-ink">Short Lessons</h3>
            <p className="mt-2 text-sm text-slate-600">Bite-sized AI topics with friendly language.</p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-ink">Safe Experiments</h3>
            <p className="mt-2 text-sm text-slate-600">Only curated data and responses.</p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-ink">Parent Controls</h3>
            <p className="mt-2 text-sm text-slate-600">Approvals, limits, and progress reports.</p>
          </Card>
        </div>
      </section>
      <aside className="space-y-6">
        <Mascot message="Hi! I'm Byte. I'll guide your child through safe AI adventures." />
        <Card className="bg-lavender/10">
          <h3 className="text-lg font-semibold text-ink">Privacy Promise</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>• No ads or tracking</li>
            <li>• Parent-only accounts</li>
            <li>• Delete data anytime</li>
          </ul>
        </Card>
      </aside>
    </div>
  );
};

export default OnboardingPage;
