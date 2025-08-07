export interface Step {
  description: string;
  intro_message: string;
  question: string;
  start: {
    TopicExplanation: string;
    Visual: {
      Content: string;
      Label: string;
      Type: string;
    };
    Voice: string;
  };
  steps: Array<{
    answer: string;
    calculation: string;
    conceptual_questions: Array<{
      CorrectAnswer: string;
      Goal: string;
      Illustration: {
        BeforeQuestion: {
          Content: string;
          Label: string;
          Type: string;
        };
        Feedback: {
          Hint: {
            Content: string;
            Label: string;
            Type: string;
          };
          Success: {
            Content: string;
            Label: string;
            Type: string;
          };
        };
        Question: string;
      };
    }>;
    equation: string;
    notes: {
      Description: string;
      UpdatedExpression: string;
    };
    step_description: string;
    step_number: number;
    topic: string;
  }>;
  topic: string;
}