import { prisma } from "../config/prisma.js";

const main = async () => {
  const aiPath = await prisma.learningPath.create({
    data: {
      title: "What is AI?",
      description: "Understand how AI learns from examples.",
      minAge: 8,
      maxAge: 14,
      sortOrder: 1
    }
  });

  const lesson = await prisma.lesson.create({
    data: {
      learningPathId: aiPath.id,
      title: "AI is a Helper",
      summary: "AI learns from examples to help people.",
      minAge: 8,
      maxAge: 14,
      sortOrder: 1,
      contentJson: {
        explanation: "AI is a tool that learns from examples.",
        visual: "Robot sorting toys by color.",
        interactive: "Drag toys into matching bins.",
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
    }
  });

  await prisma.quiz.create({
    data: {
      lessonId: lesson.id,
      questions: { quiz: lesson.contentJson.quiz }
    }
  });

  await prisma.badge.createMany({
    data: [
      {
        code: "curious_explorer",
        title: "Curious Explorer",
        description: "Finished your first lesson.",
        icon: "⭐"
      },
      {
        code: "pattern_spotter",
        title: "Pattern Spotter",
        description: "Scored 80% on a quiz.",
        icon: "✨"
      }
    ]
  });
};

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
