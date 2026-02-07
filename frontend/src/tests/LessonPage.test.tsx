import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";
import LessonPage from "../pages/child/LessonPage";

vi.mock("../api/lessons.api", () => ({
  getLessonDetail: vi.fn().mockResolvedValue({
    id: "lesson-1",
    title: "AI is a Helper",
    summary: "Learn about AI",
    content: {
      explanation: "AI learns from examples.",
      visual: "Robot sorting toys.",
      interactive: "Drag toys.",
      quiz: []
    }
  })
}));

describe("LessonPage", () => {
  it("renders lesson details", async () => {
    render(
      <MemoryRouter initialEntries={["/child/lesson?lessonId=lesson-1"]}>
        <Routes>
          <Route path="/child/lesson" element={<LessonPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/AI is a Helper/i)).toBeInTheDocument();
    });
  });
});
