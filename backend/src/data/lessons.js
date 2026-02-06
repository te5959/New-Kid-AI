export const learningPaths = [
  {
    id: "path-ai-basics",
    title: "What is AI?",
    description: "Understand how AI helps people by learning from examples.",
    minAge: 8,
    maxAge: 14,
    sortOrder: 1
  },
  {
    id: "path-image-recognition",
    title: "Image Recognition",
    description: "Teach AI to recognize images with patterns.",
    minAge: 9,
    maxAge: 14,
    sortOrder: 2
  }
];

export const lessons = [
  {
    id: "lesson-ai-helper",
    learningPathId: "path-ai-basics",
    title: "AI is a Helper",
    summary: "AI learns from examples to help people.",
    minAge: 8,
    maxAge: 14,
    sortOrder: 1,
    content: {
      explanation: "AI is a tool that learns from examples. It does not have feelings.",
      visual: "Cartoon robot organizing toys by color.",
      interactive: "Drag toys into bins that match their colors.",
      quiz: [
        {
          id: "q1",
          text: "AI learns from:",
          options: ["Examples", "Magic", "Luck"],
          answerIndex: 0
        },
        {
          id: "q2",
          text: "AI can have feelings:",
          options: ["Yes", "No"],
          answerIndex: 1
        }
      ]
    }
  },
  {
    id: "lesson-patterns",
    learningPathId: "path-ai-basics",
    title: "Machines Learn Patterns",
    summary: "Patterns help machines make smart guesses.",
    minAge: 8,
    maxAge: 14,
    sortOrder: 2,
    content: {
      explanation: "Machines can find patterns in pictures, sounds, and numbers.",
      visual: "Highlight shapes that repeat in a row.",
      interactive: "Tap the shapes that match the pattern.",
      quiz: [
        {
          id: "q1",
          text: "A pattern is something that:",
          options: ["Repeats", "Is random"],
          answerIndex: 0
        }
      ]
    }
  },
  {
    id: "lesson-cats-dogs",
    learningPathId: "path-image-recognition",
    title: "Cats vs Dogs",
    summary: "Teach AI to tell cats and dogs apart.",
    minAge: 9,
    maxAge: 14,
    sortOrder: 1,
    content: {
      explanation: "AI can learn to tell cats and dogs apart by looking at examples.",
      visual: "Six photos with labels.",
      interactive: "Label each photo as cat or dog.",
      quiz: [
        {
          id: "q1",
          text: "AI learns by looking at:",
          options: ["Examples", "Guesses"],
          answerIndex: 0
        }
      ]
    }
  }
];
