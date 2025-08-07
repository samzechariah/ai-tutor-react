import React from 'react';
import { Step } from '../types/Step';

interface StepGuideProps {
  step: Step;
}

const StepGuide: React.FC<StepGuideProps> = ({ step }) => {
  return (
    <div className="step-guide">
      <h2>Current Step: {step.topic}</h2>
      <p>{step.description}</p>
      <h3>Question:</h3>
      <p>{step.question}</p>
      {step.start.Visual && (
        <div className="visual-aid">
          <img src={step.start.Visual.Content} alt={step.start.Visual.Label} />
          <p>{step.start.Visual.Label}</p>
        </div>
      )}
      <h3>Steps:</h3>
      <ol>
        {step.steps.map((s, index) => (
          <li key={index}>
            <h4>{s.topic}</h4>
            <p>{s.step_description}</p>
            <p>Equation: {s.equation}</p>
            <p>Answer: {s.answer}</p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default StepGuide;