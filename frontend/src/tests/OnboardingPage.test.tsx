import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import OnboardingPage from "../pages/onboarding/OnboardingPage";

describe("OnboardingPage", () => {
  it("renders onboarding content", () => {
    render(
      <MemoryRouter>
        <OnboardingPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/BrightByte AI/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Get Started/i })).toBeInTheDocument();
  });
});
